import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  async existsByEmail(email: string) {
    return this.userRepository.exists({ where: { email } });
  }

  async create(user: User) {
    return this.userRepository.save(user);
  }
}
