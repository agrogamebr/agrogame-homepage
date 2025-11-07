"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { companySignupSchema, type CompanySignupData } from "@/lib/schemas";

interface CompanySignupFormProps {
  onSubmit: (data: CompanySignupData) => void;
}

export default function CompanySignupForm({ onSubmit }: CompanySignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CompanySignupData>({
    resolver: zodResolver(companySignupSchema),
    defaultValues: {
      cnpj: "",
      companyName: "",
      segment: "",
      activity: "",
      whatsapp: "",
      address: "",
      state: "",
      city: "",
      corporateEmail: "",
      password: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = (data: CompanySignupData) => {
    console.log("Company signup data:", data);
    onSubmit(data);
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{2})(\d)/, "$1 $2")
      .replace(/(\d{4,5})(\d)/, "$1 $2")
      .substring(0, 14);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cadastre-se Agora
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="19.728.284/0001-05"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCNPJ(e.target.value);
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="segment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento de atuação</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Informe o segmento de atuação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cooperativa">Cooperativa</SelectItem>
                    <SelectItem value="insumos">Distribuidor de Insumos</SelectItem>
                    <SelectItem value="consultoria">Consultoria Agrícola</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Raio de atuação</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="AC" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ac">AC</SelectItem>
                      <SelectItem value="al">AL</SelectItem>
                      <SelectItem value="ap">AP</SelectItem>
                      <SelectItem value="am">AM</SelectItem>
                      <SelectItem value="ba">BA</SelectItem>
                      <SelectItem value="ce">CE</SelectItem>
                      <SelectItem value="df">DF</SelectItem>
                      <SelectItem value="es">ES</SelectItem>
                      <SelectItem value="go">GO</SelectItem>
                      <SelectItem value="ma">MA</SelectItem>
                      <SelectItem value="mt">MT</SelectItem>
                      <SelectItem value="ms">MS</SelectItem>
                      <SelectItem value="mg">MG</SelectItem>
                      <SelectItem value="pa">PA</SelectItem>
                      <SelectItem value="pb">PB</SelectItem>
                      <SelectItem value="pr">PR</SelectItem>
                      <SelectItem value="pe">PE</SelectItem>
                      <SelectItem value="pi">PI</SelectItem>
                      <SelectItem value="rj">RJ</SelectItem>
                      <SelectItem value="rn">RN</SelectItem>
                      <SelectItem value="rs">RS</SelectItem>
                      <SelectItem value="ro">RO</SelectItem>
                      <SelectItem value="rr">RR</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="sp">SP</SelectItem>
                      <SelectItem value="se">SE</SelectItem>
                      <SelectItem value="to">TO</SelectItem>
                    </SelectContent>
                  </Select>
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
                      placeholder="34 3241 8940"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="corporateEmail"
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
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Realizando Cadastro..." : "Realizar Cadastro"}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Ao cadastrar sua empresa, você terá acesso imediato ao painel de gestão
            e poderá começar a configurar benefícios para seus produtores.
          </p>
        </form>
      </Form>
    </div>
  );
}