"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Trash2, PlusCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

interface ObjectData {
  id: number
  objectType: string
  color: string
  count: number
}

export default function DiscreteDistribution() {
  const [objects, setObjects] = useState<ObjectData[]>([
    { id: 1, objectType: "Pen", color: "Blue", count: 0 },
    { id: 2, objectType: "Pen", color: "Red", count: 0 },
    { id: 3, objectType: "Book", color: "Black", count: 0 },
  ])
  const [nextId, setNextId] = useState(4)
  const [chartData, setChartData] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    // Update chart data when objects change
    const newChartData = objects.map((obj) => ({
      name: `${obj.objectType} (${obj.color})`,
      count: obj.count,
      probability: totalCount > 0 ? (obj.count / totalCount).toFixed(4) : 0,
    }))
    setChartData(newChartData)

    // Calculate total count
    const newTotalCount = objects.reduce((sum, obj) => sum + obj.count, 0)
    setTotalCount(newTotalCount)
  }, [objects])

  const handleCountChange = (id: number, value: string) => {
    const count = Number.parseInt(value) || 0
    setObjects(objects.map((obj) => (obj.id === id ? { ...obj, count } : obj)))
  }

  const handleObjectTypeChange = (id: number, value: string) => {
    setObjects(objects.map((obj) => (obj.id === id ? { ...obj, objectType: value } : obj)))
  }

  const handleColorChange = (id: number, value: string) => {
    setObjects(objects.map((obj) => (obj.id === id ? { ...obj, color: value } : obj)))
  }

  const addNewRow = () => {
    setObjects([...objects, { id: nextId, objectType: "", color: "", count: 0 }])
    setNextId(nextId + 1)
  }

  const removeRow = (id: number) => {
    setObjects(objects.filter((obj) => obj.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Object Color Data Collection</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Object Type</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Count</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {objects.map((obj) => (
              <TableRow key={obj.id}>
                <TableCell>
                  <Input
                    value={obj.objectType}
                    onChange={(e) => handleObjectTypeChange(obj.id, e.target.value)}
                    placeholder="Type"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={obj.color}
                    onChange={(e) => handleColorChange(obj.id, e.target.value)}
                    placeholder="Color"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={obj.count.toString()}
                    onChange={(e) => handleCountChange(obj.id, e.target.value)}
                    min="0"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeRow(obj.id)}>
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
            <h3 className="text-lg font-medium mb-4">Probability Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Total Count: {totalCount}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Object</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Probability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.probability}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Discrete Distribution Chart</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="Count" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="probability" name="Probability" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

