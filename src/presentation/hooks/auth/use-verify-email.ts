import { verifyEmailUseCase } from "@/core/auth/use-cases/verify-email.use-case";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useVerifyEmail = () => {
  const params = useParams();
  const token = params?.token as string | null;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "El enlace de verificación no es válido o ya fue utilizado."
  );

  const hasCalled = useRef(false);

  useEffect(() => {
    // Si no hay token o ya se llamó, no hacemos nada
    if (!token || hasCalled.current) return;
    
    hasCalled.current = true;

    const executeVerification = async () => {
      const result = await verifyEmailUseCase(token);
      
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Error inesperado");
      }
    };

    executeVerification();
  }, [token]);

  return { status, errorMessage };
};