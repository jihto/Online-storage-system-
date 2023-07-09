import { Body, Controller, Post, Get, UsePipes, ValidationPipe, ParseEnumPipe } from "@nestjs/common";
import { Param, Req, Request, Res, UseGuards } from "@nestjs/common/decorators"; 
import { AuthGuard } from "@nestjs/passport";  
import { Response } from "express";
import { AuthService } from "./auth.service";   
import { SignUpDto } from "./dtos/authentication.dto";
import { DataSignInDto, DataSignUpDto } from "./dtos/data-user.dto";
import { LocalAuthGuard, RolesGuard, VerifyTokenAuthGuard } from "./guards";
import { Role } from "./models/roles.enum"; 
import { Roles } from "./roles.decorater";
import { ParseEmailPipe } from "./pipes/email.pipe";


@Controller('auth')  
export class AuthController{ 
    constructor(private authService: AuthService){}
    //URL POST /auth/signin 
    @UseGuards(LocalAuthGuard) //Call the fuction LocalAuthGuard with custom AuthGuard('local') of passport
    @Post('signin')
    signin( @Request() req: any): Promise<DataSignInDto>{
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
    getAllUser(@Request() req: any): string{   
        return req.user;
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    refreshToken(@Request() req: any){ 
        return this.authService.refreshToken(req.user); 
    } 
    
    @Post('change_pass/:token')
    changePassword(
        @Param('token') token: string,
        @Body('email', ParseEmailPipe) email: string,
        @Res() res: Response,
    ){
        return this.authService.changePassword(email, token, res);
    }
}