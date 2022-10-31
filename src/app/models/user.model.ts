import mongoose, { Model } from 'mongoose';
import { Platform, LoginMethod } from '../../constants/user.constants';
import authService from 'app/service/auth.service';

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
    name?: string;
    email: string;
    passwordHash?: string;
    passwordSalt?: string;
    platform?: string;
    location?: [ILocation];
    gender?: GenderType;
    loginMethod?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserMethods {
    hashPassword(password: string): void;
    checkPassword(password: string): boolean;
}

type IUserModel = Model<IUser, {}, IUserMethods>;

export const UserSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        passwordHash: {
            type: String,
        },
        passwordSalt: {
            type: String,
        },
        platform: {
            type: String,
            enum: Object.values(Platform),
            default: Platform.ANDROID,
        },
        location: {
            type: {
                type: String,
                enum: ['point'],
            },
            coordinates: [Number],
        },
        gender: {
            type: String,
            enum: Object.values(Gender),
        },
        loginMethod: {
            type: String,
            enum: Object.values(LoginMethod),
        },
    },
    { timestamps: true },
);

/** Mongoose Instance method helps to hash password */
UserSchema.method('hashPassword', function hashPassword(password: string) {
    this.passwordSalt = authService.randomSalt();
    this.passwordHash = authService.encryptPassword(
        password,
        this.passwordSalt,
    );
});

/** Mongoose instace method to verify the password */
UserSchema.method('checkPassword', function checkPassword(password: string) {
    const passwordHash = authService.encryptPassword(
        password,
        this.passwordSalt,
    );
    return this.passwordHash === passwordHash;
});

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
