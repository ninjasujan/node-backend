import path from 'path';
import dotenv from 'dotenv';
import { ILocal } from '../interface/config/ILocal';

class Environment {
    static Locals: ILocal;

    static {
        /** Load Env from .env file */
        dotenv.config({
            path: path.join(__dirname, '..', '..', '.env'),
        });

        /** Populate environment variable */
        Environment.Locals = {
            EXPRESS: {
                PORT: process.env.PORT || '',
                ENVIRONMENT: process.env.ENVIRONMENT || 'development',
                ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
                ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '1d',
                SESSION_EXPIRY: Number(process.env.SESSION_EXPIRY) || 86400,
            },
            DATABASE: {
                MONGO_URI: process.env.MONGO_URI || '',
            },
            GOOGLE_AUTH: {
                CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID || '',
                CLIENT_SECRET: process.env.GOOGLE_AUTH_SECRET_ID || '',
                CALLBACK_URL: process.env.GOOGLE_AUTH_CALLBACK_URL || '',
            },
        };
    }
}

export default Environment.Locals;
