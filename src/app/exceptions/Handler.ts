import { UnauthorizedError } from 'express-jwt';
import { NextFunction, Request, Response } from 'express';
import APIError from './APIError';
import ValidatioError from './ValidationError';
import AuthorizationError from './AuthorizationError';

class Handler {
    public static errorHandler(
        error:
            | APIError
            | ValidatioError
            | UnauthorizedError
            | AuthorizationError
            | Error,
        req: Request,
        res: Response,
        next: NextFunction,
    ): any {
        console.log('[Error]', error);
        if (error instanceof APIError) {
            res.status(error.status).json({
                status: 'APIError',
                statusCode: error.status,
                message: error.message,
            });
        } else if (error instanceof ValidatioError) {
            res.status(error.status).json({
                status: 'ValidationError',
                statusCode: error.status,
                message: error.message,
            });
        } else if (
            error instanceof AuthorizationError ||
            error instanceof UnauthorizedError
        ) {
            res.status(error.status).json({
                status: 'UnauthorizedError',
                statusCode: error.status,
                message: error.message,
            });
        } else {
            res.status(500).json({
                status: 'ServerError',
                statusCode: 500,
                message: error.message,
            });
        }
        next();
    }
}

export default Handler;
