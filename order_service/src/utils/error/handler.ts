import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { AuthorizationError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";


export const HandleErrorWithLogger = (error:Error,req:Request,res:Response,next:NextFunction)=>{

    let reportError = true;
    let status=500;
    let data = error.message;

    // * skip common and knowns errors
    [NotFoundError,ValidationError,AuthorizationError].forEach(typeOfError=>{
        if(error instanceof typeOfError){
            reportError = false;
            status = error.status;
            data = error.message;
        }
    })

    if(reportError){
    // error reporting tools implementation eg: Cloudwatch,Sentry etc;
        logger.error(error);
    }else{
        logger.warn(error); // ignore common errors caused by user

    }

    return res.status(status).json(data)

}

export const HandleUncaughtException = (error:Error,req:Request,res:Response,next:NextFunction)=>{
    // * error reporting tools implementation eg: Sentry etc;
    logger.error(error);
    // return res.status(500).json(error.message); 
    process.exit(1);



}