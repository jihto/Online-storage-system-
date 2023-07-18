import { CanActivate, ExecutionContext, Injectable, } from "@nestjs/common";
import { Reflector } from "@nestjs/core"; 
import { AuthMiddleware } from "../middleware/auth.middleware"; 
import { Role } from "../../auth/interfaces/roles.enum";  
// import { VerifyTokenAuthGuard } from "./verifyToken-auth.guard";
// import { map } from 'rxjs/operators';



@Injectable()
export class RolesGuard implements CanActivate{ 
    constructor(private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(process.env.ROLES_KEYS, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        await new AuthMiddleware().use(req, null, () => {}); //let it  run to set user in request than code below can get user
        const roles = req.user.roles; 
        
        return requiredRoles.some((role) => roles?.includes(role));

        // if (canActivate instanceof Observable) {
        //     return canActivate.pipe(
        //         map(() => {
        //             const req = context.switchToHttp().getRequest();
        //             const user = req.user;
        //             console.log(user);
        //             return user && requireRoles.includes(user.role);
        //         })
        //     );
        // } else {
        //     const req = context.switchToHttp().getRequest();
        //     const user = req.user;
        //     console.log(user);
        //     return user && requireRoles.includes(user.role);
        // } 
    }   
}