import { Module } from "@nestjs/common";
import { UserController, storageAvatar } from "./user.conntroller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "../users/users.model";
import { Folder } from "src/folder/folder.model";
import { File } from "src/repository/repository.model";
import { MulterModule } from "@nestjs/platform-express"; 


@Module({
    imports:[
        MongooseModule.forFeature([User, Folder, File]),
        MulterModule.register({
            storage: storageAvatar, 
        })
    ],
    controllers: [UserController],
    providers:[
        UserService
    ]
})


export class UserModule{}