"use client"
import { useMemo, useState } from "react"

import { Chart as ChartComponent } from "react-chartjs-2"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs"
import { GraphBase } from "../../../domain/interfaces"




interface CorrelationChartProps {
    data: GraphBase[];
}

export const CorrelationHeatmap: React.FC<CorrelationChartProps> = ({ data=[] }) => {
    const [activeTab, setActiveTab] = useState("chart")
  
    const numericalFields = ["age", "survivalMonths", "tumorSize", "metastasisCount"]
  
    const calculateCorrelation = (x: number[], y: number[]) => {
      const n = Math.min(x.length, y.length)
      let sumX = 0,
        sumY = 0,
        sumXY = 0,
        sumX2 = 0,
        sumY2 = 0
      for (let i = 0; i < n; i++) {
        sumX += x[i]
        sumY += y[i]
        sumXY += x[i] * y[i]
        sumX2 += x[i] * x[i]
        sumY2 += y[i] * y[i]
      }
      const numerator = n * sumXY - sumX * sumY
      const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
      return denominator === 0 ? 0 : numerator / denominator
    }
  
    const correlationMatrix = useMemo(() => {
      const matrix = numericalFields.map(() => new Array(numericalFields.length).fill(0))
      for (let i = 0; i < numericalFields.length; i++) {
        for (let j = 0; j < numericalFields.length; j++) {
          if (i === j) {
            matrix[i][j] = 1
          } else if (i < j) {
            const field1 = numericalFields[i]
            const field2 = numericalFields[j]
            const values1 = data.map((d) => Number.parseFloat(d[field1])).filter((v) => !isNaN(v))
            const values2 = data.map((d) => Number.parseFloat(d[field2])).filter((v) => !isNaN(v))
  
            const correlation = calculateCorrelation(values1, values2)
            matrix[i][j] = correlation
            matrix[j][i] = correlation
          }
        }
      }
      return matrix
    }, [data, numericalFields]) // Added numericalFields to dependencies
  
    const chartData = {
      datasets: [
        {
          label: "Correlation Matrix",
          data: correlationMatrix.flatMap((row, i) =>
            row.map((value, j) => ({
              x: i,
              y: j,
              r: Math.abs(value) * 20, // Size based on correlation strength
              v: value, // Store original value for tooltip
            })),
          ),
          backgroundColor: (context) => {
            const value = context.raw.v
            return value > 0
              ? `rgba(0, 0, 255, ${Math.abs(value)})` // Blue for positive correlations
              : `rgba(255, 0, 0, ${Math.abs(value)})` // Red for negative correlations
          },
          pointStyle: "rect",
          radius: 30,
        },
      ],
    }
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              const { x, y } = context[0].raw
              return `${numericalFields[x]} vs ${numericalFields[y]}`
            },
            label: (context) => {
              return `Correlation: ${context.raw.v.toFixed(2)}`
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: -0.5,
          max: numericalFields.length - 0.5,
          ticks: {
            stepSize: 1,
            callback: (value) => numericalFields[value],
          },
          grid: {
            display: false,
          },
        },
        y: {
          type: "linear",
          min: -0.5,
          max: numericalFields.length - 0.5,
          ticks: {
            stepSize: 1,
            callback: (value) => numericalFields[value],
          },
          grid: {
            display: false,
          },
        },
      },
    }
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Correlation Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="space-y-4">
              <div className="h-[400px]">
                <ChartComponent type="scatter" data={chartData} options={options} />
              </div>
            </TabsContent>
            <TabsContent value="info" className="space-y-4">
              <p>
                Este mapa de calor muestra la correlación entre las diferentes variables numéricas en el conjunto de datos
                de cáncer. La intensidad del color representa la fuerza de la correlación:
              </p>
              <ul className="list-disc pl-5">
                <li>El color azul indica correlaciones positivas (cuando una variable aumenta, la otra también)</li>
                <li>El color rojo indica correlaciones negativas (cuando una variable aumenta, la otra disminuye)</li>
                <li>La intensidad del color indica la fuerza de la correlación:</li>
                <ul className="list-disc pl-5 mt-2">
                  <li>Correlación de 1: correlación positiva perfecta</li>
                  <li>Correlación de -1: correlación negativa perfecta</li>
                  <li>Correlación de 0: no hay correlación lineal</li>
                </ul>
              </ul>
              <p>Pase el cursor sobre cada celda para ver el valor exacto de correlación entre dos variables.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }
  