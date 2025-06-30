export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Provider = {
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
} as const;
export type Provider = (typeof Provider)[keyof typeof Provider];

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
