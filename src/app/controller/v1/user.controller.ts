import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from 'app/exceptions/ValidationError';
import UserModel from 'app/models/user.model';
import APIError from 'app/exceptions/APIError';

class User {
    public getUserInfo = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            console.log('[Auth status]', request.isAuthenticated());
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }
            const { email } = request.query;
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new APIError('User not found', 404);
            }
            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User info',
                data: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    public getCityTransportInfo = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { cityId } = request.params;
        } catch (error) {
            next(error);
        }
    };
}

export default new User();
