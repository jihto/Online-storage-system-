import { PassportStrategy } from '@nestjs/passport'; 
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common'; 


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authservice: AuthService){
        super();
    }
    //get email and password from data request of client in function signin controller file
    async validate (email: string, password: string){   
        //calling function to validate data in function validateUser AuthServer file
        const user = await this.authservice.validateUser(email, password);
        if(!user)
            throw new UnauthorizedException(); 
        const data = {
            _id: user._id,
            username: user.username,
            roles: user.role, 
        }
        return {...data, email};
    }
}