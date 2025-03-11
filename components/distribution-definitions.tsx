import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DistributionDefinitions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Discrete Probability Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A discrete probability distribution describes the probability of each possible value for a random variable
            that can only take on certain distinct values.
          </p>
          <h4 className="font-medium mb-2">Examples:</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Number of heads when flipping coins</li>
            <li>Count of objects of different colors</li>
            <li>Number of students in different grade levels</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Continuous Probability Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A continuous probability distribution describes the probability of a random variable that can take any value
            within a given range.
          </p>
          <h4 className="font-medium mb-2">Examples:</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Heights of people</li>
            <li>Time to complete a task</li>
            <li>Temperature measurements</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

