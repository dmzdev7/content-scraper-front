import { config } from "@/infrastructure/config/env";
import { authService } from "@/infrastructure/services/auth.service";
import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    // clientId: config.google_id,
    // clientSecret: config.google_secret,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          // Si el servicio no lanzó error, tenemos los datos
          const { user, accessToken, refreshToken } = response.data;

          // Retornamos un objeto que NextAuth guardará en el JWT
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          // Comprobamos si el error es una instancia de la clase Error
          if (error instanceof Error) {
            throw new Error(error.message);
          }

          // Si por alguna razón lo que se lanzó no es un Error estándar
          throw new Error("Ocurrió un error inesperado en el inicio de sesión");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // if (account?.provider === "google") {
      //   try {
      // const response = await fetch(`${config.api_back}/auth/google`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         email: user.email,
      //         name: user.name,
      //         googleId: account.providerAccountId,
      //       }),
      //     });

      //     if (response.ok) {
      //       const data = await response.json();
      //       token.accessToken = data.accessToken;
      //       token.refreshToken = data.refreshToken;
      //       token.role = data.user.role;
      //     }
      //   } catch (error) {
      //     console.error("Google auth error:", error);
      //   }
      // }

      return token;
    },

    // 2. Exponemos esos datos al cliente (useSession)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirige aquí si no hay sesión
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: config.auth_secret,
};
