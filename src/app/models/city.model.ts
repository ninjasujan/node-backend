import mongoose, { Model } from 'mongoose';

export interface ILocation {
    type: string;
    coordinates: [number, number];
}

type CityType = 'TIER-1' | 'TIER-2' | 'TIER-3';

enum CityEnum {
    'TIER-1' = 'TIER-1',
    'TIER-2' = 'TIER-2',
    'TIER-3' = 'TIER-3',
}

export interface ICity {
    name?: string;
    location?: ILocation;
    type: CityType;
    createdAt: Date;
    updatedAt: Date;
}

type ICityModel = Model<ICity, {}, {}>;

export const CitySchema = new mongoose.Schema<ICity, ICityModel, {}>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        location: {
            type: {
                type: String,
                enum: ['point'],
            },
            coordinates: [Number],
        },
        type: {
            type: String,
            enum: Object.values(CityEnum),
            default: CityEnum['TIER-1'],
        },
    },
    { timestamps: true },
);

export default mongoose.model<ICity, ICityModel>('City', CitySchema);
