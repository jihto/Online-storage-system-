import { Body, Controller, Post, Get, ParseEnumPipe, HttpException } from "@nestjs/common";
import { Delete, Param, Put, Query, Request, UploadedFiles, UseInterceptors } from "@nestjs/common/decorators";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { RepositoryService } from "./repository.service"; 
import { CreateRepositoryDto, RepositoryDto } from "./dtos/repository.dto";
import { SortType, SortValue, Sorting } from "./pipes/sort.enum"; 
import { ObjectId, SortOrder } from "mongoose";
import { ParseObjectIdPipe } from "src/common/pipes/objectId.pipe";
import { UserRequest } from "src/common/interfaces/user-request.interface";


@Controller('repository')
export class RepositoryController{
    constructor(private repositoryService: RepositoryService){

    } 
    @Get()
    searchFiles(
        @Request() req: UserRequest,
        @Query('type', new ParseEnumPipe(SortType)) type: SortType,
        @Query('value', new ParseEnumPipe(SortValue)) value: SortOrder, 
        @Query('search') search: string | undefined, 
    ): Promise<RepositoryDto[]>{
        return this.repositoryService.searchFilesOfUser(req.user._id, type, value, search);
    }

    @Get('isFavorited')
    favoritesFileOfUser(
        @Request() req: UserRequest,
    ): Promise<RepositoryDto[]>{
        return this.repositoryService.favoritesFileOfUser(req.user._id);
    }

    @Get('isDeleted')
    filesDeletedOfUser(
        @Request() req: UserRequest,
    ): Promise<RepositoryDto[]>{
        return this.repositoryService.filesDeletedOfUser(req.user._id);
    }
    
    @Get('/:id')
    file(@Param('id', ParseObjectIdPipe) _id: ObjectId ): Promise<RepositoryDto>{
        return this.repositoryService.file(_id);
    } 

    @Put('favorite/:id')
    favoriteFile(
        @Param('id', ParseObjectIdPipe) _id: ObjectId
    ): Promise<HttpException>{
        return this.repositoryService.favoriteFile(_id)
    }

    @Put('unfavorite/:id')
    unFavoriteFile(
        @Param('id', ParseObjectIdPipe) _id: ObjectId
    ): Promise<HttpException>{
        return this.repositoryService.unFavoriteFile(_id)
    }
    
    @Post('create')
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() { idFolder } : CreateRepositoryDto ,
        @Request() req : UserRequest
    ): Promise<HttpException>{   
        console.log(files);   
        return this.repositoryService.createFile(files, req.user._id, idFolder);
    }

    // @Put('update/:id')
    // @UseInterceptors(FileInterceptor('file', storage))
    // updateFile(
    //     @Param('id', ParseObjectIdPipe) id: string,
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body() { title, description }: UpdateReposDto
    // ): Promise<RepositoryDto>{
    //     return this.repositoryService.updateFile(file, id, title, description);
    // }

    @Delete('delete/:id')
    deleteFile(
        @Param('id', ParseObjectIdPipe) id: ObjectId
    ): Promise<HttpException>{
        return this.repositoryService.deleteFile(id);
    }

    @Put('restore/:id')
    restore(
        @Param('id', ParseObjectIdPipe) id: ObjectId 
    ): Promise<HttpException>{
        return this.repositoryService.restore(id);
    }
} 