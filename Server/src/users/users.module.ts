import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Folder } from 'src/folder/folder.model';
import { File } from 'src/repository/repository.model'; 
import { User } from 'src/users/users.model';
import { UsersController, storageAvatar } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
 

@Module({
    imports:[
        MongooseModule.forFeature([User, Folder, File]),
        MulterModule.register({
            storage: storageAvatar, 
        })
    ],
    controllers: [UsersController],
    providers:[
        UsersService
    ]
})
export class UsersModule {}
