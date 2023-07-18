import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator"; 
import { PartialType } from "@nestjs/mapped-types";

export class SignInDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ValidateIf((o) => o.password.length < 8)
    password: string;
}


export class SignUpDto extends PartialType(SignInDto){ 
    @IsNotEmpty()
    @IsString() 
    username: string;
}
