"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/shadcn/tabs";
import { ScatterChart } from "./graphics/ScatterChart";
import { useGraphFilterData } from "../hooks/useGraphFilterData";
import { CorrelationHeatmap } from "./graphics/CorrelationHeatmap";
import { PathwayAnalysis } from "./graphics/PathwayAnalysis";
import { SurvivalAnalysis } from "./graphics/SurvivalAnalysis";
import { ComparisonRadarChart } from "./graphics/ComparisonRadarChart";
import { CancerCharacteristicsHeatmap } from "./graphics/CancerCharacteristicsHeatmap";

export const GraphSection = ({ filters }: { filters: { [key: string]: string } }) => {
  const { data, isLoading, error } = useGraphFilterData(filters);
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
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <ScatterChart data={data} />
              )}
            </TabsContent>
            <TabsContent value="correlation" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <CorrelationHeatmap data={data} />
              )}
            </TabsContent>
            <TabsContent value="expression" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <CancerCharacteristicsHeatmap data={data} />
              )}
            </TabsContent>
            <TabsContent value="pathway" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <PathwayAnalysis data={data} />
              )}
            </TabsContent>
            <TabsContent value="survival" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <SurvivalAnalysis data={data} />
              )}
            </TabsContent>
            <TabsContent value="comparison" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  Cargando datos...
                </div>
              ) : !data || data.length === 0 ? (
                <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                  No hay datos disponibles para la selección actual.
                </div>
              ) : (
                <ComparisonRadarChart data={data}  />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};
