import { Request } from 'express';
import { User } from 'src/user/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
