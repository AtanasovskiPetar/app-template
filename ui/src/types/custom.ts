export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  provider: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
