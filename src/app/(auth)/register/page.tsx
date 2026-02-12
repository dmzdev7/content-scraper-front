"use client";

import Link from "next/link";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Button } from "@/presentation/components/ui/button";
import { BrandIcons } from "@/shared/constants/svg/icons";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useRegisterForm } from "@/presentation/hooks/auth/use-register-form";

export default function RegisterPage() {
  const { 
    form, isLoading, showPassword, showPasswordConfirm, 
    setShowPassword, setShowPasswordConfirm, onSubmit 
  } = useRegisterForm();

  const { register, formState: { errors } } = form;

  // //   const handleGoogleSignIn = async () => {
  // //     setIsLoading(true);
  // //     try {
  // //       await signIn("google", { callbackUrl: "/dashboard" });
  // //     } catch (err) {
  // //     //   setError("Error al iniciar sesión con Google");
  // //       setIsLoading(false);
  // //     }
  // //   };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <CardContent className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-zinc-100 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Join ContentMint and start managing your content
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-zinc-300">
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
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
                className="pl-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
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
                className="pl-10 pr-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-slate-700 dark:text-zinc-300"
            >
              Confirm Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                id="confirmPassword"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500"
                {...register("passwordConfirm")}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
              >
                {showPasswordConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="text-xs text-red-500 font-medium">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 shadow-lg shadow-emerald-500/20 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-4 text-slate-400 dark:text-zinc-500">
              or sign up with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 h-11 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900"
          disabled={isLoading}
          //   onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <BrandIcons.google className="mr-2" />
          Google
        </Button>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
