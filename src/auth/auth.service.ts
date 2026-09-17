import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    // Here you can implement the logic for user registration, such as validating input data, creating a new user in the database, etc.
    console.log('Registering user...', registerUserDto);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payload = { sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    return { user, access_token: token };
  }
}
