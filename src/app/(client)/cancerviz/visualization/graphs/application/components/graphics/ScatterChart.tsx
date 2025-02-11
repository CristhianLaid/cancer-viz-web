import { useState, useEffect, useMemo, useRef } from 'react';

import { Scatter } from 'react-chartjs-2';
import { BubbleDataPoint, Chart as ChartJS, Point, registerables } from 'chart.js';
import zoomPlugin from "chartjs-plugin-zoom"


import { GraphBase } from '../../../domain/interfaces';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/card';
import { Button } from '@/ui/shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shadcn/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/shadcn/select';
import { Slider } from '@/ui/shadcn/slider';
import { Badge } from '@/ui/shadcn/badge';


ChartJS.register(
    zoomPlugin,
    ...registerables
);


interface ScatterChartProps {
    data: GraphBase[];
}

type AxisType = "age" | "survivalMonths" | "tumorSize" | "metastasisCount";

type OnValueChange = (value: AxisType) => void;


export const ScatterChart: React.FC<ScatterChartProps> = ({ data = [] }) => {
    const [xAxis, setXAxis] = useState<'age' | 'survivalMonths' | 'tumorSize' | 'metastasisCount'>('age');
    const [yAxis, setYAxis] = useState<'age' | 'survivalMonths' | 'tumorSize' | 'metastasisCount'>('survivalMonths');
    const [pointSize, setPointSize] = useState<number>(5);
    const [selectedCancerTypes, setSelectedCancerTypes] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'chart' | 'settings'>('chart');
    

    const cancerTypes = useMemo(() => {
        return Array.from(new Set(data.map((d) => d["cancerType"])));
      }, [data]);
    
    useEffect(() => {
        setSelectedCancerTypes(cancerTypes);
    }, [cancerTypes]);
    

    const getAxisData = (item: GraphBase, axis: 'age' | 'survivalMonths' | 'tumorSize' | 'metastasisCount') => {
        switch (axis) {
            case 'age':
                return Number.parseFloat(item.age) || 0;
            case 'survivalMonths':
                return Number.parseFloat(item.survivalMonths) || 0;
            case 'tumorSize':
                return Number.parseFloat(item.tumorSize) || 0;
            case 'metastasisCount':
                return Number.parseFloat(item.metastasisCount) || 0;
            default:
                return 0;
        }
    };

    const getColor = (item: GraphBase): string => {
        const colors: Record<string, string> = {
            "Breast Cancer": "rgba(255, 99, 132, 0.7)",
            "Lung Cancer": "rgba(54, 162, 235, 0.7)",
            "Colon Cancer": "rgba(255, 206, 86, 0.7)",
            "Prostate Cancer": "rgba(75, 192, 192, 0.7)",
            "Skin Cancer": "rgba(153, 102, 255, 0.7)",
        };
        return colors[item["cancerType"]] || "rgba(201, 203, 207, 0.7)";
    };

    const filteredData = data.filter((item) => selectedCancerTypes.includes(item["cancerType"]));

    const chartData = {
        datasets: [
            {
                label: `${xAxis} vs ${yAxis}`,
                data: filteredData.map((item) => ({
                    x: getAxisData(item, xAxis),
                    y: getAxisData(item, yAxis),
                    cancerType: item["cancerType"],
                })),
                backgroundColor: filteredData.map((item) => getColor(item)),
                pointRadius: pointSize,
            },
        ],
    };

    const chartRef = useRef<ChartJS<"scatter", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>>(null);

    const resetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    const options = {
        scales: {
            x: {
                type: 'linear' as const,
                position: 'bottom' as const,
                title: {
                    display: true,
                    text: xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
                },
            },
            y: {
                type: 'linear' as const,
                position: 'left' as const,
                title: {
                    display: true,
                    text: yAxis.charAt(0).toUpperCase() + yAxis.slice(1),
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const point = context.raw as { x: number; y: number; cancerType: string };
                        return [
                            `cancerType: ${point.cancerType}`,
                            `${xAxis}: ${point.x}`,
                            `${yAxis}: ${point.y}`,
                        ];
                    },
                },
            },
            legend: {
                display: false,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy" as "x" | "y" | "xy",
                },
                pan: {
                    enabled: true,
                    mode: "xy" as "x" | "y" | "xy",
                },
            },
        },
    };

    const axisOptions = [
        { value: 'age', label: 'Age' },
        { value: 'survivalMonths', label: 'Survival Months' },
        { value: 'tumorSize', label: 'Tumor Size' },
        { value: 'metastasisCount', label: 'Metastasis Count' },
    ];

    const toggleCancerType = (cancerType: string) => {
        setSelectedCancerTypes((prev) =>
            prev.includes(cancerType) ? prev.filter((type) => type !== cancerType) : [...prev, cancerType],
        );
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Cancer Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chart" | "settings")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="chart">Chart</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chart" className="space-y-4">
                        <div className="h-[400px]">
                            <Scatter ref={chartRef} data={chartData} options={options} />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={resetZoom} variant="outline">
                                Reset Zoom
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">X Axis</label>
                                <Select value={xAxis} onValueChange={setXAxis as OnValueChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select X Axis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {axisOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Y Axis</label>
                                <Select value={yAxis} onValueChange={setYAxis as OnValueChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Y Axis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {axisOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Point Size: {pointSize}</label>
                            <Slider
                                value={[pointSize]}
                                onValueChange={(value) => setPointSize(value[0])}
                                min={1}
                                max={10}
                                step={1}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">cancerType</label>
                            <div className="flex flex-wrap gap-2">
                                {cancerTypes.map((cancer) => (
                                    <Badge
                                        key={cancer}
                                        variant={selectedCancerTypes.includes(cancer) ? 'default' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => toggleCancerType(cancer)}
                                    >
                                        {cancer}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};