import { Module } from "@nestjs/common"; 
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from "@nestjs/passport";    
import { JwtModule } from "@nestjs/jwt";  
import { VerifyTokenStrategy, RefreshTokenStrategy, LocalStrategy } from "./strategies";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core"; 
import { RolesGuard } from "./guards"; 
import { MailModule } from "src/mail/mail.module";
import { Auth } from "./auth.model";
import { User } from "src/users/users.model"; 
import { AuthController } from "./controllers/auth/auth.controller"; 
import { AuthService } from "./services/auth/auth.service";
@Module({ 
    imports:[
        PassportModule,
        MongooseModule.forFeature([Auth, User]),
        JwtModule,
        MailModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        LocalStrategy, 
        VerifyTokenStrategy, 
        RefreshTokenStrategy, 
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        } 
    ],
})
export class AuthModule{}
