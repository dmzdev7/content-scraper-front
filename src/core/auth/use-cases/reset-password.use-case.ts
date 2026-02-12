import { authService } from "@/infrastructure/services/auth.service";
import { notify } from "@/shared/helpers/notifications";
import { ResetPasswordFormData } from "@/shared/validations/auth";

export const resetPasswordUseCase = async (token: string | null, data: ResetPasswordFormData) => {
  if (!token) {
    notify.error("Acceso denegado", "El enlace no es válido.");
    return { success: false };
  }

  try {
    await authService.resetPassword(token, data);
    notify.success("¡Contraseña actualizada!", "Ahora puedes iniciar sesión.");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al resetear la contraseña";
    notify.error("Error", message);
    return { success: false, error: message };
  }
};