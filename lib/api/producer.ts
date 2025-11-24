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
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: Response };

      if (apiError.response) {
        try {
          const errorData = await apiError.response.json() as {
            message?: string;
            error?: string;
            errors?: Record<string, string[]>;
          };

          const errorMessage =
            errorData.message ||
            errorData.error ||
            (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : null);

          if (errorMessage) {
            throw new Error(errorMessage);
          }
        } catch (jsonError) {
          if (jsonError instanceof Error && jsonError.message !== 'Erro ao cadastrar produtor') {
            throw jsonError;
          }
        }
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Erro ao cadastrar produtor");
  }
};

export const useCreateProducer = () => {
  return useMutation({
    mutationFn: createProducer,
  });
};

export const fetchDocumentTypes = async (): Promise<DocumentType[]> => {
  try {
    const response = await api.get("api/producer/document-types").json<{ count: number; items: DocumentType[] }>();
    return response.items;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useDocumentTypes = () => {
  return useQuery({
    queryKey: ["document-types"],
    queryFn: fetchDocumentTypes,
    staleTime: 1000 * 60 * 60,
  });
};

export const fetchActiveCompanies = async (): Promise<ActiveCompany[]> => {
  try {
    const response = await api.get("api/producer/companies/active").json<{ count: number; items: ActiveCompany[] }>();
    return response.items;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useActiveCompanies = () => {
  return useQuery({
    queryKey: ["active-companies"],
    queryFn: fetchActiveCompanies,
    staleTime: 1000 * 60 * 5,
  });
};