import express, { Application } from 'express';
import cors from 'cors';
import compress from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import hemlet from 'helmet';
import PassportConfig from '@configs/passport';
import Locals from '@configs/Locals';

class Http {
    public static mount(_express: Application): Application {
        const { MONGO_URI } = Locals.DATABASE;
        const { ACCESS_TOKEN_SECRET, SESSION_EXPIRY } = Locals.EXPRESS;

        /** Initialize passport configs */
        PassportConfig.initConfigs();

        _express.use(
            session({
                secret: ACCESS_TOKEN_SECRET,
                resave: false,
                saveUninitialized: true,
                store: MongoStore.create({
                    mongoUrl: MONGO_URI,
                    ttl: SESSION_EXPIRY,
                }),
            }),
        );

        /** Add App level middleware */
        _express.disable('x-powered-by');
        _express.use(cors());
        _express.use(hemlet());
        _express.use(compress());
        _express.use(express.json());
        _express.use(express.urlencoded({ extended: true }));
        _express.use(morgan('dev'));
        _express.use(passport.initialize());
        _express.use(passport.session());

        /** Session Middleware */

        /** Disable console.log in production */
        if (process.env.NODE_ENV === 'production') {
            /* eslint-disable-next-line no-console */
            console.log = () => {};
        }
        return _express;
    }
}

export default Http;
