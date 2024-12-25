import { error } from "console";
import { STATUS_CODE } from "./status-code";


class BaseError extends Error{
    public readonly name:string;
    public readonly status:number;
    public readonly message:string;

    constructor(name:string,status:number,description:string){
        super(description);
        this.name = name;
        this.status = status;
        this.message = description;
        Object.setPrototypeOf(this,new.target.prototype)

        Error.captureStackTrace(this);
    }
}

// * 500 Internal Server Error
export class ApiError extends BaseError{
    constructor(description='api Error'){
        super('api internal server error',STATUS_CODE.SERVER_ERROR,description)
    }
}

export class ValidationError extends BaseError{
    constructor(description='Validation Error'){
        super('bad request',STATUS_CODE.BAD_REQUEST,description)

    }
}

export class AuthorizationError extends BaseError{
    constructor(description='access denied'){
        super('access denied',STATUS_CODE.UNAUTHORIZED,description)
    }
}

export class NotFoundError extends BaseError{
    constructor(description='not found'){
        super('not found',STATUS_CODE.NOT_FOUND,description)
    }
}