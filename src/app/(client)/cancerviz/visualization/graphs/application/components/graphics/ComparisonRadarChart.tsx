import { useEffect, useMemo, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from "chartjs-plugin-zoom"

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shadcn/tabs';
import { Badge } from '@/ui/shadcn/badge';
import { GraphBase } from '../../../domain/interfaces';
import { Button } from '@/ui/shadcn/button';
import 'chartjs-plugin-zoom'; 

Chart.register(...registerables, zoomPlugin);

interface ComparisonRadarChartProps {
    data: GraphBase[];
}

export const ComparisonRadarChart: React.FC<ComparisonRadarChartProps> = ({ data = [] }) => {
    const [activeTab, setActiveTab] = useState("chart");
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>(["age", "survivalMonths", "tumorSize"]);
    const [selectedCancerTypes, setSelectedCancerTypes] = useState<string[]>([]);
    const [showAllCancerTypes, setShowAllCancerTypes] = useState(false);

    const dimensions = ["age", "survivalMonths", "tumorSize", "metastasisCount"];
    const cancerTypes = useMemo(() => Array.from(new Set(data.map((d) => d["cancerType"]))), [data]);
    
    useEffect(() => {
        setSelectedDimensions(selectedDimensions.slice(0, 5));
        setSelectedCancerTypes(cancerTypes.slice(0, 5));
    }, [cancerTypes]);

    const chartData = useMemo(() => {
        return selectedCancerTypes.map((cancerType) => {
            const typeData = data.filter((d) => d["cancerType"] === cancerType);
            const averages = selectedDimensions.map((dim) => {
                const values = typeData.map((d) => Number(d[dim])).filter((v) => !isNaN(v));
                return values.reduce((sum, val) => sum + val, 0) / values.length || 0; 
            });
            return {
                label: cancerType,
                data: averages,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
                borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                borderWidth: 1,
            };
        });
    }, [data, selectedCancerTypes, selectedDimensions]);

    const chartOptions = {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100, // Asegúrate de establecer un máximo razonable
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: "Vista Multidimensional del Cáncer",
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'r', // Permite desplazar el gráfico radialmente
                    speed: 10, // Asegúrate de definir una velocidad adecuada
                },
                zoom: {
                    enabled: true,
                    mode: 'r', // Permite hacer zoom radialmente
                    speed: 0.1, // Ajusta la velocidad del zoom
                    rangeMin: {
                        r: 0, // Rango mínimo de zoom radial
                    },
                    rangeMax: {
                        r: 100, // Rango máximo de zoom radial
                    },
                },
            },
        },
    };
    
    

    const toggleDimension = (dim: string) => {
        setSelectedDimensions((prev) =>
            prev.includes(dim) ? prev.filter((d) => d !== dim) : [...prev, dim]
        );
    };

    const toggleCancerType = (cancerType: string) => {
        setSelectedCancerTypes((prev) =>
            prev.includes(cancerType) ? prev.filter((t) => t !== cancerType) : [...prev, cancerType],
        );
    };

    const displayedCancerTypes = showAllCancerTypes ? cancerTypes : cancerTypes.slice(0, 5);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Vista Multidimensional del Cáncer</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="chart">Gráfico</TabsTrigger>
                        <TabsTrigger value="settings">Configuración</TabsTrigger>
                        <TabsTrigger value="info">Información</TabsTrigger>
                    </TabsList>

                    <TabsContent value="chart" className="space-y-4">
                        <div className="flex justify-center">
                            <div className="h-[500px] w-[500px]">
                                <Radar
                                    data={{
                                        labels: selectedDimensions,
                                        datasets: chartData,
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Dimensiones:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {dimensions.map((dim) => (
                                        <Badge
                                            key={dim}
                                            variant={selectedDimensions.includes(dim) ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleDimension(dim)}
                                        >
                                            {dim}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tipos de Cáncer:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {displayedCancerTypes.map((cancerType) => (
                                        <Badge
                                            key={cancerType}
                                            variant={selectedCancerTypes.includes(cancerType) ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => toggleCancerType(cancerType)}
                                        >
                                            {cancerType}
                                        </Badge>
                                    ))}
                                    {cancerTypes.length > 5 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowAllCancerTypes(!showAllCancerTypes)}
                                        >
                                            {showAllCancerTypes ? "Mostrar menos" : "Mostrar más"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="info" className="space-y-4">
                        <p>
                            Este gráfico representa una comparación multidimensional de diferentes tipos de cáncer.
                            Cada eje muestra una dimensión específica (edad, meses de supervivencia, tamaño del tumor, etc.).
                        </p>
                        <ul className="list-disc pl-5">
                            <li>Los ejes representan diferentes dimensiones seleccionadas.</li>
                            <li>Cada color corresponde a un tipo de cáncer distinto.</li>
                            <li>Puedes seleccionar qué dimensiones visualizar en la pestaña de configuración.</li>
                        </ul>
                        <p>
                            Esta visualización ayuda a identificar diferencias y patrones en las características de los tipos de cáncer seleccionados.
                        </p>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
