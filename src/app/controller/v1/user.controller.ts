import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from 'app/exceptions/ValidationError';
import UserModel from 'app/models/user.model';
import APIError from 'app/exceptions/APIError';
import TransportModel from 'app/models/transport.model';

class User {
    public getUserInfo = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
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
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }

            const { cityId, modeOfTransport } = request.params;

            /** Here Aggregation query with lookup stage used
             * Same thing can also be achivd with pouplate() method of mongoose
             */
            const transportDetails = await TransportModel.aggregate([
                {
                    $match: {
                        cityId,
                        modeOfTransport,
                    },
                },
                {
                    $lookup: {
                        from: 'City',
                        localField: 'cityId',
                        foreignField: '_id',
                        as: 'city',
                    },
                },
            ]);

            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Transport Mode details',
                data: {
                    transportDetails,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new User();
