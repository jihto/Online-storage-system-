import { HttpException, HttpStatus, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; 
import { IFileModel } from "src/repository/repository.model";
import { FolderDto } from "./dtos/folder.dto";
import {Folder, IFolderModel } from "./folder.model";
import { IUser } from "src/users/users.model";
import mongoose, { Model, ObjectId, SortOrder, Types } from "mongoose";
import { DataSignInDto } from "src/auth/dtos/data-user.dto";
import { DataSignUpDto } from "src/auth/dtos/data-user.dto"; 
import { SortType } from "./types/sorting.enum";
 
@Injectable({})
export class FolderService{
    constructor(
        @InjectModel('Folder') private readonly folderModel: IFolderModel, 
        @InjectModel('File') private readonly fileModel: IFileModel,
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ){}  
    private async checkIdFolderOfUser(_id: ObjectId, parent: string){
        const IdFolderOfOwner = await this.userModel.findOne({ _id, folders: {$in: [parent]}});
        if(!IdFolderOfOwner)
            throw new HttpException('Id folder doessn\'t exsist in owner', HttpStatus.BAD_REQUEST);
    }  
    private async softDeleteFolder(_id: Types.ObjectId, type: boolean): Promise<void> {
        try {
            const result = await this.folderModel.findOneAndUpdate({ _id }, { $set: { isDeleted: type } });
    
            if (result) {
                const lengthKidFolders = result.kids;
                const lenthFiles = result.files;
        
                if (lengthKidFolders) {
                    // If there are folders inside the current folder, soft-delete them recursively
                    for (const element of lengthKidFolders) {
                        await this.softDeleteFolder(element._id, type);
                    }
                }
    
                if (lenthFiles) {
                // Soft-delete all the files in the folder
                await this.fileModel.updateMany({ folder: _id }, { $set: { isDeleted: type } });
                }
            } else {
                throw new HttpException('Id folder does not exist', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
    async foldersOfUser(
        _id: ObjectId,
        search: string,
        type: SortType,
        value: SortOrder,
    ): Promise<FolderDto[]>{
        try {  
            if(!search)
                search = "";
            const folders = await this.folderModel.find({ 
                owner: _id, 
                parent: { $exists: false }, 
                isDeleted: false,
                name: {
                    $regex: search.toLowerCase() 
                }
            })
            .sort([[type, value]])
            .exec();
            if(!folders)
                throw new HttpException('Id owner didn\'t exsist', HttpStatus.BAD_REQUEST);
            return folders.map(folder => new FolderDto(folder));
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }
    
    async folderIsDeleted(_id: ObjectId): Promise<FolderDto[]> {
        try {
            const foldersIsDeleted = await this.folderModel.find({
                owner: _id, 
                parent: { $exists: false }, 
                isDeleted: true
            }).exec();
            if(!foldersIsDeleted)
                throw new HttpException('Id owner didn\'t exsist', HttpStatus.BAD_REQUEST);
            return foldersIsDeleted.map(folder => new FolderDto(folder));
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    async folder(_id: ObjectId): Promise<FolderDto>{
        try {  
            const folder = await this.folderModel.findOne({ _id })
                // .populate({
                //     path:'files',
                //     select: 'title description filename'
                // })
                // .populate('kids')   
                .exec()
            if(!folder)
                throw new HttpException('Id Folder didn\'t exsist', HttpStatus.BAD_REQUEST); 
            return new FolderDto(folder);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }
    async createFolder(name: string , owner: ObjectId, parent: string | undefined): Promise<FolderDto>{
        try {  
            //Create new Folder with name and owner
            const newFolder = await this.folderModel.create({ name, owner, parent }); 
            //Update new Id Folder in Folders of User
            const updateFolderOfUser = await this.userModel
                .findOneAndUpdate(
                    { _id: owner}, 
                    { $push: { folders: newFolder._id }}
                );

            if(!updateFolderOfUser || !newFolder)
                throw new HttpException('Id owner didn\'t exsist', HttpStatus.BAD_REQUEST);
            
            //Check if create new Folder in another Folder 
            if(parent){ 
                //Checking Id of Folder is exsist of User or not
                await this.checkIdFolderOfUser(owner, parent); 
                //update children of Folder which new folder has create stay in there   
                const updateKidsInParentFolder = await this.folderModel
                    .findOneAndUpdate(
                        { _id: parent }, 
                        { $push:{ kids: newFolder._id }
                    });  
                return new FolderDto(updateKidsInParentFolder);
            }
            return new FolderDto(newFolder);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        }
    }

    async updateFolder (_id: ObjectId, name: string, color: string){
        try {
            const updataData = { name, color };
            //checking which fields was send/exists to save it in database
            for(const key in updataData)
                if(!updataData[key])
                    delete updataData[key];   
            //Update new value exists 
            const updateFolder = await this.folderModel.findOneAndUpdate({ _id }, {$set: updataData})
            if(!updateFolder)
                throw new HttpException('Id folder wasn\'t exists', HttpStatus.BAD_REQUEST);
            return new FolderDto(updateFolder); 
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    async moveFolder(_id: ObjectId, currentFolder: ObjectId, newFolder: ObjectId){
        try { 
            //Change parent of folder equal id of new Folder which it will be contain (newFolder)
            const updateParentFolder = await this.folderModel.findOneAndUpdate({ _id }, {$set:{ parent: newFolder }});
            if(!updateParentFolder)
                throw new HttpException('Id folder wasn\'t exists', HttpStatus.BAD_REQUEST);
            if(currentFolder){
                //remove id of folder want change from field kids of currentFolder 
                const deleteFromOldFolder = await this.folderModel.findOneAndUpdate({_id: currentFolder},{ $pull: { kids: _id }});
            } 
            //Update add id of folder want change in field kids of new Folder
            const addInNewFolder = await this.folderModel.findOneAndUpdate({_id: newFolder}, {$push: { kids:_id }})
            return new FolderDto(addInNewFolder);
        } catch (error) {
            throw new NotAcceptableException(error.message);
        } 
    }

    async deleteFolder(_id: Types.ObjectId):Promise<HttpException>{  
        try {
            await this.softDeleteFolder(_id, true);  
            return new HttpException("Delete Succesfull", HttpStatus.OK); 
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 

    async restoreFolder(_id: Types.ObjectId):Promise<HttpException>{
        try{
            await this.softDeleteFolder(_id, false);  
            return new HttpException("Restore Successfull", HttpStatus.OK)
        }catch(error){
            console.log(error.message);
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
