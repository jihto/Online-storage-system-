import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateFolderDto, FolderDto, MoveFolderDto, UpdateFolderDto } from "./dtos/folder.dto";
import { FolderService } from "./folder.service";
import { ObjectId, SortOrder, Types } from "mongoose"; 
import { ParseObjectIdPipe } from "src/common/pipes/objectId.pipe";
import { SortType } from "./types/sorting.enum";
import { UserRequest } from "src/common/interfaces/user-request.interface";

@Controller('folder')
export class FolderController{
    constructor(private folderService: FolderService){}
    
    @UsePipes(new ValidationPipe()) 
    @Get('/isDeleted')
    folderIsDeleted(
        @Request() req: UserRequest, 
    ): Promise<FolderDto[]>{ 
        return this.folderService.folderIsDeleted(req.user._id);
    }
    
    @Get('/:id')
    folderOfUser(
        @Param('id', ParseObjectIdPipe) _id: ObjectId,
    ): Promise<FolderDto>{ 
        return this.folderService.folder(_id);
    }

    @Get()
    foldersOfUser(
        @Request() req: UserRequest, 
        @Query('search') search: string,
        @Query('type') type: SortType,
        @Query('value') value: SortOrder,
    ): Promise<FolderDto[]>{ 
        return this.folderService.foldersOfUser(req.user._id, search,type, value );
    }
    
    @Post('create')
    createFolder(
        @Body() { name, parent } : CreateFolderDto,
        @Request() req: UserRequest,
    ): Promise<FolderDto>{
        console.log({name,owner: req.user._id, parent});
        const owner: ObjectId = req.user._id; 
        return this.folderService.createFolder(name, owner, parent);
    }

    @Put('update/:id')
    updateFolder(
        @Param('id', ParseObjectIdPipe) _id: ObjectId, 
        @Body() { name, color} : UpdateFolderDto
    ): Promise<FolderDto>{
        return this.folderService.updateFolder(_id, name, color );
    }

    @Put('move/:idFolder')
    moveFolder(
        @Param('idFolder', ParseObjectIdPipe) _id: ObjectId,
        @Body() { currentFolder, newFolder }: MoveFolderDto
    ){
        return this.folderService.moveFolder(_id, currentFolder, newFolder);
    }

    @Delete('delete/:id')
    deleteFolder(
        @Param('id', ParseObjectIdPipe) _id: Types.ObjectId,
    ):Promise<HttpException>{
        return this.folderService.deleteFolder(_id);
    }

    @Post('restore/:id')
    restore(
        @Param('id', ParseObjectIdPipe) _id: Types.ObjectId,
    ):Promise<HttpException>{ 
        return this.folderService.restoreFolder(_id);
    }
} 