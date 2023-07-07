import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { IFile } from "src/repository/repository.model";
import { CreateFolderDto, FolderDto } from "./dtos/folder.dto";
import { FolderService } from "./folder.service";
import { SortOrder } from "mongoose";



@Controller('folder')
export class FolderController{
    constructor(private folderService: FolderService){}
    
    @UsePipes(new ValidationPipe())

    @Get('/isDeleted')
    folderIsDeleted(
        @Request() req, 
    ): Promise<FolderDto[]>{ 
        return this.folderService.folderIsDeleted(req.user);
    }
    
    @Get('/:id')
    folderOfUser(
        @Param('id') _id:string,
    ): Promise<FolderDto>{ 
        return this.folderService.folder(_id);
    }

    @Get('')
    foldersOfUser(
        @Request() req, 
        @Query('search') search: string,
        @Query('type') type: string,
        @Query('value') value: SortOrder,
    ): Promise<FolderDto[]>{ 
        return this.folderService.foldersOfUser(req.user, search,type, value );
    }
    


    @Post('create')
    createFolder(
        @Body() { name, parent } : CreateFolderDto,
        @Request() req,
    ): Promise<FolderDto>{
        console.log({name,owner: req.user._id, parent});
        const owner: string = req.user._id; 
        return this.folderService.createFolder(name, owner, parent);
    }

    @Put('update/:id')
    updateFolder(
        @Param('id') _id: string, 
        @Body() { name, color} 
    ): Promise<FolderDto>{
        return this.folderService.updateFolder(_id, name, color );
    }

    @Put('move/:idFolder')
    moveFolder(
        @Param('idFolder') _id: string,
        @Body() { currentFolder, newFolder }
    ){
        return this.folderService.moveFolder(_id, currentFolder, newFolder);
    }

    @Delete('delete/:id')
    deleteFolder(
        @Param('id') _id: string,
    ):Promise<HttpException>{
        return this.folderService.deleteFolder(_id);
    }

    @Post('restore/:id')
    restore(
        @Param('id') _id: string,
    ):Promise<HttpException>{
        console.log(_id);
        return this.folderService.restoreFolder(_id);
    }
} 