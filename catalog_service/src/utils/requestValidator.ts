import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator"
import { error } from "console";

const validationError = async (input:any)=>{
    const error = await validate(input,{
        ValidationError:{target:true}
    });

    if(error.length){
        return error;
    }

    return false;
}

export const RequestValidator = async<T>(type:ClassConstructor<T>,body:any)=>{
    const input = plainToClass(type,body);
    const errors = await validationError(input);
    if(errors){
        const errMessage = errors.map((error:ValidationError)=>{
            return (Object as any).values(error.constraints);
        }).join(", ")

        return{
            error:errMessage,
            input
        }
       }

       return {error:false,input}
}