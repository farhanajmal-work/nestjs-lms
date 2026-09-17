import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';

@Controller('auth') // /auth/register
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
       const { user, access_token } = await this.authService.registerUser(registerUserDto);
       return { user, access_token };
    }
   
}
