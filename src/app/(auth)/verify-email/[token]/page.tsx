"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useVerifyEmail } from "@/presentation/hooks/auth/use-verify-email";

export default function VerifyEmailPage() {
  const { status, errorMessage } = useVerifyEmail();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      {status === "loading" && <LoadingState />}
      {status === "success" && <SuccessState />}
      {status === "error" && <ErrorState message={errorMessage} />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="animate-in fade-in duration-500">
      <Loader2 className="w-16 h-16 animate-spin text-emerald-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold">Verificando tu email</h1>
      <p className="text-muted-foreground mt-2">
        Estamos validando tu cuenta, espera un momento...
      </p>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="animate-in zoom-in duration-300">
      <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-zinc-100">
        ¡Cuenta verificada!
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Tu dirección de correo ha sido confirmada con éxito. Ya puedes
        acceder a todas las funciones de la plataforma.
      </p>
      <div className="mt-8">
        <Link href="/login">
          <Button size="lg" className="px-8 gap-2 bg-emerald-600 hover:bg-emerald-700">
            Iniciar Sesión <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-zinc-100">
        Hubo un problema
      </h1>
      <p className="text-red-500 font-medium mt-2">
        {message || "El enlace de verificación no es válido o ha expirado."}
      </p>
      <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
        Intenta solicitar un nuevo correo de verificación desde tu perfil o intenta registrarte de nuevo.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <Link href="/register">
          <Button variant="outline">Ir al Registro</Button>
        </Link>
        <Link href="/login">
          <Button variant="default">Reintentar Login</Button>
        </Link>
      </div>
    </div>
  );
}