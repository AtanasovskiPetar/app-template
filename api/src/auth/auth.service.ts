import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { JwtLoginDto } from './dtos/LoginDto.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (user && user.password && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async googleLogin(user: any) {
    let existingUser = await this.userService.getByEmail(user.email);
    if (!existingUser) {
      existingUser = await this.userService.createGoogleUser(user);
    }

    return existingUser;
  }

  async register(registerDto: JwtLoginDto) {
    const hashedPassword = await hash(registerDto.password, 10);
    return await this.userService.create({
      ...registerDto,
      password: hashedPassword,
      provider: 'local',
    } as User);
  }
}
