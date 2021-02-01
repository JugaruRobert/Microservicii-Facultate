import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './user';

@Injectable()
export class UserService {
  private readonly logger = new Logger('User Service');

  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.model.find();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.model.findOne(user => user.email === email);
  }

  async saveUser(user: User): Promise<User> {
    const userModel = new this.model(user);
    return await userModel.save();
  }

  // private dtoToUser(userDto: UserDto) {
  //   let user = new User();
  //   user.id = uuidv4();
  //   user.email = userDto.email;
  //   user.password = userDto.password;

  //   return user;
  // }
}