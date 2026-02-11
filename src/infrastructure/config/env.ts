import z from "zod";

// --- ESQUEMA PÚBLICO (Disponible en Browser + Server) ---
const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

// --- ESQUEMA PRIVADO (Solo disponible en Server) ---
const serverEnvSchema = z.object({
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(10),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(10),
});

// 1. Validar siempre lo público
const _publicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_publicEnv.success) {
  console.error("❌ Variables públicas inválidas:", _publicEnv.error.flatten().fieldErrors);
  throw new Error("Invalid public environment variables");
}

// 2. Validar lo privado SOLO si estamos en el servidor
let _serverEnv = {} as z.infer<typeof serverEnvSchema>;

if (typeof window === "undefined") {
  const serverCheck = serverEnvSchema.safeParse(process.env);
  if (!serverCheck.success) {
    console.error("❌ Variables de servidor inválidas:", serverCheck.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }
  _serverEnv = serverCheck.data;
}

export const config = {
  // Públicas
  api_back: _publicEnv.data.NEXT_PUBLIC_API_URL,
  env: _publicEnv.data.NODE_ENV,

  // Privadas (Serán undefined en el cliente, lo cual es correcto por seguridad)
  auth_url: _serverEnv.NEXTAUTH_URL,
  auth_secret: _serverEnv.NEXTAUTH_SECRET,
  google_id: _serverEnv.GOOGLE_CLIENT_ID,
  google_secret: _serverEnv.GOOGLE_CLIENT_SECRET,
} as const;

export type AppConfig = typeof config;
