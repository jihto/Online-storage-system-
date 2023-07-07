import * as mongoose from 'mongoose';
import { IUser } from '../../users/users.model';

const AuthSchema = new mongoose.Schema({ 
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})
export interface IAuth extends Document{ 
    _id:string;
    email: string;
    password: string; 
    user: IUser['_id'];
}

export const Auth = { name:'Auth', schema: AuthSchema };