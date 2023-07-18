import { HttpException, HttpStatus, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {  HydratedDocument, Model, ObjectId, SortOrder } from "mongoose";
import { IUser } from "src/users/users.model";
import { RepositoryDto } from "./dtos/repository.dto";
import { IFileModel } from "./repository.model";
import * as fs from 'fs'; 
import { IFolderModel } from "src/folder/folder.model";
import { SortType,SortValue } from "./pipes/sort.enum";



@Injectable({})
export class RepositoryService {
    constructor(
        @InjectModel('File') private readonly fileModel: IFileModel,  
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Folder') private readonly folderModel: IFolderModel, 
    ) {} 

    private async checkIdFileExists(fileId: ObjectId){
        const checkExists = await this.fileModel.exists({ _id: fileId});
        if(!checkExists)
            throw new HttpException('Id file wasn\'t exists', HttpStatus.BAD_REQUEST);
    }
    private async checkIdUserExists(userId: ObjectId){
        const checkExists = await this.userModel.exists({ _id: userId});
        if(!checkExists)
            throw new HttpException('Id user wasn\'t exists', HttpStatus.BAD_REQUEST);
    } 

    private async notFound(data: any, errorMessage: string){
        if(!data)
            throw new NotAcceptableException(errorMessage);
    }

    async searchFilesOfUser(
        userId: ObjectId, 
        type: SortType, 
        value: SortOrder, 
        search: string
    ) :Promise<RepositoryDto[]>{ 
        try{
            await this.checkIdUserExists(userId); 
            if(!search)
                search = ""
            const searchFiles = await this.fileModel
                .find({
                    user: userId, 
                    isDeleted: false, 
                    originalname: {
                        $regex: search
                    }
                })
                .sort([[type, value]])
                .lean();  
            if(!searchFiles)
                return [];
            return searchFiles.map(file => new RepositoryDto(file));
        }catch(error: any){
            throw new NotAcceptableException(error.message);
        }
        
    }

    async favoriteFile(
        _id: ObjectId
    ): Promise<HttpException>{
        try{
            await this.checkIdFileExists(_id);
            const favorite = await this.fileModel.findOneAndUpdate({_id}, { $set: { isFavorite: true } })
            await this.notFound(favorite, 'Something wrong in update')
            return new HttpException('Favorite Successfull', HttpStatus.OK);
        }catch(error){
            throw new NotAcceptableException(error.message);
        }
    }

    async unFavoriteFile( _id: ObjectId ): Promise<HttpException>{
        try{
            await this.checkIdFileExists(_id);
            const favorite = await this.fileModel.findOneAndUpdate({_id}, { $set: { isFavorite: false } })
            await this.notFound(favorite, 'Something wrong in update');
            return new HttpException('UnFavorite Successfull', HttpStatus.OK);
        }catch(error){
            throw new NotAcceptableException(error.message);
        }
    }

    async favoritesFileOfUser(idUser: ObjectId):Promise<RepositoryDto[]>{
        try {
            await this.checkIdUserExists(idUser);
            console.log({ user: idUser, isFavorite: true })
            const favoriteFiles = await this.fileModel.find({ user: idUser, isFavorite: true }).lean();
            await this.notFound(favoriteFiles, 'Something wrong in Find');
            return favoriteFiles.map(file => new RepositoryDto(file));
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }


    async filesDeletedOfUser(userId: ObjectId): Promise<RepositoryDto[]>{
        try { 
            await this.checkIdUserExists(userId);
            const filesDeleted = await this.fileModel
                .find({ user: userId, isDeleted: true })
                .lean()
                .exec();
            if(!filesDeleted)
                return [];
            return filesDeleted.map(file => new RepositoryDto(file));
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    } 

    async file(_id: ObjectId): Promise<RepositoryDto>{
        try {  
            const file = await this.fileModel.findOne({ _id, isDeleted: false });
            await this.notFound(file, 'Something wrong get file')
            const fileData = file.toObject();
            return new RepositoryDto(fileData);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    } 

    async createFile(files: Express.Multer.File[], idUser: string, idFolder: string ): Promise<HttpException>{
        try {
            // const isSameTitle = await this.fileModel.find({ title });
            // if(isSameTitle.length > 0){ 
            //     // find max number of same title 
            //     const maxTitle = await this.fileModel.aggregate([
            //         { $match: { title: { $regex: /^title\(\d+\)$/i}}},
            //         { $group: { 
            //             _id: idUser,  
            //             maxTitle: {
            //                 $max: { $regexFind: { input: "$title", regex: /\d+/ }},
            //             }
            //         }}
            //     ]); 
            //     const maxnumber = 1 + maxTitle[0].maxTitle.match | 0;
            //     title = `${title}(${maxTitle})`
            // } 
            for (const file of files) {
                
                const location: number = file.originalname.lastIndexOf('.') + 1;
                const type: string = file.originalname.slice(location);
                const newFile = await this.fileModel.create({
                    folder: idFolder,
                    originalname: file.originalname,
                    fileName: file.filename,
                    type,
                    user: idUser
                });
                await this.folderModel.updateOne({ _id: idFolder },{ $push: {files:  newFile._id}})
                await this.userModel.updateOne({ _id:idUser }, { $push: { files: newFile._id }});
            } 
            return new HttpException(`Upload ${files.length} successfull`, HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    async updateFile(file: Express.Multer.File, _id: ObjectId, title: string, description: string ) {
        try { 
            // Check Id was exists or not
            await this.checkIdFileExists(_id);             
            //Checking which value is not empty than add it in update value 
            const update = {
                $set: {
                    ...(title && { title }),
                    ...(description && { description }),
                    ...(file && { fileName: file.filename } )
                }
            } 
            const updateFile = await this.fileModel.findOneAndUpdate({_id }, update);
            return new RepositoryDto(updateFile);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    async deleteFile(_id: ObjectId): Promise<HttpException>{
        try { 
            await this.checkIdFileExists(_id); // Check Id was exists or not 
            await this.fileModel.softDelete({_id}); 
            return new HttpException('Delete Successfull', HttpStatus.OK);
        } catch (error) {
            throw new NotAcceptableException(error.message); 
        } 
    }

    async restore(_id: ObjectId): Promise<HttpException>{
        try { 
            await this.checkIdFileExists(_id);
            await this.fileModel.restore({_id});
            return new HttpException('Restore Successfull', HttpStatus.OK);
        } catch (error) {
            throw new NotAcceptableException(error.message);  
        }
    }
}