import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class UpdatePasswordDto{
    @IsNumber()
    @IsNotEmpty()
    otp: number;


    @IsString()
    @IsNotEmpty() 
    @ValidateIf((o) => o.length < 8)
    newPassword: string;
}