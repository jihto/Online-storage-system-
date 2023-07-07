import { Injectable, HttpException, HttpStatus, NotAcceptableException } from "@nestjs/common";
import { UserDto } from "../users/dtos/user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "../users/users.model";
import { Model } from "mongoose";
import { IFileModel } from "src/repository/repository.model";
import { IFolderModel } from "src/folder/folder.model";
import { InfoUser } from "../users/dtos/informationUser.dto";


@Injectable()
export class UserService{
    constructor( 
        @InjectModel('File') private readonly fileModel: IFileModel,  
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Folder') private readonly folderModel: IFolderModel, 
    ){}
    async infoUser(user: UserDto): Promise<InfoUser>{
        try{
            const userQuery = await this.userModel
                .findOne({ _id:user._id })
                .populate({path: 'auth', select:'-_id email'})
                .select('username role avatar _id auth createAt updateAt')
                .lean()
                .exec();
            const countFileQuery = this.fileModel.countDocuments({user: user._id});
            const countFolderQuery = this.folderModel.countDocuments({owner: user._id});

            const [userInfo, files, folders] = await Promise.all([userQuery, countFileQuery, countFolderQuery]);
            console.log(); 
            return new InfoUser({...userInfo, files: files, folders: folders});
        }catch(error){
            throw new NotAcceptableException(error.message); 
        }
    }
    async ChangeAvatar(
        _id: string,
        avatar: Express.Multer.File, 
    ): Promise<HttpException>{
        try { 
            const updateInfo = await this.userModel.findOneAndUpdate(
                { _id }, 
                { $set: { avatar: avatar.filename }}
            );
            if(!updateInfo)
                throw new HttpException("Id was not exists", HttpStatus.BAD_REQUEST);
            return new HttpException(`Update successfull`, HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message); 
        } 
    }
    async updateInformationUser(
        _id: string, 
        username: string,
    ): Promise<HttpException>{
        try { 
            const updateInfo = await this.userModel.findOneAndUpdate(
                { _id }, 
                { $set: {  username}}
            );
            if(!updateInfo)
                throw new HttpException("Id was not exists", HttpStatus.BAD_REQUEST);
            return new HttpException(`Update username successfull`, HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message); 
        } 
    }
}