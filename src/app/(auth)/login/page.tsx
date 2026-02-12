"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { BrandIcons } from "@/shared/constants/svg/icons";
import { useLoginForm } from "@/presentation/hooks/auth/use-login-form";

export default function LoginPage() {
  const { form, isLoading, showPassword, togglePassword, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <Card className="w-full border-none shadow-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <CardContent className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-zinc-100 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-slate-700 dark:text-zinc-300"
            >
              Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500/50"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-slate-700 dark:text-zinc-300"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500/50"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 dark:text-zinc-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-slate-300 dark:border-zinc-700 text-emerald-600 focus:ring-emerald-500 bg-white dark:bg-zinc-900"
                {...register("rememberMe")}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-slate-600 dark:text-zinc-400 cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-4 text-slate-400 dark:text-zinc-500">
              or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 h-11 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900"
          disabled={isLoading}
        >
          <BrandIcons.google className="mr-2" />
          Google
        </Button>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
