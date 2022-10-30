import mongoose from '../../providers/Database';
import { Platform, SignUpMethod } from '../../constants/user.constants';

export interface ILocation {
    type: string;
    coordinates: [number, number];
}

type GenderType = 'MALE' | 'FEMALE';

enum Gender {
    MALE = 'MALE',
    FEAMALE = 'FEAMALE',
}

export interface IUser {
    name: string;
    emai: string;
    mobileNumber: string;
    age: number;
    platform: string;
    location: [ILocation];
    gender: GenderType;
    loginMethod: string;
}

export interface IUserModel extends IUser, mongoose.Document {}

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emai: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 13,
        max: 70,
    },
    platform: {
        type: String,
        enum: Object.values(Platform),
    },
    location: {
        type: {
            type: String,
            enum: ['point'],
        },
        coordinates: [mongoose.Schema.Types.Decimal128],
    },
    gender: {
        type: String,
        enum: [Object.values(Gender)],
    },
    loginMethod: {
        type: String,
        enum: Object.values(SignUpMethod),
    },
});

export default mongoose.model<IUserModel>('User', UserSchema);
