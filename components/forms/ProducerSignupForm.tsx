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
import { producerSignupSchema, type ProducerSignupData } from "@/lib/schemas-producer";
import { BRAZILIAN_STATES } from "@/lib/constants";
import { useCities } from "@/lib/services/ibge";

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
  const { cities, loading, error, loadCities, clearCities } = useCities();

  const form = useForm<ProducerSignupData>({
    resolver: zodResolver(producerSignupSchema),
    defaultValues: {
      cpf: "",
      producerName: "",
      whatsapp: "",
      address: "",
      state: "",
      city: "",
      partnerCompanyCode: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset();
      setSelectedState("");
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
    console.log("📋 Producer signup data:", data);
    console.log("❌ Form errors:", form.formState.errors);
    console.log("✅ Form valid:", form.formState.isValid);
    
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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .substring(0, 14);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length >= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15); // (XX) XXXXX-XXXX = 15 caracteres
    }
    
    if (numbers.length >= 6) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 14); // (XX) XXXX-XXXX = 14 caracteres
    }
    
    if (numbers.length >= 2) {
      return numbers.replace(/(\d{2})(\d)/, "($1) $2");
    }
    
    return numbers;
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
          {/* Primeira linha: Nome Completo, CPF, Telefone com WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="producerName"
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
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
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
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone com WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(34) 99999-9999"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Segunda linha: Endereço, Estado e Município */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full md:flex-2 shrink-0">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número e complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full md:flex-1 shrink-0">
                  <FormLabel>Estado</FormLabel>
                  <Select 
                    onValueChange={handleStateChange} 
                    defaultValue={field.value}
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
                <FormItem className="w-full md:flex-1 shrink-0">
                  <FormLabel>Cidade</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
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

          {/* Terceira linha: Código da empresa parceira, e-mail, senha */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="partnerCompanyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código da empresa parceira</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o código" {...field} />
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
                  <FormLabel>Email corporativo</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="zakrisht2l0@gmail.com"
                      {...field}
                    />
                  </FormControl>
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