import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserRequest } from 'src/common/interfaces/user-request.interface'; 
import mongoose from 'mongoose';  
import { UsersService } from 'src/users/services/users/users.service';
import { InformationUser } from 'src/users/dtos/informationUser.dto';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);

    });

    describe('informationUser', () => {
        it('should return a Information User object', async () => {
        const userRequest = {
            user: { 
                _id: new mongoose.Schema.Types.ObjectId('64b62f84164dc54f85dc3521'),
                email: "huyphuc13@gmail.com",
                avatar:"", 
                username: "Huy", 
                roles: ["user"],
                iat: 1689867930,
                exp: 1689867930,
            },
        } as UserRequest;
        jest.spyOn(service, 'informationUser').mockImplementation(() =>
            Promise.resolve({
                _id: "64b62f84164dc54f85dc3521",
                username:"Andrew",
                auth: {
                    "email": "huyphuc13@gmail.com"
                },
                files: 10,
                folders: 10,
                avatar: "",
                createAt: new Date("2023-07-18T06:21:36.279Z"),
                updateAt: new Date("2023-07-18T06:21:36.279Z"),
            } as InformationUser),
        );
        expect(await controller.informationUser(userRequest)).toEqual({
            _id: new mongoose.Types.ObjectId("64b62f84164dc54f85dc3521"),
                username:"Huy",
                auth: {
                    "email": "huyphuc13@gmail.com"
                },
                files: 0,
                folders: 0,
                avatar: "",
                createAt: new Date("2023-07-18T06:21:36.279Z"),
                updateAt: new Date("2023-07-18T06:21:36.279Z"),
            })
        });
    });
});
