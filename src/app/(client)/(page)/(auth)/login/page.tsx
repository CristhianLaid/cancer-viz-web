"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "@/ui/store/authStore";
import { toast } from "@utils/use-toast";
import InputSimpleShadow from "@/ui/components/form/InputSimpleShadow";
import { Form } from "@/ui/shadcn/form";
import { Button } from "@/ui/shadcn/button";
import { useRouter } from "next/navigation";  
import { configEnv } from "@/config/configEnv";
import Cookies from 'js-cookie';  // Importa js-cookie

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

const Login = () => {
  const { setUser, setLoading } = useAuthStore();
  const [loading, setLoadingState] = useState(false);
  const { NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL } = configEnv;
  const router = useRouter();  

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setLoadingState(true);
  
    try {
      console.log("📤 Enviando datos:", values);
  
      const res = await fetch(`${NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const data = await res.json();
  
      console.log("📥 Respuesta del servidor:", data);
  
      if (res.ok && data?.jwt) {
        // Guardar JWT en localStorage y cookies
        localStorage.setItem("jwt_token", data.jwt);
        Cookies.set("jwt_token", data.jwt, { expires: 7, path: '' });
  
        // Usar solo los datos necesarios para el estado (user y jwt)
        setUser({ user: data, jwt: data.jwt });
  
        toast({ title: "✅ Login exitoso", description: "Bienvenido de vuelta!" });
        router.push("/home");
      } else {
        toast({
          title: "⚠️ Error",
          description: data?.message || "Credenciales incorrectas",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      toast({ title: "Error", description: "Algo salió mal", variant: "destructive" });
    } finally {
      setLoading(false);
      setLoadingState(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputSimpleShadow control={form.control} name="email" type="email" placeholder="Email" />
          <InputSimpleShadow control={form.control} name="password" type="password" placeholder="Password" />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Cargando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
