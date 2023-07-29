import { ClassSerializerInterceptor, Module } from '@nestjs/common'; 
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, NestModule } from "@nestjs/common/interfaces";
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { RepositoryModule } from './repository/repository.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FolderModule } from './folder/folder.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';  
import { UsersModule } from './users/users.module'; 
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';


@Module({
  imports: [
    AuthModule,  
    UsersModule,
    FolderModule,
    RepositoryModule,
    MongooseModule.forRoot( 
    ),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
  ], 
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor, 
    },{
      provide: APP_INTERCEPTOR,
      useClass: TimeOutInterceptor // Checking if request more 3s 
  }
  ]
})
export class AppModule implements NestModule
{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes("repository", "folder", "users"); //applies middleware to all routes except auth 
        // consumer
        //     .apply()
        //     .forRoutes('*'); // applies JWT authentication middleware to all routes
    }
  }
