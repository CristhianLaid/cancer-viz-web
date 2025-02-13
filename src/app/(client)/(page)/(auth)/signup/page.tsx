"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Importa FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/ui/shadcn/button";
import { useRouter } from "next/navigation";
import { configEnv } from "@/config/configEnv";
import { BaseCardAuthSimple } from "../application/components/BaseCardAuthSimple";
import InputSimpleShadow from "@/ui/components/form/InputSimpleShadow";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  roles: z.array(z.string()).optional(),
});

const Signup = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoadingState] = useState(false);
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", roles: [] },
  });

  const { control, handleSubmit, setValue } = methods;

  const onSubmit = async (values: {
    username: string;
    email: string;
    password: string;
    roles?: string[];
  }) => {
    setLoadingState(true);
    setAlertMessage("");

    if ( !values.roles || values.roles.length === 0) {
      values.roles = ["user"];
    }

    try {
      const res = await fetch(
        `${configEnv.NEXT_PUBLIC_CANCER_VIZ_SERVICE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAlertMessage("¡Registro exitoso!");
        router.push("/login");
      } else {
        setAlertMessage(data?.message || "Hubo un error al registrar");
      }
    } catch (error) {
      setLoadingState(false);
      setAlertMessage("Hubo un problema con la conexión.");
    }
  };

  return (
    <BaseCardAuthSimple alertMessage={alertMessage}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputSimpleShadow
            control={control}
            name="username"
            placeholder="Nombre de usuario"
          />
          <InputSimpleShadow
            control={control}
            name="email"
            type="email"
            placeholder="Email"
          />
          <InputSimpleShadow
            control={control}
            name="password"
            type="password"
            placeholder="Contraseña"
          />

          {/* Campo de Roles */}
          {/* <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">Rol</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setValue("roles", [e.target.value])}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div> */}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrar"}
          </Button>
        </form>
      </FormProvider>
    </BaseCardAuthSimple>
  );
};

export default Signup;
