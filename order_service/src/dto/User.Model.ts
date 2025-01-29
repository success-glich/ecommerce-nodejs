declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export interface User {
    userId: number;
    email: string;
    iat: number;
    exp: number;
}
