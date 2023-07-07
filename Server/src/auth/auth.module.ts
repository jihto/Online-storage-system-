import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from "@nestjs/passport";    
import { JwtModule } from "@nestjs/jwt";  
import { VerifyTokenStrategy, LocalStrategy, RefreshTokenStrategy } from "./strategies";
import { Auth, User } from "./models";
import { APP_GUARD } from "@nestjs/core"; 
import { RolesGuard } from "./guards"; 
import { MailModule } from "src/mail/mail.module";
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
