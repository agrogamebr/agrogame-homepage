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
import { producerSignupSchema, type ProducerSignupData } from "@/lib/schemas-producer";

interface ProducerSignupFormProps {
  onSubmit: (data: ProducerSignupData) => void;
}

export default function ProducerSignupForm({ onSubmit }: ProducerSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ProducerSignupData>({
    resolver: zodResolver(producerSignupSchema),
    defaultValues: {
      cpf: "",
      producerName: "",
      propertyType: "",
      activity: "",
      whatsapp: "",
      address: "",
      state: "",
      city: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = (data: ProducerSignupData) => {
    console.log("Producer signup data:", data);
    onSubmit(data);
  };

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
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de propriedade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de propriedade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pequena">Pequena (até 50 hectares)</SelectItem>
                      <SelectItem value="media">Média (50 a 200 hectares)</SelectItem>
                      <SelectItem value="grande">Grande (acima de 200 hectares)</SelectItem>
                      <SelectItem value="familiar">Agricultura Familiar</SelectItem>
                      <SelectItem value="organica">Agricultura Orgânica</SelectItem>
                      <SelectItem value="hidroponica">Hidroponia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atividade principal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a atividade principal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="soja">Cultivo de Soja</SelectItem>
                      <SelectItem value="milho">Cultivo de Milho</SelectItem>
                      <SelectItem value="cana">Cultivo de Cana-de-açúcar</SelectItem>
                      <SelectItem value="cafe">Cultivo de Café</SelectItem>
                      <SelectItem value="algodao">Cultivo de Algodão</SelectItem>
                      <SelectItem value="feijao">Cultivo de Feijão</SelectItem>
                      <SelectItem value="bovinos">Criação de Bovinos</SelectItem>
                      <SelectItem value="suinos">Criação de Suínos</SelectItem>
                      <SelectItem value="aves">Criação de Aves</SelectItem>
                      <SelectItem value="frutas">Fruticultura</SelectItem>
                      <SelectItem value="hortalicas">Horticultura</SelectItem>
                      <SelectItem value="mista">Atividade Mista</SelectItem>
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço da propriedade rural" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ac">Acre</SelectItem>
                      <SelectItem value="al">Alagoas</SelectItem>
                      <SelectItem value="ap">Amapá</SelectItem>
                      <SelectItem value="am">Amazonas</SelectItem>
                      <SelectItem value="ba">Bahia</SelectItem>
                      <SelectItem value="ce">Ceará</SelectItem>
                      <SelectItem value="df">Distrito Federal</SelectItem>
                      <SelectItem value="es">Espírito Santo</SelectItem>
                      <SelectItem value="go">Goiás</SelectItem>
                      <SelectItem value="ma">Maranhão</SelectItem>
                      <SelectItem value="mt">Mato Grosso</SelectItem>
                      <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="pa">Pará</SelectItem>
                      <SelectItem value="pb">Paraíba</SelectItem>
                      <SelectItem value="pr">Paraná</SelectItem>
                      <SelectItem value="pe">Pernambuco</SelectItem>
                      <SelectItem value="pi">Piauí</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                      <SelectItem value="ro">Rondônia</SelectItem>
                      <SelectItem value="rr">Roraima</SelectItem>
                      <SelectItem value="sc">Santa Catarina</SelectItem>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="se">Sergipe</SelectItem>
                      <SelectItem value="to">Tocantins</SelectItem>
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
                  <FormLabel>Município</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe a cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Email pessoal</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="seu.email@gmail.com"
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
                <FormItem className="md:col-span-2">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm text-gray-600">
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

          <p className="text-xs text-gray-500 text-center">
            Ao cadastrar-se como produtor rural, você terá acesso a benefícios
            exclusivos e poderá conectar-se com empresas parceiras.
          </p>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Realizando Cadastro..." : "Realizar Cadastro"}
          </Button>
        </form>
      </Form>
    </div>
  );
}