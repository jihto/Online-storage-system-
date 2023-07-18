import { Exclude, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { IFolder } from "../folder.model";
import { FolderDto } from "./folder.dto";
import { IFile } from "src/repository/repository.model";
import { IUser } from "src/users/users.model";

export class KidsDto {
    @IsNotEmpty()
    @Type(() => String)
    _id: Types.ObjectId; 

    @IsString()
    name: string;

    @Type(() => String)
    parent: IFolder['_id'];

    @Type(() => String)
    kids!: FolderDto[] | [];
 
    @Type(() => String)
    files: IFile[] | [];

    @Type(() => String)
    owner: IUser['_id']; 

    @IsDate()
    color: string;

    @IsDate()
    updateAt: Date;

    @Exclude()
    @IsBoolean()
    isDeleted: boolean; 
  }