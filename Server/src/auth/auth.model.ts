import * as mongoose from 'mongoose';
import { IUser } from '../users/users.model';
import { Role } from './interfaces/roles.enum';

const AuthSchema = new mongoose.Schema({ 
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true}, 
    token: { type: String },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user'},
    refreshToken: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})
export interface IAuth extends Document{ 
    _id:string;
    email: string;
    password: string; 
    user: IUser['_id'];
    role: Role;
    token: string;
    refreshToken: string;
}

export const Auth = { name:'Auth', schema: AuthSchema };