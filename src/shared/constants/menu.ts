import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Tag,
  Wallet,
  Settings,
} from "lucide-react";
import { NavItem } from "../types/navMenu";

export const marketingItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Marketplace", href: "/marketplace" },
  { icon: Package, label: "Orders", href: "/orders" },
  { icon: TrendingUp, label: "Tracking", href: "/tracking" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Tag, label: "Discounts", href: "/discounts" },
];

export const paymentsItems: NavItem[] = [
  { icon: Wallet, label: "Ledger", href: "/ledger" },
];

export const systemItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
];
