import winston, { format } from 'winston';

class Logger {
    public logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                this.myFormat,
            ),
            transports: [new winston.transports.Console()],
        });
    }

    private myFormat = format.printf(({ level, message, timestamp }) => `[ ${level} ] ${timestamp} - ${message}`);

    info = (msg: string) => {
        this.logger.info(msg);
    };

    warn = (msg: string) => {
        this.logger.warn(msg);
    };

    error = (msg: string) => {
        this.logger.error(msg);
    };

    debug = (msg: string) => {
        this.logger.debug(msg);
    };
}

export default new Logger();
