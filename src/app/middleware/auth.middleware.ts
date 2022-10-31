import { Request, Response, NextFunction } from 'express';
import AuthorizationError from 'app/exceptions/AuthorizationError';
import authService from 'app/service/auth.service';

class Auth {
    public authenticateRequest = (
        request: Request,
        _response: Response,
        next: NextFunction,
    ) => {
        try {
            const authToken =
                request.headers['authorization']?.split(' ')[1] || '';
            console.log('[Token]', authToken, request.isAuthenticated());
            if (!authToken) {
                throw new AuthorizationError('Access token not found', 401);
            }
            const payload: any = authService.verifyJWTToken(authToken);
            if (payload && request.isAuthenticated()) {
                request.user = payload;
                return next();
            }
            throw new AuthorizationError('Not authorized', 403);
        } catch (error) {
            if (error instanceof Error) {
                return next(new AuthorizationError(error.message, 403));
            }
            next(error);
        }
    };
}

export default new Auth();
