import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IFolderModel } from 'src/folder/folder.model';
import { IFileModel } from 'src/repository/repository.model';
import { InformationUser } from 'src/users/dtos/informationUser.dto';
import { IUser } from 'src/users/users.model';
import { ResponseUserDto } from 'src/users/dtos/responseUser.dto';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel('File') private readonly fileModel: IFileModel,  
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Folder') private readonly folderModel: IFolderModel, 
    ){}
    async informationUser(_id: ObjectId): Promise<InformationUser>{
        try{
            const userQuery = await this.userModel
                .findOne({ _id })
                .populate({path: 'auth', select:'-_id email'})
                .select('username role avatar _id auth createAt updateAt')
                .lean()
                .exec();
            const countFileQuery = this.fileModel.countDocuments({user: _id});
            const countFolderQuery = this.folderModel.countDocuments({owner: _id});
            const [userInfo, files, folders] = await Promise.all([userQuery, countFileQuery, countFolderQuery]);

            return new InformationUser({...userInfo, files: files, folders: folders});
        }catch(error){
            throw new NotAcceptableException(error.message); 
        }
    }
    async changeAvatar(
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
        _id: ObjectId, 
        username: string,
    ): Promise<HttpException>{ 
        try { 
            const updateInfo = await this.userModel.findOneAndUpdate(
                { _id }, 
                { $set: { username }}     
            );
            if(!updateInfo)
                throw new HttpException("Id was not exists", HttpStatus.BAD_REQUEST);
            return new HttpException(`Update username successfull`, HttpStatus.OK); 
        } catch (error) {
            throw new NotAcceptableException(error.message); 
        } 
    }
}
