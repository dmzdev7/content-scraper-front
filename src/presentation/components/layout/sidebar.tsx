"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Menu, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { NavItemProps, SidebarProps } from "@/shared/types/navMenu";
import { cn } from "@/infrastructure/lib/utils";
import {
  marketingItems,
  paymentsItems,
  systemItems,
} from "@/shared/constants/menu";
import { BrandIcons } from "@/shared/constants/svg/icons";

function NavItem({ icon: Icon, label, href, isCollapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group relative",
        isActive
          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-semibold"
          : "text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 shrink-0 transition-colors",
          isActive
            ? "text-emerald-600 dark:text-emerald-500"
            : "text-slate-400 dark:text-zinc-500 group-hover:text-emerald-600",
        )}
      />

      {!isCollapsed && (
        <span className="text-sm whitespace-nowrap overflow-hidden animate-in fade-in duration-200">
          {label}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sections = [
    { label: "Marketing", items: marketingItems },
    { label: "Payments", items: paymentsItems },
    { label: "System", items: systemItems },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-sm"
      >
        <Menu className="w-6 h-6 text-slate-600 dark:text-zinc-400" />
      </button>

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40 flex flex-col border-r transition-all duration-300 ease-in-out",
          "bg-white/50 dark:bg-zinc-950 border-slate-100 dark:border-zinc-800",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 relative shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BrandIcons.logo
              className="w-6 h-6 text-emerald-500"
              strokeWidth={2.5}
            />
            {!isCollapsed && (
              <span className="font-bold text-xl text-slate-800 dark:text-zinc-100 tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
                Content
                <span className="text-emerald-500 dark:text-emerald-400">
                  Mint
                </span>
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full border bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 hidden lg:flex z-50"
          >
            {isCollapsed ? (
              <ChevronRight size={14} className="text-slate-400" />
            ) : (
              <ChevronLeft size={14} className="text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide overflow-x-hidden">
          {sections.map((section, idx) => (
            <div
              key={section.label}
              className={cn(
                "py-6 px-4",
                idx !== 0 && "border-t border-slate-50 dark:border-zinc-900",
              )}
            >
              {!isCollapsed ? (
                <h3 className="px-3 mb-3 text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
                  {section.label}
                </h3>
              ) : (
                <div className="flex justify-center mb-3 h-4">
                  <span className="text-[10px] font-bold text-slate-300 dark:text-zinc-700">
                    {section.label[0]}
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-50 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 shrink-0">
          <div
            className={cn(
              "flex items-center gap-3 px-2 py-2 mb-2 min-w-0",
              isCollapsed && "justify-center",
            )}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-900 shrink-0 border border-slate-200 dark:border-zinc-700">
              <div className="w-full h-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-500 font-bold text-xs">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 overflow-hidden animate-in fade-in duration-300">
                <span className="text-sm font-semibold text-slate-700 dark:text-zinc-200 truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-slate-400 dark:text-zinc-500 truncate">
                  {user?.email}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors",
              isCollapsed && "justify-center",
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
                Log out
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
