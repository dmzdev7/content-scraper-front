import { LucideIcon } from "lucide-react";

export interface NavItem {
  icon: LucideIcon; // Esto tipa correctamente los iconos de lucide
  label: string;
  href: string;
}

export interface NavItemProps extends NavItem {
  isCollapsed: boolean;
}


export interface UserProfile {
  name?: string | null;
  email?: string | null;
  role?: string;
}

export interface HeaderProps {
  user: UserProfile;
}