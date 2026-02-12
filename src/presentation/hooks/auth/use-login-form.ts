import { loginUseCase } from "@/core/auth/use-cases/login.use-case";
import { LoginFormData, loginSchema } from "@/shared/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    const result = await loginUseCase(data);

    if (result.success) {
      router.push("/dashboard");
      router.refresh();
    }
    
    setIsLoading(false);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return {
    form,
    isLoading,
    showPassword,
    togglePassword,
    onSubmit: form.handleSubmit(onSubmit),
  };
};