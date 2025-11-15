"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { producerSignupSchema, type ProducerSignupData } from "@/lib/schemas/producerSignup";
import { BRAZILIAN_STATES } from "@/lib/constants";
import { useCities } from "@/lib/services/ibge";
import { useDocumentTypes, useActiveCompanies } from "@/lib/api/producer";
import { formatPhoneNumber } from "@/lib/utils/phone";

interface ProducerSignupFormProps {
  onSubmit: (data: ProducerSignupData) => Promise<void> | void;
}

export interface ProducerSignupFormRef {
  reset: () => void;
}

const ProducerSignupForm = forwardRef<ProducerSignupFormRef, ProducerSignupFormProps>(
  ({ onSubmit }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const { cities, loading, error, loadCities, clearCities } = useCities();
  const { data: documentTypes, isLoading: isLoadingDocTypes } = useDocumentTypes();
  const { data: activeCompanies, isLoading: isLoadingCompanies } = useActiveCompanies();

  const form = useForm<ProducerSignupData>({
    resolver: zodResolver(producerSignupSchema),
    defaultValues: {
      fullName: "",
      documentTypeId: "",
      documentNumber: "",
      phone: "",
      email: "",
      state: "",
      address: "",
      number: "",
      city: "",
      zipcode: "",
      companyId: "",
      password: "",
      acceptTerms: false,
    },
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset();
      setSelectedState("");
      setSelectedDocType("");
      clearCities();
      setShowPassword(false);
    }
  }));

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    form.setValue("state", stateCode);
    form.setValue("city", "");
    
    if (stateCode) {
      loadCities(stateCode);
    } else {
      clearCities();
    }
  };

  const handleSubmit: SubmitHandler<ProducerSignupData> = async (data) => {
    // console.log("📋 Producer signup data:", data);
    // console.log("❌ Form errors:", form.formState.errors);
    // console.log("✅ Form valid:", form.formState.isValid);
    
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("❌ Erro no handleSubmit:", error);
    }
  };

  console.log("🔍 Form state:", {
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    errors: form.formState.errors
  });

  const formatDocument = (value: string, documentType: string) => {
    const numbers = value.replace(/\D/g, "");
    const docTypeName = documentTypes?.find(dt => dt.id.toString() === documentType)?.name.toLowerCase();
    
    // CPF: XXX.XXX.XXX-XX
    if (docTypeName?.includes('cpf')) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .substring(0, 14);
    }
    
    // CNPJ: XX.XXX.XXX/XXXX-XX
    if (docTypeName?.includes('cnpj')) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 18);
    }
    
    // RG, Passaporte e outros: sem máscara
    return value.toUpperCase();
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
  };

  return (
    <div className="w-full max-w-[872px] mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cadastre-se Agora
        </h2>
      </div>

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
          onSubmitCapture={() => console.log("🎯 Form submit event captured")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedDocType(value);
                      form.setValue("documentNumber", "");
                    }} 
                    value={field.value}
                    disabled={isLoadingDocTypes}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue 
                          placeholder={
                            isLoadingDocTypes 
                              ? "Carregando..." 
                              : "Selecione o tipo"
                          } 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {documentTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentNumber"
              render={({ field }) => {
                const docTypeName = documentTypes?.find(dt => dt.id.toString() === selectedDocType)?.name.toLowerCase();
                let placeholder = "Digite o número";
                
                if (docTypeName?.includes('cpf')) {
                  placeholder = "000.000.000-00";
                } else if (docTypeName?.includes('cnpj')) {
                  placeholder = "00.000.000/0000-00";
                } else if (docTypeName?.includes('rg')) {
                  placeholder = "Digite o RG";
                } else if (docTypeName?.includes('passaporte')) {
                  placeholder = "Digite o passaporte";
                }
                
                return (
                  <FormItem>
                    <FormLabel>Número do Documento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={placeholder}
                        disabled={!selectedDocType}
                        {...field}
                        onChange={(e) => {
                          const formatted = formatDocument(e.target.value, selectedDocType);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone com WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(34) 99999-9999"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, avenida, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select 
                    onValueChange={handleStateChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BRAZILIAN_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!selectedState || loading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue 
                          placeholder={
                            !selectedState 
                              ? "Escolha estado" 
                              : loading 
                              ? "Carregando..." 
                              : "Cidade"
                          } 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa Parceira</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={isLoadingCompanies}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue 
                          placeholder={
                            isLoadingCompanies 
                              ? "Carregando empresas..." 
                              : "Selecione a empresa"
                          } 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activeCompanies?.map((company) => (
                        <SelectItem key={company.companyId} value={company.companyId.toString()}>
                          {company.fullCompanyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie sua senha"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start justify-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-blue-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm text-blue-600 cursor-pointer">
                    <span>Aceito os </span>
                    <button
                      type="button"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      termos
                    </button>
                  </Label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium cursor-pointer"
            disabled={form.formState.isSubmitting}
            onClick={() => console.log("🔘 Botão submit clicado")}
          >
            {form.formState.isSubmitting ? "Realizando Cadastro..." : "Realizar Cadastro"}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Ao cadastrar-se como produtor rural, você terá acesso a benefícios
            exclusivos e poderá conectar-se com empresas parceiras.
          </p>
        </form>
      </Form>
    </div>
  );
});

ProducerSignupForm.displayName = 'ProducerSignupForm';

export default ProducerSignupForm;