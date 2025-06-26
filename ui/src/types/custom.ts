export type User = {
  name: string;
  email: string;
  role: "user" | "admin";
  provider: string;
};

export type LoginResponse = {
  token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};