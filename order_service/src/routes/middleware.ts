import { Request, Response, NextFunction } from "express";
import { logger, ValidateUser } from "../utils";

export const RequestAuthorizer = async (req: Request, res: Response, next: NextFunction) => {

    console.log('RequestAuthorizer called', req.headers.authorization);

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                error: 'Unauthorized due to authorization token missing!'
            })
        }
        const userData = await ValidateUser(req.headers.authorization);

        req.user = userData;
        next()
    } catch (error) {
        console.log('Unable authorize user:', error);
        logger.error(error);
        return res.status(403).jsonp({ error })
    }

}