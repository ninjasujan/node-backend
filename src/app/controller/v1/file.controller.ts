import { Request, Response, NextFunction, response } from 'express';
import fs from 'fs';
import path from 'path';

class FileIO {
    private writeDataToFile = async (city: Array<any>, busStop: Array<any>) => {
        try {
            const cityPath = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'tmp',
                'city.json',
            );
            const busStopPath = path.join(
                __dirname,
                '..',
                '..',
                '..',
                'tmp',
                'busstop.json',
            );

            /** Write data to file */
            fs.writeFileSync(cityPath, JSON.stringify(city));
            fs.writeFileSync(busStopPath, JSON.stringify(busStop));
        } catch (error) {
            throw error;
        }
    };

    public createDirectory = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            const { city, busStop } = request.body;
            const dirPath = path.join(__dirname, '..', '..', '..', 'tmp');

            /** If directory exists skip */
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }

            await this.writeDataToFile(city, busStop);

            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'File I/O done',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new FileIO();
