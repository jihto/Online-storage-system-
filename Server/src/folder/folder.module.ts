import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"; 
import { File } from "src/repository/repository.model";
import { FolderController } from "./folder.controller";
import { Folder } from "./folder.model";
import { FolderService } from "./folder.service";
import { User } from "src/auth/models";



@Module({
    imports: [
        MongooseModule.forFeature([Folder, File, User]),
    ],
    controllers: [FolderController],
    providers:[FolderService],
})

export class FolderModule{}