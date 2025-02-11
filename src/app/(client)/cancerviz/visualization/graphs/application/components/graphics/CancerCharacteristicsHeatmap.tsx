"use client";

import { Badge } from "@/ui/shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import { useEffect, useMemo, useState } from "react";
import { Chart as ChartComponent } from "react-chartjs-2"
import { GraphBase } from "../../../domain/interfaces";

interface CorrelationChartProps {
    data: GraphBase[];
}

export const CancerCharacteristicsHeatmap: React.FC<CorrelationChartProps> = ({ data=[] }) => {
    const [activeTab, setActiveTab] = useState("chart")
    const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
    const [selectedCancerTypes, setSelectedCancerTypes] = useState<string[]>([])
  
    const characteristics = ["age", "survivalMonths", "tumorSize", "metastasisCount"]
    const cancerTypes = useMemo(() => Array.from(new Set(data.map((d) => d["cancerType"]))), [data])
  
    useEffect(() => {
      setSelectedCharacteristics(characteristics.slice(0, 3)) 
      setSelectedCancerTypes(cancerTypes.slice(0, 5)) 
    }, [cancerTypes])
  
    const chartData = {
      labels: selectedCancerTypes,
      datasets: selectedCharacteristics.map((characteristic) => ({
        label: characteristic,
        data: selectedCancerTypes.map((cancerType) => {
          const relevantData = data.filter((d) => d["cancerType"] === cancerType)
          return relevantData.reduce((sum, d) => sum + Number(d[characteristic]), 0) / relevantData.length
        }),
      })),
    }
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Tipos de Cáncer",
          },
        },
        y: {
          title: {
            display: true,
            text: "Valor Promedio",
          },
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Mapa de Calor de Características por Tipo de Cáncer",
        },
        tooltip: {
          callbacks: {
            title: (context) => `${context[0].label} - ${context[0].dataset.label}`,
            label: (context) => `Promedio: ${context.parsed.y.toFixed(2)}`,
          },
        },
      },
    }
  
    const toggleCharacteristic = (characteristic: string) => {
      setSelectedCharacteristics((prev) =>
        prev.includes(characteristic) ? prev.filter((c) => c !== characteristic) : [...prev, characteristic],
      )
    }
  
    const toggleCancerType = (cancerType: string) => {
      setSelectedCancerTypes((prev) =>
        prev.includes(cancerType) ? prev.filter((t) => t !== cancerType) : [...prev, cancerType],
      )
    }
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mapa de Calor de Características por Tipo de Cáncer</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="space-y-4">
              <div className="h-[400px]">
                <ChartComponent type="bar" data={chartData} options={options} />
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Características:</h3>
                  <div className="flex flex-wrap gap-2">
                    {characteristics.map((characteristic) => (
                      <Badge
                        key={characteristic}
                        variant={selectedCharacteristics.includes(characteristic) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCharacteristic(characteristic)}
                      >
                        {characteristic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tipos de Cáncer:</h3>
                  <div className="flex flex-wrap gap-2">
                    {cancerTypes.map((cancerType) => (
                      <Badge
                        key={cancerType}
                        variant={selectedCancerTypes.includes(cancerType) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCancerType(cancerType)}
                      >
                        {cancerType}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="info" className="space-y-4">
              <p>
                Este mapa de calor muestra la distribución promedio de diferentes características numéricas para varios
                tipos de cáncer. La intensidad del color representa el valor promedio de la característica:
              </p>
              <ul className="list-disc pl-5">
                <li>Los colores más intensos indican valores promedio más altos</li>
                <li>Los colores menos intensos indican valores promedio más bajos</li>
              </ul>
              <p>
                Puedes seleccionar qué características y tipos de cáncer mostrar en la pestaña de configuración. Pasa el
                cursor sobre cada barra para ver el valor promedio exacto.
              </p>
              <p>
                Este tipo de visualización es útil para identificar patrones y diferencias en las características entre
                diferentes tipos de cáncer, lo que puede ayudar en la investigación y el desarrollo de estrategias de
                tratamiento.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }