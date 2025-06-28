import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './dtos/GoogleRedirect.dto';
import { JwtLoginDto } from './dtos/LoginDto.dto';
import { GoogleAuthGuard } from './guards/google.guard';

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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign(user);

    const finalUrl = `${req.headers.referer}auth/callback/${token}`;
    return res.redirect(finalUrl);
  }
}
