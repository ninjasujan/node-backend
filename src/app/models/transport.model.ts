import mongoose, { Model, Types } from 'mongoose';

type ModeType = 'BUS' | 'TRAIN' | 'METRO' | 'OTHER';

type TypeSctor = 'PUBLIC' | 'PRIVATE';

type PassType = 'ORDINARY' | 'AC';

type CurrencyType = 'RUPEE' | 'DOLLAR';

enum TypeSectorEnum {
    'PUBLIC' = 'PUBLIC',
    'PRIVATE' = 'PUBLIC',
}

enum ModeTypeEnum {
    'BUS' = 'BUS',
    'TRAIN' = 'TRAIN',
    'METRO' = 'METRO',
    'OTHER' = 'OTHER',
}

enum CurrencyEnum {
    RUPEE = 'RUPEE',
    DOLLAR = 'DOLLAR',
}

enum PassTypeEnum {
    ORDINARY = 'ORDINARY',
    AC = 'AC',
}

/** Nested schema Type */
export interface IPass {
    name: string;
    type: PassType;
    amount: number;
    cashback: number;
    currency: CurrencyType;
}

/** Parent schema Type */
export interface ITransport {
    name: string;
    type: TypeSctor;
    modeOfTransport: ModeType;
    passAvailable: boolean;
    cityId: Types.ObjectId;
    passList: [IPass];
}

type ITransportModel = Model<ITransport, {}, {}>;

type IPassModel = Model<IPass, {}, {}>;

export const PassSchema = new mongoose.Schema<IPass, IPassModel>(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(PassTypeEnum),
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: Object.values(CurrencyEnum),
            default: CurrencyEnum.RUPEE,
        },
        cashback: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

export const TransportSchema = new mongoose.Schema<
    ITransport,
    ITransportModel,
    {}
>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: Object.values(TypeSectorEnum),
            default: TypeSectorEnum.PUBLIC,
        },
        modeOfTransport: {
            type: String,
            enum: Object.values(ModeTypeEnum),
            index: true,
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            required: true,
        },
        passAvailable: {
            type: Boolean,
            default: false,
        },
        passList: [PassSchema],
    },
    { timestamps: true },
);

export default mongoose.model<ITransport, ITransportModel>(
    'Transport',
    TransportSchema,
);
