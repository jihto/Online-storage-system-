import * as mongoose from 'mongoose';
import { IAuth } from '../auth/models/auth.model';
import { BaseSchema } from 'src/app.model';

const UsersSchema = new mongoose.Schema({ 
    username: { type: String, require: true },
    auth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user'},
    token: { type: String },
    avatar: { type: String },
    refreshToken: { type: String },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
}).add(BaseSchema);

export interface IUser extends Document{
    _id: string;
    username: string;
    avatar: string;
    auth: IAuth['_id'];
    role: string;
    token: string;
    refreshToken: string;
    files: Array<string>;
    folders: Array<string>;
    updateAt: Date;
    createAt: Date;
}

export const User = { name:'User', schema: UsersSchema };