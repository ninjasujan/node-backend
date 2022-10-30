import crypto from 'crypto';
import Locals from '@configs/Locals';
import jwt from 'jsonwebtoken';

class Auth {
    public generateJWTToken = (payload: any) => {
        const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = Locals.EXPRESS;
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        return token;
    };

    public randomSalt = () => {
        return crypto.randomBytes(16).toString('hex');
    };

    public encryptPassword = (password: string, salt: string) => {
        return crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');
    };
}

export default new Auth();
