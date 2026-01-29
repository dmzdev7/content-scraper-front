import { LucideIcon } from "lucide-react";

export interface NavItem {
  icon: LucideIcon; // Esto tipa correctamente los iconos de lucide
  label: string;
  href: string;
}

export interface UserProfile {
  name?: string | null;
  email?: string | null;
  role?: string;
}

// Props para el ítem individual
export interface NavItemProps extends NavItem {
  isCollapsed: boolean;
}

// Props para el Sidebar completo
export interface SidebarProps {
  user: UserProfile;
}