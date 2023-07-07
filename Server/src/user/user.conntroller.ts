import { Controller, HttpException, Get, Post, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "../users/dtos/user.dto";
import { InfoUser } from "../users/dtos/informationUser.dto";
import { Body, Put, UploadedFile, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common/pipes";
import multer = require("multer");
import { diskStorage } from "multer";


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

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}
    @Get()
    userInfo(@Request() req):Promise<InfoUser> { 
        return this.userService.infoUser(req.user);
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
        return this.userService.ChangeAvatar(req.user._id, avatar);
    }

    @Put('updateInformation')
    updateInformationUser( 
        @Body() { username },
        @Request() req,
    ): Promise<HttpException>{
        return this.userService.updateInformationUser(req.user._id, username);
    }
}