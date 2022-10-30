import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from '../../exceptions/ValidationError';
import authService from '../../service/auth.service';

class Login {
    public loginHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { email } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }
            const response = await authService.login(email);
            res.status(200).json({
                success: true,
                message: 'data fetched successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new Login();
