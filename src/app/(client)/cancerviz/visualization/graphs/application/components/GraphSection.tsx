"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/shadcn/tabs";

export const GraphSection = () => {
  const [activeTab, setActiveTab] = useState("scatter");

  return (
    <main className="container mx-auto max-w-8xl px-1 sm:px-6 lg:px-4 py-3">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Visualización Avanzada de Datos Oncológicos
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto md:mx-0">
          Analiza patrones y tendencias en datos oncológicos a través de visualizaciones 
          interactivas diseñadas para apoyar la investigación biomédica y la toma de 
          decisiones clínicas basadas en evidencia.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-6 border-b border-gray-100 overflow-x-auto">
            <TabsList className="flex flex-wrap justify-center md:justify-start gap-3 bg-gray-50/50 p-1.5 rounded-lg">
              <TabsTrigger
                value="scatter"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "scatter"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Dispersión
              </TabsTrigger>
              <TabsTrigger
                value="correlation"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "tab2"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Correlación
              </TabsTrigger>
              <TabsTrigger
                value="expression"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "expression"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Expresión Génica
              </TabsTrigger>
              <TabsTrigger
                value="pathway"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "pathway"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Análisis de Vías
              </TabsTrigger>
              <TabsTrigger
                value="survival"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "survival"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Análisis de Supervivencia
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
                  ${activeTab === "comparison"
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                Comparación
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 sm:p-8">
            <TabsContent value="scatter" className="space-y-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Distribución de Casos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Visualiza cómo se distribuyen los casos de cáncer según distintos parámetros.
                </p>
              </div>
              <div className="h-72 sm:h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <p className="text-gray-400 font-medium">Aquí irá la Gráfica 1</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};
