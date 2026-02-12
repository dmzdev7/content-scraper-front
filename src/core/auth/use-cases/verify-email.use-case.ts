import { authService } from "@/infrastructure/services/auth.service";
import { notify } from "@/shared/helpers/notifications";

export const verifyEmailUseCase = async (token: string | null) => {
  if (!token) {
    const error = "El enlace de verificación no es válido.";
    return { success: false, error };
  }

  try {
    await authService.verifyEmail(token);
    notify.success("¡Éxito!", "Cuenta verificada correctamente");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error inesperado";
    notify.error("Error", msg);
    return { success: false, error: msg };
  }
};