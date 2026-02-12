"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Función para obtener el título basado en la ruta
  const getPageTitle = (path: string) => {
    if (path === "/") return "Dashboard";
    
    // Divide la ruta, toma la última parte y formatea (ej: "ad-sets" -> "Ad Sets")
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "Dashboard";
    
    return lastSegment
      .charAt(0).toUpperCase() + 
      lastSegment.slice(1).replace(/-/g, " ");
  };

  return (
    <header className="h-16 bg-white/50 dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      
      {/* Sección Izquierda: Título de la Página */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-slate-800 dark:text-zinc-100 tracking-tight transition-all animate-in fade-in slide-in-from-left-4 duration-500">
          {getPageTitle(pathname)}
        </h1>
      </div>

      {/* Sección Derecha: Search + Acciones */}
      <div className="flex items-center gap-6">
        
        {/* Buscador Optimizado */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-4 h-4 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-transparent dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-950 focus:border-emerald-100 dark:focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Notificaciones */}
          <button className="relative p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-500 dark:text-zinc-400 transition-all active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-zinc-950 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}