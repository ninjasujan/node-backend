import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from 'app/exceptions/ValidationError';
import fs from 'fs';
import path from 'path';
import APIError from 'app/exceptions/APIError';

class FileIO {
    private directoryPath: string;

    constructor() {
        this.directoryPath = path.join(__dirname, '..', '..', '..', 'tmp');
    }

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
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                throw new ValidatioError(errors);
            }
            const { city, busStop } = request.body;

            /** If directory exists skip */
            if (!fs.existsSync(this.directoryPath)) {
                fs.mkdirSync(this.directoryPath);
            }

            /** Write data to file */
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

    private removeDirectoryFiles = async (directoryPath: string) => {
        try {
            if (!fs.existsSync(directoryPath)) {
                throw new APIError('Directory not found', 404);
            }

            /** List all files inside directory */
            const fileList = fs.readdirSync(directoryPath);

            /** Remove every file inside directory using parallel processing */
            await Promise.all(
                fileList.map((file: string) => {
                    const filePath = path.join(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'tmp',
                        file,
                    );
                    fs.unlinkSync(filePath);
                }),
            );

            /** Remove directory entry */
            fs.rmdirSync(this.directoryPath);
        } catch (error) {
            throw error;
        }
    };

    public deleteDirectory = async (
        _request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
            /** Pushing operation to event call stack  */
            setTimeout(async () => {
                await this.removeDirectoryFiles(this.directoryPath);
            }, 0);

            response.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Directory removed',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new FileIO();
