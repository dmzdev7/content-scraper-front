import { toast } from "sonner";

export const notify = {
  success: (title: string, message?: string) => {
    toast.success(title, {
      description: message,
    });
  },
  error: (title: string, message?: string) => {
    toast.error(title, {
      description: message,
    });
  },
  loading: (message: string) => {
    return toast.loading(message);
  },
  dismiss: () => toast.dismiss(),
};