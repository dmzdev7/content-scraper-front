import { notify } from "@/shared/helpers/notifications";
import { LoginFormData } from "@/shared/validations/auth";
import { signIn } from "next-auth/react";

export const loginUseCase = async (data: LoginFormData) => {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      const errorMsg = result.error === "CredentialsSignin" 
        ? "Correo o contraseña incorrectos" 
        : result.error;
        
      notify.error("Error de acceso", errorMsg);
      return { success: false, error: errorMsg };
    }

    notify.success("¡Bienvenido!", "Has iniciado sesión correctamente.");
    return { success: true };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error inesperado";
    notify.error("Error", errorMessage);
    return { success: false, error: errorMessage };
  }
};