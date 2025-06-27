import { IsNotEmpty, IsString } from 'class-validator';

export class JwtLoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
