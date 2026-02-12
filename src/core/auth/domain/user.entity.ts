export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER" | "MODERATOR";
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
