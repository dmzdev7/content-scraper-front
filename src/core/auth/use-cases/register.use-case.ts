import { authService } from "@/infrastructure/services/auth.service";
import { notify } from "@/shared/helpers/notifications";
import { RegisterFormData } from "@/shared/validations/auth";

export const registerUseCase = async (data: RegisterFormData) => {
  try {
    // 1. Llamada al servicio de infraestructura
    await authService.register(data);

    // 2. Lógica de notificación de éxito
    notify.success(
      "¡Registro exitoso!",
      "Hemos enviado un enlace de verificación a tu correo electrónico.",
    );

    return { success: true };
  } catch (error: unknown) {
    // 3. Manejo de errores centralizado
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";

    notify.error("Error", errorMessage);

    return { success: false, error: errorMessage };
  }
};
