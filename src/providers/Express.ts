import http, { Server } from 'http';
import express, { Application } from 'express';
import routes from '../app/routes/index';
import ExceptionHandler from '../app/exceptions/Handler';
import httpMiddleware from '../app/middleware/http.middleware';
import Locals from '../configs/Locals';
import Logger from '../logger/logger';

class Express {
    /**
     * Create express object
     */
    public express: Application;

    public server: Server;

    /**
     * Initialize the express server
     */
    constructor() {
        this.express = express();
        this.mountMiddlewware();
        this.mountRoute();
        this.server = http.createServer(this.express);
    }

    private mountMiddlewware(): void {
        httpMiddleware.mount(this.express);
    }

    public mountRoute(): void {
        this.express.use('/api', routes);
        this.express.use(ExceptionHandler.errorHandler);
    }

    public getExpress(): Server {
        return this.server;
    }

    public init(): void {
        const { PORT } = Locals.EXPRESS;
        this.server.listen(PORT, () => {
            Logger.info(`[Server Runinng in port] ${PORT}`);
        });
    }
}

export default new Express();
