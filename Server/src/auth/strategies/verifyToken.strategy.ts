import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants"; 
import { JwtPayload } from "../types/payload.type";


@Injectable()
export class VerifyTokenStrategy extends  PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
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