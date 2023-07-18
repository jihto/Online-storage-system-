import { Body, Controller, Post, Get, UsePipes, ValidationPipe, ParseEnumPipe } from "@nestjs/common";
import { Param, Req, Request, Res, UseGuards } from "@nestjs/common/decorators"; 
import { AuthGuard } from "@nestjs/passport";  
import { Response } from "express"; 
import { HttpStatus, HttpException } from '@nestjs/common';  
import { DataSignInDto, DataSignUpDto } from "src/auth/dtos/data-user.dto";

import { Roles } from "src/common/decoraters/roles.decorater";
import { Role } from "src/auth/interfaces/roles.enum";
import { UpdatePasswordDto } from "src/auth/dtos/update-password.dto";
import { LocalAuthGuard } from "src/auth/guards";  
import { AuthService } from "src/auth/services/auth/auth.service";
import { SignUpDto } from "src/auth/dtos/authentication.dto";
import { ParseJwtPipe } from "src/auth/pipes/jwt.pipe";
import { ParseEmailPipe } from "src/auth/pipes/email.pipe";
import { UserRequest } from "src/common/interfaces/uer-request.interface";


@Controller('auth')  
export class AuthController{ 
    constructor(private authService: AuthService){

    }
    //URL POST /auth/signin 
    @UseGuards(LocalAuthGuard) //Call the fuction LocalAuthGuard with custom AuthGuard('local') of passport
    @Post('signin')
    signin(
        @Request() req: UserRequest,
    ): Promise<DataSignInDto>{
        console.log(req.user);
        return this.authService.signin(req.user);
    }

    @Post('signup')
    signup(        
        @Body() { password, email, username }: SignUpDto, 
    ): Promise<DataSignUpDto>{
        return this.authService.signup(email, password, username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.USER)
    @Get() 
    getAllUser(@Request() req: UserRequest): string{   
        return req.user;
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    refreshToken(@Request() req: UserRequest){ 
        return this.authService.refreshToken(req.user); 
    } 
    
    @Post('change_password')
    requestChangePassword( 
        @Body('email', ParseEmailPipe) email: string,
        @Res() res: Response,
    ){  
        return this.authService.requestChangePassword(email, res);
    }

    @Post('update_password/:token')
    updatePassword(
        @Param('token') token: string,
        @Body() { newPassword, otp } : UpdatePasswordDto
    ):Promise<HttpException>{
        console.log({token})
        return this.authService.updatePassword(newPassword, token, otp);
    }
}