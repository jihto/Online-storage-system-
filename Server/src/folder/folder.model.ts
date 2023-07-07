import * as mongoose from 'mongoose';
import { BaseSchema, softErase } from "src/app.model";
import { IUser } from "src/users/users.model"; 
import { Types } from 'mongoose'; 
import { IFile } from 'src/repository/repository.model';

const FolderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, },
    name: { type: String, require: true, maxLength: 50 },
    color: { type: String, require:false, default: "white" },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    kids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    owner: { type:mongoose.Schema.Types.ObjectId, ref: "User", require: true }
}).add(BaseSchema); // extend fields isDelete, createAt and updateAt of BaseSchema

FolderSchema.plugin(softErase);
 

export interface IFolder extends Document{
    _id: Types.ObjectId;
    name: string;
    parent:  IFolder['_id'];
    kids: Array<IFolder> | [];
    files: Array<IFile> | [];
    owner: IUser['_id'];
    color: string;
    updateAt: Date;
    isDeleted: boolean;
}

//Add more funtion custom in softErase
export interface IFolderModel extends mongoose.Model<IFolder> {
    softDelete(filter: object): Promise<IFolder>;
    restore(filter: object): Promise<IFolder>; 
}



export const Folder = { name:'Folder', schema: FolderSchema};