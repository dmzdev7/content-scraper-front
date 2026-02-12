import { User } from "@/core/auth/domain/user.entity";
import { ApiResponse } from "./api";

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 1. Tokens + User
export type LoginResponse = ApiResponse<AuthData>;

// 2. data: { user: User }
export type RegisterResponse = ApiResponse<{ user: User }>;

// 3. data: { message: string }
export type LogoutResponse = ApiResponse<{ message: string }>;

// 4. data: { message: string }
export type ForgotPasswordResponse = ApiResponse<{ message: string }>;

// 5. data: { message: string }
export type ResetPasswordResponse = ApiResponse<{ message: string }>;

// 6. data: { message: string, user: User }
export type VerifyEmailResponse = ApiResponse<{ message: string; user: User }>;