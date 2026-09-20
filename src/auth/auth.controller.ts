import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import { AuthGuard } from './auth.guard.js';
import { UserService } from '../user/user.service.js';

@Controller('auth') // /auth/register
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
    @Post('register')
    async register(@Body() registerUserDto: RegisterDto) {
       const { user, access_token } = await this.authService.registerUser(registerUserDto);
       return { user, access_token };
    }

    
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: { sub: string } }) {
    const userId = req.user.sub; // Access the user ID from the request object
    // Here you can implement the logic to retrieve the user's profile based on the userId
    // For example, you can call a service method to fetch the user's profile from the database
    const userProfile = await this.userService.getUserById(userId);
    console.log('User profile:', userProfile);
    return { userProfile };
  }
   
}
