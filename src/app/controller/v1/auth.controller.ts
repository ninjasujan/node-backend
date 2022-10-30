import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from '../../exceptions/ValidationError';
import UserModel from 'app/models/user.model';
import authService from '../../service/auth.service';

class Auth {
    public googleCallback = (
        request: Request,
        ressponse: Response,
        next: NextFunction,
    ) => {
        try {
            const token = authService.generateJWTToken({
                _id: request.user._id,
            });
            ressponse.status(200).json({
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
                await user.save();
            }
            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'User registration success',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new Auth();
