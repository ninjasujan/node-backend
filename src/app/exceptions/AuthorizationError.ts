class AuthorizationError extends Error {
    public status: number;
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
        this.status = statusCode;
    }
}

export default AuthorizationError;
