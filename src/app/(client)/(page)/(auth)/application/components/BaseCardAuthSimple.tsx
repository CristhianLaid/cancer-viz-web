import React, { ReactNode, useState } from "react";
import { Dna } from "lucide-react";

interface BaseCardAuthSimpleProps {
  alertMessage?: string;
  children: ReactNode;
}
export const BaseCardAuthSimple = ({
  alertMessage,
  children,
}: BaseCardAuthSimpleProps) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 items-center justify-center p-0">
        <div className="relative w-full h-full">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundSize: "cover", // Asegura que la imagen cubra completamente el contenedor
              backgroundPosition: "center", // Centra la imagen
            }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 py-8">
            <Dna className="h-16 w-16 mb-4" />
            <h1 className="text-4xl font-bold">CancerViz</h1>
            <p className="mt-2 text-lg">
              Visualización Avanzada de Datos de Cáncer
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
              <Dna className="h-12 w-12 text-white" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-800">CancerViz</h1>
            <p className="text-sm text-gray-500">
              Visualización de Datos de Cáncer
            </p>
          </div>

          {/* Mostrar mensaje de alerta si hay un error o éxito */}
          {alertMessage && (
            <div
              className={`mb-4 p-4 rounded-lg text-center ${
                alertMessage.includes("error") ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              <p>{alertMessage}</p>
            </div>
          )}
      {children}
      </div>
      </div>
    </div>
  );
};
