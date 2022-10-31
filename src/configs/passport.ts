import { Request } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passportJWT, { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import AuthorizationError from 'app/exceptions/AuthorizationError';
import Locals from '@configs/Locals';
import userService from 'app/service/user.service';

class Passport {
    public static initConfigs = () => {
        const { GOOGLE_AUTH, EXPRESS } = Locals;
        /** Google OAuth 2  */
        passport.use(
            new GoogleStrategy(
                {
                    clientID: GOOGLE_AUTH.CLIENT_ID,
                    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
                    callbackURL: GOOGLE_AUTH.CALLBACK_URL,
                    passReqToCallback: true,
                },
                async (
                    _request: Request,
                    _accessToken: string,
                    _refreshToken: string,
                    profile: any,
                    done: Function,
                ) => {
                    try {
                        const { displayName, email } = profile;
                        let user = await userService.getUserByEmail(email);
                        if (!user) {
                            /** Create new User */
                            user = await userService.createNewUser({
                                email,
                                name: displayName,
                            });
                            return done(null, user);
                        }
                        return done(null, user);
                    } catch (error) {
                        return done(error, false);
                    }
                },
            ),
        );

        /** JWT verification */
        passport.use(
            new JwtStrategy(
                {
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: EXPRESS.ACCESS_TOKEN_SECRET,
                },
                (payload: any, done: Function) => {
                    try {
                        done(null, payload);
                    } catch (error) {
                        done(
                            new AuthorizationError(
                                'Not authorized to access service',
                                403,
                            ),
                            false,
                        );
                    }
                },
            ),
        );

        passport.serializeUser(async (user: any, done: Function) => {
            done(null, user);
        });

        passport.deserializeUser(async (user: any, done: Function) => {
            done(null, user);
        });
    };
}

export default Passport;
