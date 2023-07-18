import * as mongoose from 'mongoose';
import { IAuth } from '../auth/auth.model';
import { BaseSchema } from 'src/app.model';

const UsersSchema = new mongoose.Schema({ 
    username: { type: String, require: true },
    auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    avatar: { type: String }, 
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
}).add(BaseSchema);

export interface IUser extends Document{
    _id: string;
    username: string;
    avatar: string;
    auth: IAuth['_id'];  
    files: Array<string>;
    folders: Array<string>;
    updateAt: Date;
    createAt: Date;
}

export const User = { name:'User', schema: UsersSchema };