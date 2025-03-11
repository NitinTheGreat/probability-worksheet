import ProbabilityDistributionsTool from "@/components/probability-distributions-tool"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Probability Distributions Tool</h1>
      <p className="text-center mb-8 text-muted-foreground">
        An interactive tool to help analyze discrete and continuous probability distributions
      </p>
      <ProbabilityDistributionsTool />
    </main>
  )
}

