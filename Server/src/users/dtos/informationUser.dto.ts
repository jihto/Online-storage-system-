import { Exclude, Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";


export class InformationUser{
    @IsNotEmpty()
    @Type(() => String)
    _id: string; 

    @IsString()
    username: string;

    @IsObject()
    auth: Object;

    @IsNumber()
    files: Number;

    @IsNumber()
    folders: Number; 

    @IsString()
    avatar: string;

    @IsDate()
    createAt: Date;

    @IsDate()
    updateAt: Date;

    constructor(partial: Partial<InformationUser>){ 
        Object.assign(this, partial);
    }
} 