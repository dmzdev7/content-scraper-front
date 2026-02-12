import { config } from "@/infrastructure/config/env";
import {
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from "@/shared/types/auth";
import {
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from "@/shared/validations/auth";

export const authService = {
  /**
   * Login: ingreso al sistema
   */
  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const { rememberMe, ...apiData } = credentials;

    try {
      const resp = await fetch(`${config.api_back}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
        cache: "no-store",
      });

      const result: LoginResponse = await resp.json();

      if (!resp.ok || result.status === "error")
        throw new Error(result.message || "Credenciales incorrectas");

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error al conectar con el servidor");
    }
  },

  /**
   * Registro: registrar un nuevo usuario
   */
  register: async (data: RegisterFormData): Promise<RegisterResponse> => {
    try {
      const resp = await fetch(`${config.api_back}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: RegisterResponse = await resp.json();

      if (!resp.ok || result.status === "error") {
        // 1. Priorizamos el mensaje general del back
        // 2. Si no hay, buscamos en el array de errores de validación
        // 3. Si no hay nada, mensaje por defecto
        const errorMsg =
          result.message ||
          result.errors?.[0]?.message ||
          "Error al registrarse";

        throw new Error(errorMsg);
      }

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error al conectar con el servidor");
    }
  },

  /**
   * Forgot password: solicita un enlace de recuperación.
   */
  forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
    try {
      const resp = await fetch(`${config.api_back}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result: ForgotPasswordResponse = await resp.json();

      if (!resp.ok) {
        throw new Error(result.message || "Error al procesar la solicitud");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error de conexión con el servidor");
    }
  },

  /**
   * Reset Password: actualizar contraseña con token.
   */
  resetPassword: async (
    token: string,
    data: ResetPasswordFormData,
  ): Promise<ResetPasswordResponse> => {
    try {
      const resp = await fetch(`${config.api_back}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: data.password,
          newPasswordConfirm: data.passwordConfirm,
        }),
      });

      const result: ResetPasswordResponse = await resp.json();

      if (!resp.ok || result.status === "error") {
        throw new Error(result.message || "Token inválido o expirado");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error al conectar con el servidor");
    }
  },

  /**
   * Verify Email: confirma la cuenta del usuario mediante el token del path.
   */
  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    try {
      const resp = await fetch(
        `${config.api_back}/auth/verify-email/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      const result: VerifyEmailResponse = await resp.json();

      if (!resp.ok || result.status === "error") {
        // Aquí capturamos tus errores: INVALID_VERIFICATION_TOKEN, VERIFICATION_TOKEN_EXPIRED, etc.
        throw new Error(result.message || "Error al verificar el email");
      }

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error de conexión con el servidor");
    }
  },

  /**
   * Logout: cerrar session invalidando el refresh token en el servidor
   */
  logout: async (refreshToken: string): Promise<LogoutResponse> => {
    try {
      const resp = await fetch(`${config.api_back}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const result: LogoutResponse = await resp.json();

      // En Logout, incluso si el back da error (ej. token expirado),
      // devolvemos el resultado para que el front limpie la sesión local.
      if (!resp.ok || result.status === "error") {
        return {
          status: "error",
          message: result.message || "La sesión ha expirado",
          data: { message: "" },
        };
      }

      return result;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error de conexión con el servidor");
    }
  },
};
