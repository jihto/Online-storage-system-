import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"; 

//When come here the class below using local.strategy.ts to keep working
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    canActivate(context: ExecutionContext){
        // const result = (await super.canActivate(context) as boolean) 
        // const request = context.switchToHttp().getRequest();
        // console.log(request);
        // await super.logIn(request);
        // return result;
        return super.canActivate(context);
    }
}
