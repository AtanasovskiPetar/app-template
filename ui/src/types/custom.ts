export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Provider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  provider: Provider;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};
