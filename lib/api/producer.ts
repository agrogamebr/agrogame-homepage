import { useMutation, useQuery } from "@tanstack/react-query";
import { api, handleApiError } from "@/lib/api";
import { ProducerSignupData, mapFormToApi } from "@/lib/schemas/producerSignup";

export interface DocumentType {
  id: number;
  name: string;
}

export interface ActiveCompany {
  companyId: number;
  fullCompanyName: string;
}

interface ProducerCreateResponse {
  success: boolean;
  producerName: string;
  producerId: number;
  message: string;
  status: string;
}

const createProducer = async (data: ProducerSignupData): Promise<ProducerCreateResponse> => {
  try {
    const apiData = mapFormToApi(data);
    
    console.log("🔄 Dados enviados para API (Produtor):", apiData);
    
    const response = await api
      .post("api/producer/register", {
        json: apiData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .json<ProducerCreateResponse>();

    return response;
  } catch (error: unknown) {
    console.error("❌ Erro capturado:", error);

    // Tentar extrair mensagem de erro da resposta
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: Response; message?: string };
      
      if (apiError.response) {
        try {
          const errorData = await apiError.response.json() as { 
            message?: string; 
            error?: string;
            errors?: Record<string, string[]>;
          };
          
          console.log("📋 Dados de erro da API:", errorData);
          
          // Priorizar mensagem de erro mais específica
          const errorMessage = 
            errorData.message || 
            errorData.error || 
            (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : null);
          
          if (errorMessage) {
            throw new Error(errorMessage);
          }
        } catch (jsonError) {
          // Se falhar ao parsear JSON, verificar se o erro original tem mensagem
          if (apiError.message && apiError.message !== 'Erro ao cadastrar produtor') {
            throw new Error(apiError.message);
          }
          console.error("❌ Erro ao parsear resposta JSON:", jsonError);
        }
      }
      
      // Se chegou aqui e o erro tem mensagem, usar ela
      if (apiError.message) {
        throw new Error(apiError.message);
      }
    }
    
    // Se for um Error comum
    if (error instanceof Error) {
      throw error;
    }
    
    // Apenas em último caso, usar mensagem genérica
    throw new Error("Erro ao cadastrar produtor");
  }
};

export const useCreateProducer = () => {
  return useMutation({
    mutationFn: createProducer,
    onSuccess: (data) => {
      console.log("✅ Produtor rural cadastrado com sucesso:", data);
    },
    onError: (error) => {
      console.error("❌ Erro ao cadastrar produtor rural:", error);
    },
  });
};

export const fetchDocumentTypes = async (): Promise<DocumentType[]> => {
  try {
    const response = await api.get("api/producer/document-types").json<DocumentType[]>();
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useDocumentTypes = () => {
  return useQuery({
    queryKey: ["document-types"],
    queryFn: fetchDocumentTypes,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const fetchActiveCompanies = async (): Promise<ActiveCompany[]> => {
  try {
    const response = await api.get("api/producer/companies/active").json<ActiveCompany[]>();
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useActiveCompanies = () => {
  return useQuery({
    queryKey: ["active-companies"],
    queryFn: fetchActiveCompanies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};