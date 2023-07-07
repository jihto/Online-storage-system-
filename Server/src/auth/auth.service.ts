import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 
import { ForbiddenException, NotAcceptableException } from "@nestjs/common/exceptions";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { Tokens } from "./types/token.type";
import { IAuth } from "./models/auth.model";
import { IUser } from "../users/users.model";
import { DataSignInDto, DataSignUpDto } from "./dtos/data-user.dto";
import { MailService } from "src/mail/mail.service"; 
import { Response } from "express";

@Injectable({})
export class AuthService { 
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<IAuth>, 
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly mailService: MailService,
        private jwtService: JwtService,
    ) {} 
        
    private opt: number;
    private async getTokenAndRefresh(payload: Object): Promise<Tokens>{
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload,{
                    secret: jwtConstants.secret,
                    expiresIn: "30m"
                } 
            ),
            this.jwtService.signAsync(payload,{
                    secret: jwtConstants.secret,
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
        this.opt = number;  
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
            if(authUser && isPassword){
                const user = await this.userModel.findOne({ user: authUser._id});
                return user; 
            }
            return null;
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    } 


    async signin(user: DataSignUpDto): Promise<DataSignInDto>{   
        try {   
            const { accessToken, refreshToken } = await this.getTokenAndRefresh(user); 
            await this.userModel.findOneAndUpdate({user: user._id}, {$set: { token: accessToken, refreshToken }}); 
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
                username, 
                roles: newUser.role, 
            } 
            return new DataSignUpDto(dataUser);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    async refreshToken(data: any): Promise<Tokens>{
        try {   
            const checkUser = await this.userModel.findOne({ _id: data._id}); 
            const checkToken = await this.jwtService.verify(jwtConstants.secret, data.refreshToken);
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
    
    async changePassword(email : string, token: any, res: Response){
        try {
            const isExists = await this.authModel.findOne({ email });
            if(!isExists)
                throw new HttpException('Email wasn\'t exists', HttpStatus.BAD_REQUEST);
            // const isToken = await this.jwtService.verify(jwtConstants.secret, token);
            // if(!isToken)
            //     throw new HttpException('Token wasn\'t exists', HttpStatus.BAD_REQUEST);
            console.log({"otp":this.generateOTP()});
            // await this.mailService.sendUserConfirmation(email, "tokenn");
            res.status(HttpStatus.OK).send('Send email successful');
            return []; 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }
    
}  