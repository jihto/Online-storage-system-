import mongoose from "mongoose"; 
export interface UserRequest extends Request {
    user: DataRequestUser;
}


export interface DataRequestUser { 
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
    avatar:string;
    password?: string;
    username: string; 
    roles: Array<string>;
    iat: number;
    exp: number;
}