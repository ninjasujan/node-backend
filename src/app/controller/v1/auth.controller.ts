import { Request, Response, NextFunction, response } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from '../../exceptions/ValidationError';
import UserModel from 'app/models/user.model';
import authService from '../../service/auth.service';
import APIError from 'app/exceptions/APIError';

class Auth {
    public googleCallback = (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const token = authService.generateJWTToken({
                _id: request.user._id,
            });
            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Google Login successful',
                data: {
                    accessToken: token,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    public passwordSignup = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }
            const { name, email, password } = request.body;
            let user = await UserModel.findOne({ email });
            if (!user) {
                user = new UserModel({
                    email,
                    name,
                });
                user.hashPassword(password);
                user = await user.save();
            }
            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User registration success',
                data: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    public passwordLogin = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }
            const { email, password } = request.body;

            let user = await UserModel.findOne({ email });
            if (!user) {
                throw new APIError('User not found', 404);
            }
            if (!user.checkPassword(password)) {
                throw new APIError('Wrong password', 400);
            }
            const token = authService.generateJWTToken({ _id: user._id });
            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User login success',
                data: {
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    public authLogout = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            request.logout(async (err) => {
                if (!err) {
                    request.session.destroy((err) => {
                        if (err) {
                            throw new APIError('Session error', 400);
                        }
                    });
                }
            });
            return response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User Logout',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new Auth();
