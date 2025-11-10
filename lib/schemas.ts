import { z } from "zod";

export const companySignupSchema = z.object({
  cnpj: z
    .string()
    .min(18, "CNPJ deve ter 18 caracteres")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX"),
  companyName: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres"),
  segment: z
    .string()
    .min(1, "Selecione um segmento de atuação"),
  activity: z
    .string()
    .min(1, "Selecione um ramo de atividade"),
  whatsapp: z
    .string()
    .min(14, "Telefone deve ter pelo menos 14 caracteres")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone deve estar no formato (XX) XXXXX-XXXX"),
  responsibleName: z
    .string()
    .min(2, "Nome do responsável deve ter pelo menos 2 caracteres")
    .max(100, "Nome do responsável deve ter no máximo 100 caracteres"),
  responsiblePhone: z
    .string()
    .min(14, "Telefone do responsável deve ter pelo menos 14 caracteres")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone do responsável deve estar no formato (XX) XXXXX-XXXX"),
  address: z
    .string()
    .min(10, "Endereço deve ter pelo menos 10 caracteres")
    .max(200, "Endereço deve ter no máximo 200 caracteres"),
  state: z
    .string()
    .min(2, "Selecione um estado"),
  city: z
    .string()
    .min(2, "Cidade deve ter pelo menos 2 caracteres")
    .max(50, "Cidade deve ter no máximo 50 caracteres"),
  corporateEmail: z
    .string()
    .email("E-mail corporativo deve ser válido")
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

export const companyApiSchema = z.object({
  fullCompanyName: z.string(),
  fantasyName: z.string().optional(),
  email1: z.string().email(),
  email2: z.string().email().optional(),
  phone1: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone 1 deve estar no formato (XX) XXXXX-XXXX"),
  phone2: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone 2 deve estar no formato (XX) XXXXX-XXXX")
    .optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string().default("Brasil"),
  responsibleName: z.string(),
  responsiblePhone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone do responsável deve estar no formato (XX) XXXXX-XXXX"),
  documentos: z.array(z.object({
    type: z.string(),
    documentNumber: z.string(),
    document: z.string(),
    primary: z.boolean()
  })),
  //segment: z.string(),
  companyTypeId: z.number().default(1),
  segmentoId: z.number().optional(),
  adminPassword: z.string(),
  aceiteTermos: z.boolean()
});

export type CompanySignupData = z.infer<typeof companySignupSchema>;
export type CompanyApiData = z.infer<typeof companyApiSchema>;

export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  }
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  }

  return phone;
};

export const validatePhoneFormat = (phone: string): boolean => {
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);
};

export const mapFormToApi = (formData: CompanySignupData): CompanyApiData => {
  const cleanCnpj = formData.cnpj.replace(/[.\-/]/g, "");

  const formattedPhone = validatePhoneFormat(formData.whatsapp) 
    ? formData.whatsapp 
    : formatPhoneNumber(formData.whatsapp);

  const formattedResponsiblePhone = validatePhoneFormat(formData.responsiblePhone) 
    ? formData.responsiblePhone 
    : formatPhoneNumber(formData.responsiblePhone);
  
  return {
    fullCompanyName: formData.companyName,
    fantasyName: formData.companyName,
    email1: formData.corporateEmail,
    phone1: formattedPhone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    country: "Brasil",
    responsibleName: formData.responsibleName,
    responsiblePhone: formattedResponsiblePhone,
    documentos: [{
      type: "CNPJ",
      documentNumber: cleanCnpj,
      document: "CNPJ",
      primary: true
    }],
    companyTypeId: 1,
    //segment: formData.segment,
    adminPassword: formData.password,
    aceiteTermos: formData.acceptTerms
  };
};