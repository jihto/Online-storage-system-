import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RepositoryController, storage } from "./repository.controller";
import { RepositoryService } from "./repository.service";
import { File } from "./repository.model";
import { User } from "src/auth/models";
import { MulterModule } from "@nestjs/platform-express";
import { Folder } from "src/folder/folder.model";



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
    providers: [RepositoryService]
})


export class RepositoryModule{}