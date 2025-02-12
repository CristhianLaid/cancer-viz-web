import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import { Button } from "@/ui/shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/shadcn/select";
import { Badge } from "@/ui/shadcn/badge";
import { GraphBase } from "../../../domain/interfaces";

ChartJS.register(...registerables);

interface SurvivalAnalysisProps {
  data: GraphBase[];
}

export const SurvivalAnalysis: React.FC<SurvivalAnalysisProps> = ({
  data = [],
}) => {
  const [activeTab, setActiveTab] = useState<"chart" | "settings" | "stats">(
    "chart"
  );
  const [selectedCancerTypes, setSelectedCancerTypes] = useState<string[]>([]);
  const [confidenceInterval, setConfidenceInterval] = useState(true);
  const [riskTable, setRiskTable] = useState(true);
  const [survivalType, setSurvivalType] = useState("default");

  const cancerTypes = useMemo(
    () => Array.from(new Set(data.map((d) => d["cancerType"]))),
    [data]
  );

  useEffect(() => {
    setSelectedCancerTypes(cancerTypes.slice(0, 3));
  }, [cancerTypes]);

  const calculateSurvivalData = (cancerType: string) => {
    const relevantData = data
      .filter((d) => d["cancerType"] === cancerType)
      .map((d) => ({
        time: Number(d.survivalMonths),
        event: 1,
      }))
      .sort((a, b) => a.time - b.time);

    let alive = relevantData.length;
    let survivalRate = 1;
    const survivalCurve = relevantData.map((d) => {
      if (d.event) {
        alive--;
        survivalRate *= alive / (alive + 1);
      }
      return { x: d.time, y: survivalRate };
    });

    return applySurvivalType(survivalCurve);
  };

  const applySurvivalType = (survivalCurve: { x: number; y: number }[]) => {
    switch (survivalType) {
      case "optimistic":
        return survivalCurve.map((point) => ({
          x: point.x,
          y: Math.pow(point.y, 0.7),
        }));
      case "pessimistic":
        return survivalCurve.map((point) => ({
          x: point.x,
          y: Math.pow(point.y, 1.3),
        }));
      case "earlyDrop":
        return survivalCurve.map((point) => ({
          x: point.x,
          y: point.y * Math.exp(-point.x / 50),
        }));
      case "lateDrop":
        return survivalCurve.map((point) => ({
          x: point.x,
          y: point.y * (1 - Math.exp(-point.x / 50)),
        }));
      default:
        return survivalCurve;
    }
  };

  const survivalData = useMemo(() => {
    return selectedCancerTypes.map((cancerType) => ({
      label: cancerType,
      data: calculateSurvivalData(cancerType),
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      fill: false,
    }));
  }, [selectedCancerTypes, data, survivalType]);

  const chartData = {
    datasets: [...survivalData],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Tiempo (meses)",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Probabilidad de supervivencia",
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
        text: "Curvas de Supervivencia de Kaplan-Meier",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  const toggleCancerType = (cancerType: string) => {
    setSelectedCancerTypes((prev) =>
      prev.includes(cancerType)
        ? prev.filter((t) => t !== cancerType)
        : [...prev, cancerType]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Análisis de Supervivencia</CardTitle>
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
              <Line data={chartData} options={options} />
            </div>
            {riskTable && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Tabla de Riesgo</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tiempo (meses)
                        </th>
                        {selectedCancerTypes.map((cancerType) => (
                          <th
                            key={cancerType}
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {cancerType}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[0, 12, 24, 36, 48, 60].map((month) => (
                        <tr key={month}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {month}
                          </td>
                          {selectedCancerTypes.map((cancerType) => (
                            <td
                              key={cancerType}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {survivalData
                                .find((d) => d.label === cancerType)
                                ?.data.find((p) => p.x >= month)
                                ?.y.toFixed(2) || "N/A"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tipos de Cáncer:</h3>
              <div className="flex flex-wrap gap-2">
                {cancerTypes.map((cancerType) => (
                  <Badge
                    key={cancerType}
                    variant={
                      selectedCancerTypes.includes(cancerType)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleCancerType(cancerType)}
                  >
                    {cancerType}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Tipo de Supervivencia:
              </h3>
              <Select value={survivalType} onValueChange={setSurvivalType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de supervivencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Predeterminado</SelectItem>
                  <SelectItem value="optimistic">Optimista</SelectItem>
                  <SelectItem value="pessimistic">Pesimista</SelectItem>
                  <SelectItem value="earlyDrop">Caída temprana</SelectItem>
                  <SelectItem value="lateDrop">Caída tardía</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Opciones:</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="confidenceInterval"
                    checked={confidenceInterval}
                    onChange={(e) => setConfidenceInterval(e.target.checked)}
                  />
                  <label htmlFor="confidenceInterval">
                    Intervalo de confianza
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="riskTable"
                    checked={riskTable}
                    onChange={(e) => setRiskTable(e.target.checked)}
                  />
                  <label htmlFor="riskTable">Tabla de riesgo</label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="info" className="space-y-4">
            <p>
              Este análisis de supervivencia muestra la probabilidad de
              supervivencia a lo largo del tiempo para diferentes tipos de
              cáncer, utilizando curvas de Kaplan-Meier.
            </p>
            <ul className="list-disc pl-5">
              <li>El eje X representa el tiempo en meses.</li>
              <li>
                El eje Y muestra la probabilidad acumulada de supervivencia.
              </li>
              <li>
                Puedes seleccionar diferentes tipos de cáncer para comparar sus
                curvas de supervivencia.
              </li>
              <li>
                También puedes ajustar el tipo de análisis para visualizar
                variaciones optimistas o pesimistas.
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
