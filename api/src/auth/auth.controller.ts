import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtLoginDto } from './dtos/LoginDto.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: JwtLoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      token: this.jwtService.sign(user),
    };
  }

  @Post('register')
  async register(@Body() registerDto: JwtLoginDto) {
    const user = await this.authService.register(registerDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      token: this.jwtService.sign(user),
    };
  }
}
