import { useMutation, useQuery } from "@tanstack/react-query";
import { api, handleApiError } from "@/lib/api";
import { CompanySignupData, mapFormToApi } from "@/lib/schemas/companySignup";

export interface CompanyType {
  id: string;
  name: string;
}

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
    let errorMessage: string | null = null;

    if (apiError.response) {
      try {
        const errorData = await apiError.response.json() as { message?: string; error?: string };
        errorMessage = errorData.message || errorData.error || "Erro ao cadastrar empresa";
      } catch {
        throw new Error("Erro ao cadastrar empresa");
      }
    }

    throw new Error(errorMessage || apiError.message || "Erro ao cadastrar empresa");
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

export const fetchCompanyTypes = async (): Promise<CompanyType[]> => {
  try {
    const response = await api.get("api/company/company-types").json<CompanyType[]>();
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useCompanyTypes = () => {
  return useQuery({
    queryKey: ["company-types"],
    queryFn: fetchCompanyTypes,
    staleTime: 1000 * 60 * 60,
  });
};