import { Exclude, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";


export class ResponseUserDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: Types.ObjectId; 

    @IsNotEmpty()
    @IsEmail()
    email: string; 

    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsString()
    avatar: string;

    constructor(partial: Partial<ResponseUserDto>){
        this._id = partial._id;
        this.email = partial.email;  
        this.username = partial.username; 
        this.avatar = partial.avatar;
    }
}