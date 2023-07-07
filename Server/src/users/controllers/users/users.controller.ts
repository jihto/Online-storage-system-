import { Body, Controller, FileTypeValidator, Get, HttpException, ParseFilePipe, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { InformationUser } from 'src/users/dtos/informationUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

export const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/avatars')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname;
        const fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
})

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Get()
    informationUser(@Request() req):Promise<InformationUser> { 
        return this.usersService.informationUser(req.user);
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
        @Request() req,
    ): Promise<HttpException>{
        return this.usersService.ChangeAvatar(req.user._id, avatar);
    }

    @Put('updateInformation')
    updateInformationUser( 
        @Body() { username },
        @Request() req,
    ): Promise<HttpException>{
        return this.usersService.updateInformationUser(req.user._id, username);
    }
}
