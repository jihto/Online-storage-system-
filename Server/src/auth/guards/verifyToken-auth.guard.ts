import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class VerifyTokenAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
    //custom req.user
    handleRequest(err: Error, user: any, info: any, context: ExecutionContext) {
        //return user = false if token is invalid 
        const req = context.switchToHttp().getRequest(); 
        req.user = user;  
        return user;
    }
}