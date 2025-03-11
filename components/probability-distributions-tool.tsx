"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DiscreteDistribution from "./discrete-distribution"
import ContinuousDistribution from "./continuous-distribution"
import DistributionDefinitions from "./distribution-definitions"

export default function ProbabilityDistributionsTool() {
  return (
    <div className="space-y-8">
      <DistributionDefinitions />

      <Tabs defaultValue="discrete" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discrete">Discrete Distribution</TabsTrigger>
          <TabsTrigger value="continuous">Continuous Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="discrete">
          <Card>
            <CardHeader>
              <CardTitle>Discrete Probability Distribution</CardTitle>
              <CardDescription>Analyze object color data collected with Google Lens</CardDescription>
            </CardHeader>
            <CardContent>
              <DiscreteDistribution />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="continuous">
          <Card>
            <CardHeader>
              <CardTitle>Continuous Probability Distribution</CardTitle>
              <CardDescription>Analyze height measurements collected with ARCore</CardDescription>
            </CardHeader>
            <CardContent>
              <ContinuousDistribution />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

