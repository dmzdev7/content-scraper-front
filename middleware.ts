import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { config as envConfig } from "@/config/env";

export async function middleware(request: NextRequest) {
  // En el Middleware usamos getToken en lugar de getSession
  const token = await getToken({ 
    req: request, 
    secret: envConfig.auth_secret 
  });

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  const isDashboardPage = pathname.startsWith("/dashboard");

  // Si intenta entrar al dashboard sin token (sesión)
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si ya tiene token e intenta ir a login/register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
