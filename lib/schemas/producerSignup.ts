import { z } from "zod";

export const producerSignupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  documentTypeId: z
    .string()
    .min(1, "Selecione um tipo de documento"),
  documentNumber: z
    .string()
    .min(1, "Número do documento é obrigatório"),
  phone: z
    .string()
    .min(14, "Telefone deve ter pelo menos 14 caracteres")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone deve estar no formato (XX) XXXXX-XXXX"),
  email: z
    .string()
    .email("E-mail deve ser válido")
    .min(5, "E-mail deve ter pelo menos 5 caracteres"),
  state: z
    .string()
    .min(1, "Selecione um estado"),
  address: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres"),
  number: z
    .string()
    .optional(),
  city: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .max(50, "Cidade deve ter no máximo 50 caracteres"),
  zipcode: z
    .string()
    .min(9, "CEP deve ter 9 caracteres")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
  companyId: z
    .string()
    .min(1, "Selecione uma empresa parceira"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos"),
});

export const producerApiSchema = z.object({
  fullName: z.string(),
  documentTypeId: z.number(),
  documentNumber: z.string(),
  phone: z.string(),
  email: z.string().email(),
  state: z.string(),
  address: z.string(),
  number: z.string().optional(),
  city: z.string(),
  zipcode: z.string(),
  companyId: z.number(),
  password: z.string(),
  acceptedTerms: z.boolean(),
});

export type ProducerSignupData = z.infer<typeof producerSignupSchema>;
export type ProducerApiData = z.infer<typeof producerApiSchema>;

export const mapFormToApi = (data: ProducerSignupData): ProducerApiData => {
  return {
    fullName: data.fullName,
    documentTypeId: parseInt(data.documentTypeId),
    documentNumber: data.documentNumber,
    phone: data.phone,
    email: data.email,
    state: data.state,
    address: data.address,
    number: data.number,
    city: data.city,
    zipcode: data.zipcode,
    companyId: parseInt(data.companyId),
    password: data.password,
    acceptedTerms: data.acceptTerms,
  };
};