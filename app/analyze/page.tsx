"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { StepWizard } from "@/components/step-wizard"
import { ResultCard } from "@/components/result-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  Building2,
  Shield,
  Landmark,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Scale,
  MessageSquare,
  Lock,
  Users,
  Eye,
} from "lucide-react"
import Link from "next/link"

const steps = [
  { title: "Situation", description: "Select context" },
  { title: "Issue", description: "Identify problem" },
  { title: "Details", description: "Add conditions" },
  { title: "Results", description: "View analysis" },
]

const situations = [
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    description: "Schools, colleges, admissions",
  },
  {
    id: "workplace",
    label: "Workplace",
    icon: Building2,
    description: "Employment, discrimination",
  },
  {
    id: "police",
    label: "Police",
    icon: Shield,
    description: "Arrests, detention, rights",
  },
  {
    id: "government",
    label: "Government",
    icon: Landmark,
    description: "Public services, officials",
  },
]

const issues = [
  {
    id: "speech",
    label: "Freedom of Speech",
    icon: MessageSquare,
    description: "Expression and opinion",
  },
  {
    id: "equality",
    label: "Right to Equality",
    icon: Users,
    description: "Non-discrimination",
  },
  {
    id: "arrest",
    label: "Arrest & Detention",
    icon: Lock,
    description: "Legal procedures",
  },
  {
    id: "privacy",
    label: "Right to Privacy",
    icon: Eye,
    description: "Personal information",
  },
]

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [additionalDetails, setAdditionalDetails] = useState({
    location: "",
    severity: "",
    hasEvidence: false,
    isRecurring: false,
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleNext = () => {
    if (currentStep === 2) {
      // Start analysis
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
        setCurrentStep(3)
      }, 2000)
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    if (currentStep === 3) {
      setShowResults(false)
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedSituation !== null
      case 1:
        return selectedIssue !== null
      case 2:
        return true
      default:
        return false
    }
  }

  const resetAnalysis = () => {
    setCurrentStep(0)
    setSelectedSituation(null)
    setSelectedIssue(null)
    setAdditionalDetails({
      location: "",
      severity: "",
      hasEvidence: false,
      isRecurring: false,
    })
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analyze Your Situation
          </h1>
          <p className="text-muted-foreground">
            Get AI-powered analysis of your legal situation based on the Constitution
          </p>
        </div>

        {/* Step Progress */}
        <div className="max-w-3xl mx-auto mb-12">
          <StepWizard steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {/* Loading State */}
          {isAnalyzing && (
            <Card className="animate-scale-in">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-4 border-muted animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scale className="h-8 w-8 text-accent animate-pulse" />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg font-medium text-foreground">
                    Analyzing your situation...
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mapping to relevant constitutional articles
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing with AI
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Select Situation */}
          {currentStep === 0 && !isAnalyzing && (
            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                What is the context of your situation?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {situations.map((situation) => {
                  const Icon = situation.icon
                  const isSelected = selectedSituation === situation.id
                  return (
                    <button
                      key={situation.id}
                      onClick={() => setSelectedSituation(situation.id)}
                      className={cn(
                        "flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200",
                        "hover:border-accent/50 hover:bg-accent/5",
                        isSelected
                          ? "border-accent bg-accent/10"
                          : "border-border/50 bg-card"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {situation.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {situation.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Issue */}
          {currentStep === 1 && !isAnalyzing && (
            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                What type of issue are you facing?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {issues.map((issue) => {
                  const Icon = issue.icon
                  const isSelected = selectedIssue === issue.id
                  return (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue.id)}
                      className={cn(
                        "flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200",
                        "hover:border-accent/50 hover:bg-accent/5",
                        isSelected
                          ? "border-accent bg-accent/10"
                          : "border-border/50 bg-card"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {issue.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {issue.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Additional Details */}
          {currentStep === 2 && !isAnalyzing && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                Provide additional details
              </h2>
              <Card>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location / State</Label>
                      <Select
                        value={additionalDetails.location}
                        onValueChange={(value) =>
                          setAdditionalDetails((prev) => ({
                            ...prev,
                            location: value,
                          }))
                        }
                      >
                        <SelectTrigger id="location" className="rounded-xl">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity Level</Label>
                      <Select
                        value={additionalDetails.severity}
                        onValueChange={(value) =>
                          setAdditionalDetails((prev) => ({
                            ...prev,
                            severity: value,
                          }))
                        }
                      >
                        <SelectTrigger id="severity" className="rounded-xl">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Informational</SelectItem>
                          <SelectItem value="medium">
                            Medium - Needs attention
                          </SelectItem>
                          <SelectItem value="high">High - Urgent</SelectItem>
                          <SelectItem value="critical">
                            Critical - Immediate
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                      <div>
                        <Label htmlFor="evidence" className="font-medium">
                          Do you have evidence?
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Documents, photos, or witnesses
                        </p>
                      </div>
                      <Switch
                        id="evidence"
                        checked={additionalDetails.hasEvidence}
                        onCheckedChange={(checked) =>
                          setAdditionalDetails((prev) => ({
                            ...prev,
                            hasEvidence: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                      <div>
                        <Label htmlFor="recurring" className="font-medium">
                          Is this a recurring issue?
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Has happened multiple times
                        </p>
                      </div>
                      <Switch
                        id="recurring"
                        checked={additionalDetails.isRecurring}
                        onCheckedChange={(checked) =>
                          setAdditionalDetails((prev) => ({
                            ...prev,
                            isRecurring: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 3 && showResults && !isAnalyzing && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                  <Scale className="h-4 w-4" />
                  Analysis Complete
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Here&apos;s what we found
                </h2>
              </div>

              <ResultCard
                articleNumber="19(1)(a)"
                articleTitle="Right to Freedom of Speech and Expression"
                verdict="valid"
                explanation="Based on your situation, you have the constitutional right to express your opinion. The scenario you described falls under the protection of Article 19(1)(a), which guarantees freedom of speech and expression to all citizens of India."
                reasoning={[
                  {
                    step: 1,
                    title: "Identified Issue Type",
                    description:
                      "Freedom of expression in educational institution",
                  },
                  {
                    step: 2,
                    title: "Mapped to Constitutional Article",
                    description:
                      "Article 19(1)(a) - Freedom of Speech and Expression",
                  },
                  {
                    step: 3,
                    title: "Checked Reasonable Restrictions",
                    description:
                      "No restrictions under Article 19(2) apply to this case",
                  },
                  {
                    step: 4,
                    title: "Final Verdict",
                    description: "Your rights are protected under the Constitution",
                  },
                ]}
                onSimplify={() => console.log("Simplify")}
                onViewCases={() => console.log("View cases")}
              />

              <ResultCard
                articleNumber="14"
                articleTitle="Right to Equality"
                verdict="depends"
                explanation="The application of Article 14 depends on additional context. While the Constitution guarantees equality before law, the specific circumstances of your case may require consideration of reasonable classification principles."
                reasoning={[
                  {
                    step: 1,
                    title: "Identified Secondary Issue",
                    description: "Potential discrimination based on classification",
                  },
                  {
                    step: 2,
                    title: "Applied Intelligible Differentia Test",
                    description:
                      "Checking if classification has rational nexus to objective",
                  },
                  {
                    step: 3,
                    title: "Context Dependent",
                    description:
                      "Need more information about the specific discrimination",
                  },
                  {
                    step: 4,
                    title: "Recommendation",
                    description: "Consult legal expert for detailed analysis",
                  },
                ]}
                onSimplify={() => console.log("Simplify")}
                onViewCases={() => console.log("View cases")}
              />

              <div className="flex justify-center pt-4">
                <Button
                  onClick={resetAnalysis}
                  variant="outline"
                  className="rounded-xl"
                >
                  Analyze Another Situation
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!isAnalyzing && currentStep < 3 && (
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="rounded-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {currentStep === 2 ? "Analyze" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {showResults && (
            <div className="flex justify-center mt-8">
              <Button asChild variant="ghost" className="rounded-xl">
                <Link href="/case-studies">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explore Related Case Studies
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
