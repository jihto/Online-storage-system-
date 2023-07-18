import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { JwtPayload } from "../interfaces/payload.interface";


@Injectable()
export class VerifyTokenStrategy extends  PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }
    async validate( payload: JwtPayload) { 
        //set Req.user 
        return { 
            userId: payload.sub, 
            username: payload.username, 
            roles: payload.roles,
        }; 
    }
}