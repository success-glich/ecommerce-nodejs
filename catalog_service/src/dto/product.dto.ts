import {  IsNotEmpty, IsNumber, IsString, Min  } from "class-validator";

export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    description: string;

    @IsNumber()
    @Min(1)
    stock: number;

    @IsNumber()
    price: number;
} 
