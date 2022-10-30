export interface ILocal {
    EXPRESS: {
        ENVIRONMENT: string;
        PORT: string;
        ACCESS_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRY: string;
        SESSION_EXPIRY: number;
    };
    DATABASE: {
        MONGO_URI: string;
    };
    GOOGLE_AUTH: {
        CLIENT_ID: string;
        CLIENT_SECRET: string;
        CALLBACK_URL: string;
    };
}
