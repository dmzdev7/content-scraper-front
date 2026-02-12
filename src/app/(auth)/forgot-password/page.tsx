"use client";

import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useForgotPassword } from "@/presentation/hooks/auth/use-forgot-password";

export default function ForgotPasswordPage() {
  const { form, isLoading, isSuccess, onSubmit } = useForgotPassword();
  const { register, formState: { errors } } = form;

  return (
    <Card className="w-full border-none shadow-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <CardContent className="p-8">
        {!isSuccess ? (
          <>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sign in
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-zinc-100 tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-slate-500 dark:text-zinc-400">
                Enter your email and we&apos;ll send you a link to reset your
                password.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 dark:text-zinc-300"
                >
                  Email Address
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

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 shadow-lg shadow-emerald-500/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                    link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-zinc-100">
              Check your email
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 mb-8">
              We&apos;ve sent a password reset link to your email address.
              Please follow the instructions there.
            </p>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-11 border-slate-200 dark:border-zinc-800"
              >
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
