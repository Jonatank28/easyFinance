import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "Erro desconhecido");
  } else {
    toast.error("Erro inesperado");
  }
};
