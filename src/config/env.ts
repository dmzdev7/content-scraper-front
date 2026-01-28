import z from "zod";

// export const env = _env.data;
const envSchema = z.object({
  // API
  NEXT_PUBLIC_API_URL: z.string().url(),

  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(10),

  // App State
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(10),
});

let envFront: z.infer<typeof envSchema>;

try {
  envFront = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const { fieldErrors } = error.flatten();
    const errorMessage = `❌ Variables de entorno inválidas: ${JSON.stringify(fieldErrors, null, 2)}`;
    console.error(errorMessage);
    // Lanzamos el error en lugar de usar process.exit(1)
    throw new Error(errorMessage);
  } else {
    console.error(
      "❌ Error inesperado al validar variables de entorno:",
      error,
    );
    throw error;
  }
}

export const config = {
  // API
  api_back: envFront.NEXT_PUBLIC_API_URL,

  // Auth
  auth_url: envFront.NEXTAUTH_URL,
  auth_secret: envFront.NEXTAUTH_SECRET,

  // App State
  env: envFront.NODE_ENV,

  // OAuth
  google_id: envFront.GOOGLE_CLIENT_ID,
  google_secret: envFront.GOOGLE_CLIENT_SECRET,
} as const;

export type AppConfig = typeof config;
