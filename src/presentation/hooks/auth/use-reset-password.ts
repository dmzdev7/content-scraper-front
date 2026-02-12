import { resetPasswordUseCase } from "@/core/auth/use-cases/reset-password.use-case";
import { ResetPasswordFormData, resetPasswordSchema } from "@/shared/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    const result = await resetPasswordUseCase(token, data);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }
    setIsLoading(false);
  };

  return {
    token,
    form,
    isLoading,
    isSuccess,
    showPassword,
    showPasswordConfirm,
    setShowPassword,
    setShowPasswordConfirm,
    onSubmit: form.handleSubmit(onSubmit),
  };
};