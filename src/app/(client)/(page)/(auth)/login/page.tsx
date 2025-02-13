"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "@/ui/store/authStore";
import InputSimpleShadow from "@/ui/components/form/InputSimpleShadow";
import { Form } from "@/ui/shadcn/form";
import { Button } from "@/ui/shadcn/button";
import { useRouter } from "next/navigation";
import { configEnv } from "@/config/configEnv";
import Cookies from "js-cookie";
import { BaseCardAuthSimple } from "../application/components/BaseCardAuthSimple";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

const Login = () => {
  const { setUser, setLoading } = useAuthStore();
  const [loading, setLoadingState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
      const res = await fetch(
        `${NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      console.log("📥 Respuesta del servidor:", data);

      if (res.ok && data?.jwt) {
        // Guardar JWT en localStorage y cookies
        localStorage.setItem("jwt_token", data.jwt);
        Cookies.set("jwt_token", data.jwt, { expires: 7, path: "" });

        // Usar solo los datos necesarios para el estado (user y jwt)
        setUser({ user: data, jwt: data.jwt });

        setAlertMessage("Login exitoso! Bienvenido de vuelta!");
        router.push("/home");
      } else {
        setAlertMessage(data?.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setAlertMessage("Algo salió mal al intentar iniciar sesión.");
    } finally {
      setLoading(false);
      setLoadingState(false);

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  return (
    <BaseCardAuthSimple alertMessage={alertMessage}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputSimpleShadow
            control={form.control}
            name="email"
            type="email"
            placeholder="Email"
          />
          <InputSimpleShadow
            control={form.control}
            name="password"
            type="password"
            placeholder="Contraseña"
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </Form>
    </BaseCardAuthSimple>
  );
};

export default Login;
