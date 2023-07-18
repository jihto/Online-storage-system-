import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { ForbiddenException, NotAcceptableException } from "@nestjs/common/exceptions";
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';  
import { MailService } from "src/mail/mail.service"; 
import { Response } from "express";
import { ConfigService } from '@nestjs/config';
import { Tokens } from "src/auth/interfaces/token.interface";
import { IUser } from "src/users/users.model";
import { IAuth } from "src/auth/auth.model";
import { DataSignInDto, DataSignUpDto } from "src/auth/dtos/data-user.dto";
import { UpdatePasswordDto } from "src/auth/dtos/update-password.dto";
import { JwtPayload } from "src/auth/interfaces/payload.interface";
import { DecodeToken } from "src/auth/interfaces/Decode.interface";

@Injectable({})
export class AuthService { 
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<IAuth>, 
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly mailService: MailService,
        private jwtService: JwtService,
    ) {} 
        
    private config: ConfigService = new ConfigService();
    private otp: number;
    private async getTokenAndRefresh(payload: Object): Promise<Tokens>{
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload,{
                    secret: this.config.get('SECRET_KEY'),
                    expiresIn: "30m"
                } 
            ),
            this.jwtService.signAsync(payload,{
                    secret: this.config.get('SECRET_KEY'),
                    expiresIn: "1h"
                } 
            )
        ]);
        return {
            accessToken,
            refreshToken
        }
    }

    private generateOTP(){
        const number = Math.floor(Math.random()*10000);
        this.otp = number;  
        return number;
    }

    async validateUser(email: string, password: string): Promise<any>{ 
        try {
            const authUser = await this.authModel.findOne({ email });
            if(!authUser)
                throw new NotAcceptableException("Couldn't find user");
            const isPassword = await bcrypt.compare(password, authUser.password);
            if(!isPassword)
                throw new NotAcceptableException("Password isn't correct");
            console.log(authUser)
            if(authUser && isPassword){
                const user = await this.userModel.findOne({ auth: authUser._id});
                const dataUser: JwtPayload = {
                    _id: user._id,
                    username: user.username,
                    roles: [authUser.role],
                    email: authUser.email,
                }
                
                return dataUser; 
            }
            return null;
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    async signin(user: DataSignUpDto): Promise<DataSignInDto>{   
        try {   
            const { accessToken, refreshToken } = await this.getTokenAndRefresh(user); 
            await this.authModel.findOneAndUpdate({user: user._id}, {$set: { token: accessToken, refreshToken }}); 
            const data = {
                ...user,
                accessToken,
                refreshToken,
            } 
            return new DataSignInDto(data); 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    } 

    async signup(email: string, password: string, username: string): Promise<DataSignUpDto>{  
        try {  
            const isUser = await this.authModel.findOne({ email });
            if(isUser)
                throw new HttpException('User is exist', HttpStatus.BAD_REQUEST); 
            //Hash password usign bcrypt
            const hashPassword = await bcrypt.hash(password, 10); 
            if(!hashPassword)
                throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            const newAuth = new this.authModel({
                email,
                password: hashPassword,
            });
            const newUser = new this.userModel({
                username,
                auth: newAuth._id,
            });
            await newAuth.save((err, doc) => {
                if(err)
                    throw new NotAcceptableException(err.message);
                else
                    this.authModel.updateOne({ _id: doc._id}, {$set: {user: newUser._id}});
            });
            await newUser.save();  
            const dataUser = {
                _id: newUser.id, 
                email,
                roles: newAuth.role,
                username,  
            } 
            console.log(dataUser)
            return new DataSignUpDto(dataUser);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    async refreshToken(data: any): Promise<Tokens>{
        try {   
            const checkUser = await this.userModel.findOne({ _id: data._id}); 
            const checkToken = await this.jwtService.verify(this.config.get('SECRET_KEY'), data.refreshToken);
            if(!checkToken || ! checkUser)
                throw new ForbiddenException('Access Denied');
            const { accessToken, refreshToken } = await this.getTokenAndRefresh({name: data.name, sub: data._id});
                await this.userModel.updateOne({user: data._id}, {$set: { token: accessToken, refreshToken }});
                return {
                    accessToken,
                    refreshToken
                }
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    } 
    
    async requestChangePassword(email : string, res: Response){
        try {
            const isExists = await this.authModel.findOne({ email });
            if(isExists)
                throw new HttpException('Email wasn\'t exists', HttpStatus.BAD_REQUEST);
            await this.generateOTP(); 
            const { accessToken, refreshToken } = await this.getTokenAndRefresh({email, otp: this.otp});
            await this.mailService.sendUserConfirmation(email, accessToken, this.otp);
            res.status(HttpStatus.OK).send('Send email successful');
            return []; 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    async updatePassword(
        newPassword: string,  
        token: string, 
        otp: number,
    ): Promise<HttpException>{
        try{
            const decode = await this.jwtService.decode(token) as DecodeToken; 
            if(otp !== decode.otp)
                throw new HttpException('Authentication fail', HttpStatus.BAD_REQUEST);
            const hashPassword = await bcrypt.hash(newPassword, 10); 
            if(!hashPassword)
                throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            // const updatePassword = await this.authModel.findOne({ email:decode.email }, { $set: { password: hashPassword }});
            return new HttpException('Update password successfull', HttpStatus.OK)
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
        
    }
    
}  