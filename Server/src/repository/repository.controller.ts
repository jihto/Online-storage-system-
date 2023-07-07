import { Body, Controller, Post, Get, ParseEnumPipe, HttpException } from "@nestjs/common";
import { Delete, Param, Put, Query, Request, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common/decorators";
import { AnyFilesInterceptor, FileInterceptor, MulterModuleOptions } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { RepositoryService } from "./repository.service";
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { CreateReposDto, ReposResponseDto } from "./dtos/repository.dto";
import { SortType, SortValue, Sorting } from "./dtos/sort.enum";
import { ParseObjectIdPipe } from "./objectId.pipe";
import multer = require("multer");
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { SortOrder } from "mongoose";


export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const location: number = file.originalname.lastIndexOf('.') + 1;
        const typeFile: string = file.originalname.slice(location);
        let locationSaveFile: string = './uploads';
        if (typeFile === 'jpg' || typeFile === 'png' || typeFile === 'jpeg') {
            locationSaveFile += '/images';
        } else if (typeFile === 'docs' || typeFile === 'doc' || typeFile === 'docx') {
            locationSaveFile += `/docs`;
        } else if (typeFile === 'pdf' || typeFile === 'xlsx') {
            locationSaveFile += `/${typeFile}`;
        } else {
            locationSaveFile += '/others';
        }
        cb(null, locationSaveFile);
    },
    filename: (req, file, cb) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${filename}${extension}`);
    },
});


@Controller('repository')
export class RepositoryController{
    constructor(private repositoryService: RepositoryService){}
    
    @Get('')
    searchFiles(
        @Request() req : any,
        @Query('type',new ParseEnumPipe(SortType)) type: SortType,
        @Query('value',new ParseEnumPipe(SortValue)) value: SortOrder, 
        @Query('search') search: string, 
    ): Promise<ReposResponseDto[]>{
        return this.repositoryService.searchFilesOfUser(req.user._id, type, value, search);
    }

    @Get('isFavorited')
    favoritesFileOfUser(
        @Request() req : any,
    ): Promise<ReposResponseDto[]>{
        return this.repositoryService.favoritesFileOfUser(req.user._id);
    }

    @Get('sorting')
    filesOfUser( 
        @Request() req : any,
        @Query('type',new ParseEnumPipe(SortType)) type: SortType,
        @Query('value',new ParseEnumPipe(SortValue)) value: SortOrder, 
    ): Promise<ReposResponseDto[]>{  
        return this.repositoryService.filesOfUser(req.user._id, type, value);
    }

    @Put('favorite/:id')
    favoriteFile(
        @Param('id', ParseObjectIdPipe) _id: string
    ): Promise<HttpException>{
        return this.repositoryService.favoriteFile(_id)
    }

    @Put('unfavorite/:id')
    unFavoriteFile(
        @Param('id', ParseObjectIdPipe) _id: string
    ): Promise<HttpException>{
        return this.repositoryService.UnFavoriteFile(_id)
    }

    @Get('isDeleted')
    filesDeletedOfUser(
        @Request() req : any,
    ): Promise<ReposResponseDto[]>{
        return this.repositoryService.filesDeletedOfUser(req.user._id);
    }

    @Get('/:id')
    file(
        @Param('id', ParseObjectIdPipe) _id: string
    ): Promise<ReposResponseDto>{
        return this.repositoryService.file(_id);
    }

    @Post('create')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() { idFolder } : CreateReposDto ,
        @Request() req : any
    ): Promise<HttpException>{  
        console.log(idFolder);
        console.log(files);   
        return this.repositoryService.createFile(files, req.user._id, idFolder);
    }

    // @Put('update/:id')
    // @UseInterceptors(FileInterceptor('file', storage))
    // updateFile(
    //     @Param('id', ParseObjectIdPipe) id: string,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() { title, description }: UpdateReposDto
    // ): Promise<ReposResponseDto>{
    //     return this.repositoryService.updateFile(file, id, title, description);
    // }

    @Delete('delete/:id')
    deleteFile(
        @Param('id', ParseObjectIdPipe) id: string
    ): Promise<HttpException>{
        return this.repositoryService.deleteFile(id);
    }

    @Put('restore/:id')
    restore(
        @Param('id', ParseObjectIdPipe) id: string 
    ): Promise<HttpException>{
        return this.repositoryService.restore(id);
    }
} 