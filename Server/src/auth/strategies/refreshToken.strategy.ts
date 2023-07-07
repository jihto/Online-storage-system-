import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";  


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy ,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }
    async validate(req: Request, payload: any){  //payload = req.user 
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        if(!refreshToken)
            throw new ForbiddenException('Refresh token malformed'); 
        return { 
            _id:payload.sub,
            username: payload.username,
            refreshToken 
        };
    }
}