import { Exclude, Transform, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId, Types } from "mongoose";
import { IUser } from "src/users/users.model"; 
import { IFolder } from "../folder.model";
import { IFile } from "src/repository/repository.model"; 


export class FolderDto {
    @IsNotEmpty()
    @Type(() => String)
    _id: Types.ObjectId; 

    @IsString()
    name: string;

    @Type(() => String)
    parent: IFolder['_id'];

    @Type(() => String)
    kids: IFolder[] | [];

    @Type(() => String)
    files: IFile[] | [];

    @Type(() => String)
    owner: IUser['_id']; 

    @IsString()
    color: string;

    @IsString()
    updateAt: Date;

    @Exclude()
    @IsBoolean()
    isDeleted: boolean; 

    constructor(partial: Partial<FolderDto>){
        this._id = partial._id;
        this.name = partial.name; 
        this.color = partial.color;
        this.parent = partial.parent;
        this.kids = partial.kids;
        this.files = partial.files;
        this.owner = partial.owner;  
    }
}

export class CreateFolderDto{
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    parent?: string;
}

export class UpdateFolderDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    color?: string; 
}

export class MoveFolderDto{
    @IsNotEmpty()
    @Type(() => String)
    currentFolder: ObjectId;

    @Type(() => String)
    newFolder?: ObjectId;
}