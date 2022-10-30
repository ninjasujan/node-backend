import mongoose from 'mongoose';
import Locals from '../configs/Locals';
import Logger from '../logger/logger';

export class Database {
    public static init(): any {
        /** Load ENV  */
        const { MONGO_URI } = Locals.DATABASE;
        console.log('[Mongo]', MONGO_URI);
        /** Connect MongoDB */
        mongoose.connect(MONGO_URI);

        mongoose.connection.on('connected', async () => {
            /* eslint-disable-next-line no-console */
            Logger.info(`[Mongoose connection] success`);
        });

        mongoose.connection.on('error', () => {
            Logger.info('[Mongoose connection] error');
        });

        mongoose.connection.on('disconnected', () => {
            console.log(`[Mongoose disconnected] DB disconnected`);
        });
    }
}

export default mongoose;
