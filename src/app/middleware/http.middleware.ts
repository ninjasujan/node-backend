import express, { Application } from 'express';
import cors from 'cors';
import compress from 'compression';
import morgan from 'morgan';
import expressJwt from 'express-jwt';
import hemlet from 'helmet';
import Locals from '../../configs/Locals';

class Http {
    public static mount(_express: Application): Application {
        const { ACCESS_TOKEN_SECRET } = Locals.EXPRESS;
        _express.disable('x-powered-by');
        _express.use(cors());
        _express.use(hemlet());
        _express.use(compress());
        _express.use(express.json());
        _express.use(express.urlencoded({ extended: true }));
        expressJwt({
            secret: ACCESS_TOKEN_SECRET,
            algorithms: ['HS256'],
        }).unless({ path: [{ url: '/api/v1/user/login', method: ['POST'] }] });

        _express.use(morgan('dev'));

        if (process.env.NODE_ENV === 'prod') {
            /* eslint-disable-next-line no-console */
            console.log = () => {};
        }
        return _express;
    }
}

export default Http;
