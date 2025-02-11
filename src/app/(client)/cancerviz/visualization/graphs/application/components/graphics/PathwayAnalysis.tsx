"use client"

import { useEffect, useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shadcn/tabs';
import { Badge } from '@/ui/shadcn/badge';

import { GraphBase } from '../../../domain/interfaces';
import { Chart as ChartComponent } from "react-chartjs-2"

interface PathwayAnalysisChartProps {
    data: GraphBase[];
}

export const PathwayAnalysis: React.FC<PathwayAnalysisChartProps> = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState("chart");
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [selectedCancerTypes, setSelectedCancerTypes] = useState<string[]>([]);

  const pathways = [
    "MAPK signaling",
    "PI3K-Akt signaling",
    "Wnt signaling",
    "p53 signaling",
    "Cell cycle",
    "Apoptosis",
    "JAK-STAT signaling",
    "NF-kappa B signaling",
  ];

  const cancerTypes = useMemo(() => Array.from(new Set(data.map((d) => d["cancerType"]))), [data]);

  useEffect(() => {
    setSelectedPathways(pathways.slice(0, 5));
    setSelectedCancerTypes(cancerTypes.slice(0, 5));
  }, [cancerTypes]);

  const generatePathwayData = () => {
    return selectedCancerTypes.map((cancerType) => ({
      cancerType,
      pathwayActivation: Object.fromEntries(selectedPathways.map((pathway) => [pathway, Math.random()])),
    }));
  };

  const pathwayData = useMemo(generatePathwayData, [selectedCancerTypes, selectedPathways]);

  const chartData = {
    labels: selectedCancerTypes,
    datasets: selectedPathways.map((pathway) => ({
      label: pathway,
      data: pathwayData.map((d) => d.pathwayActivation[pathway]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Tipos de Cáncer",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Nivel de Activación de la Vía",
        },
        min: 0,
        max: 1,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Análisis de Vías Metabólicas en Tipos de Cáncer",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  const togglePathway = (pathway: string) => {
    setSelectedPathways((prev) => (prev.includes(pathway) ? prev.filter((p) => p !== pathway) : [...prev, pathway]));
  };

  const toggleCancerType = (cancerType: string) => {
    setSelectedCancerTypes((prev) =>
      prev.includes(cancerType) ? prev.filter((t) => t !== cancerType) : [...prev, cancerType],
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Análisis de Vías Metabólicas</CardTitle>
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
                <h3 className="text-lg font-semibold mb-2">Vías Metabólicas:</h3>
                <div className="flex flex-wrap gap-2">
                  {pathways.map((pathway) => (
                    <Badge
                      key={pathway}
                      variant={selectedPathways.includes(pathway) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => togglePathway(pathway)}
                    >
                      {pathway}
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
              Este gráfico muestra el análisis de vías metabólicas para diferentes tipos de cáncer. Cada barra
              representa el nivel de activación de una vía metabólica específica en un tipo de cáncer particular.
            </p>
            <ul className="list-disc pl-5">
              <li>El eje X muestra los diferentes tipos de cáncer seleccionados.</li>
              <li>El eje Y representa el nivel de activación de las vías metabólicas, de 0 a 1.</li>
              <li>Cada color en las barras apiladas corresponde a una vía metabólica diferente.</li>
            </ul>
            <p>
              Puedes seleccionar qué vías metabólicas y tipos de cáncer mostrar en la pestaña de configuración. Pasa el
              cursor sobre cada sección de las barras para ver el valor exacto de activación.
            </p>
            <p>
              Este tipo de visualización es útil para identificar patrones de activación de vías metabólicas en
              diferentes tipos de cáncer, lo que puede ayudar en la investigación de mecanismos moleculares y en el
              desarrollo de terapias dirigidas.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
