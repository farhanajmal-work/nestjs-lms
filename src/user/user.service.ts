import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      const user = new this.userModel(registerUserDto);
      await user.save();
      return user;
    } catch (error: unknown) {
      const e = error as { code?: number };
      if (e.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async getUserById(userId: string) {
    return this.userModel.findOne({ _id: userId });
  }
}
