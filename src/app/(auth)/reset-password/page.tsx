"use client";

import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";
import { useResetPassword } from "@/presentation/hooks/auth/use-reset-password";

export default function ResetPasswordPage() {
  const {
    token,
    form,
    isLoading,
    isSuccess,
    showPassword,
    showPasswordConfirm,
    setShowPassword,
    setShowPasswordConfirm,
    onSubmit,
  } = useResetPassword();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="w-full border-none shadow-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <CardContent className="p-8">
        {!isSuccess ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-zinc-100 tracking-tight">
                Reset Password
              </h1>
              <p className="text-slate-500 dark:text-zinc-400">
                Please enter and confirm your new password below.
              </p>
            </div>

            {!token && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
                <AlertCircle className="text-red-600 w-5 h-5 shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Invalid or missing recovery token.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
                  <Input
                    id="passwordConfirm"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:border-emerald-500"
                    {...register("passwordConfirm")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.passwordConfirm && (
                  <p className="text-xs text-red-500">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11"
                disabled={isLoading || !token}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Success!</h1>
            <p className="text-slate-500 dark:text-zinc-400 mb-6">
              Your password has been updated. Redirecting to login...
            </p>
            <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full animate-progress" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
