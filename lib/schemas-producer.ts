import { z } from "zod";

export const producerSignupSchema = z.object({
  cpf: z
    .string()
    .min(14, "CPF deve ter 14 caracteres")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato XXX.XXX.XXX-XX"),
  producerName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  propertyType: z
    .string()
    .min(1, "Selecione um tipo de propriedade"),
  activity: z
    .string()
    .min(1, "Selecione uma atividade principal"),
  whatsapp: z
    .string()
    .min(15, "Telefone deve ter pelo menos 11 dígitos")
    .regex(/^\d{2} \d{4,5} \d{4}$/, "Telefone deve estar no formato XX XXXXX XXXX"),
  address: z
    .string()
    .min(10, "Endereço deve ter pelo menos 10 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres"),
  state: z
    .string()
    .min(1, "Selecione um estado"),
  city: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .max(50, "Cidade deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .email("E-mail deve ser válido")
    .min(5, "E-mail deve ter pelo menos 5 caracteres"),
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

export type ProducerSignupData = z.infer<typeof producerSignupSchema>;