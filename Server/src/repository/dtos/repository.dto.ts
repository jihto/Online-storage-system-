import { Types } from "mongoose";
import { IsString, IsNotEmpty, IsOptional, IsBoolean} from "class-validator";
import { IUser } from "src/users/users.model";
import { Exclude, Type } from "class-transformer"; 
import { IFolder } from "src/folder/folder.model";

export class ReposResponseDto{
    @IsNotEmpty()
    @Type(() => String)
    _id: Types.ObjectId;
    
    @Type(() => String) // convert ObjectId to string 
    user: IUser['_id'];

    @IsString()
    fileName: string;
    
    @Exclude()
    folder: IFolder['_id'];

    @Exclude()//remove this field from DTO when using it
    @IsBoolean()
    isDeleted: boolean;

    @IsBoolean()
    isFavorite: boolean;

    @IsString()
    updatedAt: Date;

    @IsString()
    createAt: Date;

    @Exclude()
    __v: number;

    constructor(partial: Partial<ReposResponseDto>){
        Object.assign(this, partial);
    }
}

export class CreateReposDto{ 
    @IsOptional()
    @IsString() 
    idFolder?: string;
 
}
 
