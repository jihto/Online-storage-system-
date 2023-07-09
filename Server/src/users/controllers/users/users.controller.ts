import { Body, Controller, FileTypeValidator, Get, HttpException, ParseFilePipe, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { InformationUser } from 'src/users/dtos/informationUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Get()
    informationUser(@Request() request):Promise<InformationUser> { 
        return this.usersService.informationUser(request.user);
    }

    @Put('updateAvatar') 
    @UseInterceptors(FileInterceptor('avatar'))
    changeAvatar(
        @UploadedFile( 
            new ParseFilePipe({
                validators: [
                    // new MaxFileSizeValidator({ maxSize: 5000 }),
                    new FileTypeValidator({ fileType: 'image/jpeg' }),
                ],
            }), 
        ) avatar: Express.Multer.File,
        @Request() request,
    ): Promise<HttpException>{
        return this.usersService.changeAvatar(request.user._id, avatar);
    }

    @Put('updateInformation')
    updateInformationUser( 
        @Body('username') username: string,
        @Request() request,
    ): Promise<HttpException>{ 
        return this.usersService.updateInformationUser(request.user._id, username);
    }
}
