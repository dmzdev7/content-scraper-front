import { registerUseCase } from "@/core/auth/use-cases/register.use-case";
import { RegisterFormData, registerSchema } from "@/shared/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const result = await registerUseCase(data);

    if (result.success) {
      router.push("/login");
    }
    setIsLoading(false);
  };

  return {
    form,
    isLoading,
    showPassword,
    showPasswordConfirm,
    setShowPassword,
    setShowPasswordConfirm,
    onSubmit: form.handleSubmit(onSubmit),
  };
};