"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Trash2, PlusCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface HeightData {
  id: number
  object: string
  height: number
}

export default function ContinuousDistribution() {
  const [measurements, setMeasurements] = useState<HeightData[]>([
    { id: 1, object: "Chair", height: 0 },
    { id: 2, object: "Desk", height: 0 },
    { id: 3, object: "Person 1", height: 0 },
    { id: 4, object: "Person 2", height: 0 },
  ])
  const [nextId, setNextId] = useState(5)
  const [histogramData, setHistogramData] = useState<any[]>([])
  const [mean, setMean] = useState(0)
  const [stdDev, setStdDev] = useState(0)

  useEffect(() => {
    // Calculate mean
    if (measurements.length === 0) return

    const heights = measurements.map((m) => m.height)
    const sum = heights.reduce((acc, val) => acc + val, 0)
    const newMean = sum / heights.length
    setMean(newMean)

    // Calculate standard deviation
    const squaredDiffs = heights.map((h) => Math.pow(h - newMean, 2))
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / heights.length
    setStdDev(Math.sqrt(variance))

    // Create histogram data
    if (heights.length > 0) {
      const min = Math.min(...heights)
      const max = Math.max(...heights)

      // Create bins for histogram
      const binWidth = (max - min) / 5 // 5 bins
      const bins = Array(5)
        .fill(0)
        .map((_, i) => ({
          binStart: min + i * binWidth,
          binEnd: min + (i + 1) * binWidth,
          count: 0,
          label: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
        }))

      // Count values in each bin
      heights.forEach((height) => {
        for (let i = 0; i < bins.length; i++) {
          if (
            height >= bins[i].binStart &&
            (height < bins[i].binEnd || (i === bins.length - 1 && height === bins[i].binEnd))
          ) {
            bins[i].count++
            break
          }
        }
      })

      setHistogramData(bins)
    }
  }, [measurements])

  const handleHeightChange = (id: number, value: string) => {
    const height = Number.parseFloat(value) || 0
    setMeasurements(measurements.map((m) => (m.id === id ? { ...m, height } : m)))
  }

  const handleObjectChange = (id: number, value: string) => {
    setMeasurements(measurements.map((m) => (m.id === id ? { ...m, object: value } : m)))
  }

  const addNewRow = () => {
    setMeasurements([...measurements, { id: nextId, object: "", height: 0 }])
    setNextId(nextId + 1)
  }

  const removeRow = (id: number) => {
    setMeasurements(measurements.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Height Measurements Data Collection</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Object</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <Input
                    value={m.object}
                    onChange={(e) => handleObjectChange(m.id, e.target.value)}
                    placeholder="Object name"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={m.height.toString()}
                    onChange={(e) => handleHeightChange(m.id, e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeRow(m.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outline" className="mt-4" onClick={addNewRow}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Statistical Analysis</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mean (Average)</Label>
                  <div className="text-xl font-bold">{mean.toFixed(2)} cm</div>
                </div>
                <div>
                  <Label>Standard Deviation</Label>
                  <div className="text-xl font-bold">{stdDev.toFixed(2)} cm</div>
                </div>
              </div>
              <div>
                <Label>Normal Distribution Properties</Label>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                  <li>
                    68% of data falls within 1 standard deviation of the mean ({(mean - stdDev).toFixed(2)} to{" "}
                    {(mean + stdDev).toFixed(2)} cm)
                  </li>
                  <li>
                    95% of data falls within 2 standard deviations of the mean ({(mean - 2 * stdDev).toFixed(2)} to{" "}
                    {(mean + 2 * stdDev).toFixed(2)} cm)
                  </li>
                  <li>
                    99.7% of data falls within 3 standard deviations of the mean ({(mean - 3 * stdDev).toFixed(2)} to{" "}
                    {(mean + 3 * stdDev).toFixed(2)} cm)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Histogram (Continuous Distribution)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={histogramData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name, props) => [`${value} items`, "Frequency"]}
                    labelFormatter={(label) => `Height Range: ${label} cm`}
                  />
                  <Legend />
                  <Bar dataKey="count" name="Frequency" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                As you add more measurements, the histogram will begin to resemble a normal distribution (bell curve).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

