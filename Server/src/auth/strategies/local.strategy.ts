import { PassportStrategy } from '@nestjs/passport';  
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { AuthService } from '../services/auth/auth.service';
import { JwtPayload } from '../interfaces/payload.interface';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authservice: AuthService){
        super();
    }
    //get email and password from data request of client in function signin controller file
    async validate (email: string, password: string){   
        //calling function to validate data in function validateUser AuthServer file
        const user:JwtPayload = await this.authservice.validateUser(email, password);
        if(!user)
            throw new UnauthorizedException();   
        return user;
    }
}