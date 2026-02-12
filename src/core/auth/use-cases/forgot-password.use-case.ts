import { authService } from "@/infrastructure/services/auth.service";
import { notify } from "@/shared/helpers/notifications";

export const forgotPasswordUseCase = async (email: string) => {
  try {
    const response = await authService.forgotPassword(email);
    notify.success("Solicitud procesada", response.data.message);
    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    notify.error("Error", errorMessage);
    return { success: false, error: errorMessage };
  }
};