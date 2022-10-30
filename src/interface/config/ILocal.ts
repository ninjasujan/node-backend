export interface ILocal {
    EXPRESS: {
        ENVIRONMENT: string;
        PORT: string;
        ACCESS_TOKEN_SECRET: string;
    };
    DATABASE: {
        MONGO_URI: string;
    };
}
