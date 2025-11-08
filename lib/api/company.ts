import { useMutation } from "@tanstack/react-query";
import { api, handleApiError } from "@/lib/api";
import { CompanySignupData, mapFormToApi } from "@/lib/schemas";

interface CompanyCreateResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    cnpj: string;
    companyName: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
  };
  error?: string;
}

const createCompany = async (data: CompanySignupData): Promise<CompanyCreateResponse> => {
  try {
    const apiData = mapFormToApi(data);
    
    console.log("🔄 Dados enviados para API:", apiData);
    
    const response = await api
      .post("api/company/create-company", {
        json: apiData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json<CompanyCreateResponse>();

    return response;
  } catch (error) {
    const apiError = handleApiError(error);

    if (apiError.response) {
      try {
        const errorData = await apiError.response.json() as { message?: string; error?: string };
        throw new Error(errorData.message || errorData.error || "Erro ao cadastrar empresa");
      } catch {
        throw new Error("Erro ao cadastrar empresa");
      }
    }
    
    throw apiError;
  }
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      console.log("✅ Empresa cadastrada com sucesso:", data);
    },
    onError: (error) => {
      console.error("❌ Erro ao cadastrar empresa:", error);
    },
  });
};