import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/shared/validations/auth";
import { forgotPasswordUseCase } from "@/core/auth/use-cases/forgot-password.use-case";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    const result = await forgotPasswordUseCase(data.email);
    
    if (result.success) {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  return {
    form,
    isLoading,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
};