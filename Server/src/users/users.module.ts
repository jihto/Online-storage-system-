import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Folder } from 'src/folder/folder.model';
import { File } from 'src/repository/repository.model'; 
import { User } from 'src/users/users.model';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service'; 
import { storageAvatar } from './storage.config';


@Module({
    imports:[
        MongooseModule.forFeature([File, User, Folder]),
        MulterModule.register({
            storage: storageAvatar,
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB (increase as needed)
            },
        })
    ],
    controllers: [UsersController],
    providers:[
        UsersService
    ]
})
export class UsersModule {}
