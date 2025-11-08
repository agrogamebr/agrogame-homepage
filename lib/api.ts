import ky from "ky";

const API_BASE_URL = "https://agrogame-api-dev-1017408486443.us-central1.run.app";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "patch", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        if (process.env.NODE_ENV === "development") {
          console.log("🚀 API Request:", {
            url: request.url,
            method: request.method,
            headers: Object.fromEntries(request.headers.entries()),
          });
        }
      },
    ],
    afterResponse: [
      (request, options, response) => {
        if (process.env.NODE_ENV === "development") {
          console.log("✅ API Response:", {
            url: request.url,
            status: response.status,
            statusText: response.statusText,
          });
        }
      },
    ],
    beforeError: [
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.error("❌ API Error:", {
            name: error.name,
            message: error.message,
            status: error.response?.status,
          });
        }
        return error;
      },
    ],
  },
});

export interface ApiError extends Error {
  status?: number;
  response?: Response;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return error as ApiError;
  }
  return new Error("Erro desconhecido na API") as ApiError;
};