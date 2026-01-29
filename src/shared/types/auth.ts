import { ApiResponse } from "./api";

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'MODERATOR';
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 1. Devuelve tokens + user
export type LoginResponse = ApiResponse<AuthData>;

// 2. Devuelve solo el objeto user dentro de data { data: { user: User } }
export type RegisterResponse = ApiResponse<{ user: User }>;

// 3. Devuelve solo un mensaje de éxito { data: { message: string } }
export type LogoutResponse = ApiResponse<{ message: string }>;