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
                ACCESS_TOKEN_SECRET:
                    process.env.ACCESS_TOKEN_SECRET ||
                    'This is your responsibility',
            },
            DATABASE: {
                MONGO_URI: process.env.MONGO_URI || '',
            },
        };
    }
}

export default Environment.Locals;
