import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller'; 
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserRequest } from 'src/common/interfaces/user-request.interface';
import { SignInDto, SignUpDto } from 'src/auth/dtos/authentication.dto';
import mongoose from 'mongoose';
import { DataSignInDto, DataSignUpDto } from "src/auth/dtos/data-user.dto";


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('signin', () => {
    it('should return a DataSignInDto object', async () => {
      const userRequest = {
        user: { 
          email: 'huyphuc2@gmail.com',
          password: '12345678',
        },
      };
      jest.spyOn(authService, 'signin').mockImplementation(() =>
        Promise.resolve({
          _id: new mongoose.Types.ObjectId("64b62f84164dc54f85dc3521"),
          email:"huyphuc2@gmail.com",
          roles: "user",
          username:"Andrew",
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZTAzYjFjYmFkMTFlYmFlYjUwNDYiLCJ1c2VybmFtZSI6IkFuZHJldyIsInJvbGVzIjoidXNlciIsImVtYWlsIjoiaHV5cGh1YzJAZ21haWwuY29tIiwiaWF0IjoxNjg4OTg4Njk1LCJleHAiOjE2ODg5OTA0OTV9.0wFGerUDtJRKzwNpmpuvxkwmeCXhekBvc0bZJz57IKw',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZTAzYjFjYmFkMTFlYmFlYjUwNDYiLCJ1c2VybmFtZSI6IkFuZHJldyIsInJvbGVzIjoidXNlciIsImVtYWlsIjoiaHV5cGh1YzJAZ21haWwuY29tIiwiaWF0IjoxNjg4OTg4Njk1LCJleHAiOjE2ODg5OTIyOTV9.sCIB8rcjPi0MMtcxB4jPt2YKBC2Naf-YQ-pHHSIP3ko',
        } as DataSignInDto),
      );
      expect(await authController.signin(userRequest)).toEqual({
        _id: new mongoose.Types.ObjectId("64b62f84164dc54f85dc3521"),
        email:"huyphuc2@gmail.com",
        roles: "user",
        username:"Andrew",
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZTAzYjFjYmFkMTFlYmFlYjUwNDYiLCJ1c2VybmFtZSI6IkFuZHJldyIsInJvbGVzIjoidXNlciIsImVtYWlsIjoiaHV5cGh1YzJAZ21haWwuY29tIiwiaWF0IjoxNjg4OTg4Njk1LCJleHAiOjE2ODg5OTA0OTV9.0wFGerUDtJRKzwNpmpuvxkwmeCXhekBvc0bZJz57IKw',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZTAzYjFjYmFkMTFlYmFlYjUwNDYiLCJ1c2VybmFtZSI6IkFuZHJldyIsInJvbGVzIjoidXNlciIsImVtYWlsIjoiaHV5cGh1YzJAZ21haWwuY29tIiwiaWF0IjoxNjg4OTg4Njk1LCJleHAiOjE2ODg5OTIyOTV9.sCIB8rcjPi0MMtcxB4jPt2YKBC2Naf-YQ-pHHSIP3ko',
      });
    });
  });

  // describe('signup', () => {
  //   it('should return a DataSignUpDto object', async () => {
  //     const signUpDto: SignUpDto = {
  //       email: 'test@test.com',
  //       password: 'password',
  //       username: 'test',
  //     };
  //     jest.spyOn(authService, 'signup').mockImplementation(() =>
  //       Promise.resolve({
  //         email: signUpDto.email,
  //         username: signUpDto.username,
  //       }),
  //     );
  //     expect(await authController.signup(signUpDto)).toEqual({
  //       email: signUpDto.email,
  //       username: signUpDto.username,
  //     });
  //   });
  // });

  // describe('getAllUser', () => {
  //   it('should return a string', async () => {
  //     const userRequest: UserRequest = {
  //       user: {
  //         _id: "6440e03b1cbad11ebaeb5045",
  //         email: 'test@test.com',
  //         username: 'test',
  //       },
  //     };
  //     expect(await authController.getAllUser(userRequest)).toEqual(
  //       userRequest.user,
  //     );
  //   });
  // });

  // describe('refreshToken', () => {
  //   it('should return a string', async () => {
  //     const userRequest: UserRequest = {
  //       user: {
  //         id: '1',
  //         email: 'test@test.com',
  //         username: 'test',
  //       },
  //     };
  //     jest.spyOn(authService, 'refreshToken').mockImplementation(() =>
  //       Promise.resolve({
  //         accessToken: 'test',
  //         refreshToken: 'test',
  //       }),
  //     );
  //     expect(await authController.refreshToken(userRequest)).toEqual({
  //       accessToken: 'test',
  //       refreshToken: 'test',
  //     });
  //   });
  // });
});
