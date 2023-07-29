import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RepositoryController } from "./repository.controller";
import { RepositoryService } from "./repository.service";
import { File } from "./repository.model"; 
import { MulterModule } from "@nestjs/platform-express";
import { Folder } from "src/folder/folder.model";
import { storage } from "./storage.config";
import { User } from "src/users/users.model";
import { TimeOutInterceptor } from "src/common/interceptors/timeout.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({  
    imports: [
        MongooseModule.forFeature([File, User, Folder]),
        MulterModule.register({
            storage: storage,
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB (increase as needed)
            },
        })
    ],
    controllers: [RepositoryController],
    providers: [
        RepositoryService,
    ]
})


export class RepositoryModule{}