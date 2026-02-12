"use client";

import { BrandIcons } from "@/shared/constants/svg/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container relative min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Auth Form */}
          <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
            <div className="mb-8 flex items-center gap-3">
              <BrandIcons.logo
                className="w-8 h-8 text-emerald-500 dark:text-emerald-400"
                strokeWidth={2.5}
              />
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                Content<span className="text-emerald-500">Mint</span>
              </span>
            </div>
            {children}
          </div>

          {/* Right side - Visual Content */}
          <div className="hidden lg:block relative group">
            <div className="relative w-full h-162.5 rounded-[2rem] bg-slate-900 dark:bg-zinc-900 overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
              {/* Background abstract elements */}
              <div className="absolute inset-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]" />
              </div>

              {/* Grid pattern sutil */}
              <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                  backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Central Visual */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
                {/* 3D-like Icon Composition */}
                <div className="mb-12 relative h-48 w-48 flex items-center justify-center">
                  {/* Círculos concéntricos animados */}
                  <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
                  <div className="absolute inset-4 border border-emerald-500/30 rounded-full animate-[ping_2s_linear_infinite]" />

                  {/* Elemento central flotante */}
                  <div
                    className="relative z-20 w-24 h-24 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center justify-center rotate-12 animate-bounce transition-transform duration-700 group-hover:rotate-0"
                    style={{ animationDuration: "4s" }}
                  >
                    <BrandIcons.logoSolid
                      className="w-10 h-10 text-black"
                      strokeWidth={3}
                    />
                  </div>

                  {/* Elementos flotantes pequeños */}
                  <div
                    className="absolute top-0 right-4 w-8 h-8 bg-zinc-800 rounded-lg shadow-xl animate-bounce border border-zinc-700"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="absolute bottom-4 left-0 w-10 h-10 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    Optimiza tu contenido <br />
                    <span className="text-emerald-400">en un solo lugar</span>
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-sm mx-auto leading-relaxed">
                    La plataforma definitiva para gestionar tus campañas de
                    marketing y pagos sin complicaciones.
                  </p>
                </div>

                {/* Badge de confianza o stats */}
                <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-zinc-800/50 border border-white/10 backdrop-blur-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-slate-900 bg-zinc-700"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-300 font-medium">
                    +10k creadores confían en nosotros
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
