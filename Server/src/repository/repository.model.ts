import * as mongoose from 'mongoose';
import { BaseSchema, softErase } from 'src/app.model';
import { IUser } from '../users/users.model'; 
import { IFolder } from '../folder/folder.model';

const FileSchema = new mongoose.Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileName: { type:String, require: true }, 
    originalname: { type:String, require: true }, 
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder"},
    isFavorite: { type: Boolean, default: false },
}).add(BaseSchema);

FileSchema.plugin(softErase);

export interface IFile extends Document{
    _id: mongoose.Types.ObjectId; 
    user: IUser['_id'];
    folder: IFolder['_id'];
    fileName: string; 
    isFavorite: boolean;
    originalname: string;
    isDeleted: boolean;
    createAt: Date;
    updateAt: Date;
}

export interface IFileModel extends mongoose.Model<IFile> {
    softDelete(filter: object): Promise<IFile>;
    restore(filter: object): Promise<IFile>; 
}
export const File = { name: "File", schema: FileSchema };