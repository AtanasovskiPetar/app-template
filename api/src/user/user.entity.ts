import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Provider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ enum: Role })
  role: Role;

  @Column({ enum: Provider })
  provider: Provider;

  @CreateDateColumn()
  createdAt: Date;
}
