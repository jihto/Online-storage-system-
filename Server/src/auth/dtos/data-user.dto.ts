import { OmitType } from "@nestjs/mapped-types/dist";
import { Exclude, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class DataSignInDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: Types.ObjectId; 

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Exclude()
    roles:string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    constructor(partial: Partial<DataSignInDto>){
        this._id = partial._id;
        this.email = partial.email; 
        this.roles = partial.roles;
        this.username = partial.username;
        this.accessToken = partial.accessToken;
        this.refreshToken = partial.refreshToken; 
    }
}

export class DataSignUpDto extends OmitType(DataSignInDto, ['accessToken', 'refreshToken', "roles"] as const) {

}