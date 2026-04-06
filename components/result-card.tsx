"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  Lightbulb,
  BookOpen,
  Sparkles,
} from "lucide-react"

type VerdictType = "valid" | "violation" | "depends"

interface ReasoningStep {
  step: number
  title: string
  description: string
}

interface ResultCardProps {
  articleNumber: string
  articleTitle: string
  verdict: VerdictType
  explanation: string
  reasoning: ReasoningStep[]
  onSimplify?: () => void
  onViewCases?: () => void
  className?: string
}

const verdictConfig = {
  valid: {
    icon: CheckCircle2,
    label: "Valid",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    textColor: "text-success",
    iconColor: "text-success",
  },
  violation: {
    icon: XCircle,
    label: "Potential Violation",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    textColor: "text-destructive",
    iconColor: "text-destructive",
  },
  depends: {
    icon: AlertCircle,
    label: "Depends on Context",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    textColor: "text-warning",
    iconColor: "text-warning",
  },
}

export function ResultCard({
  articleNumber,
  articleTitle,
  verdict,
  explanation,
  reasoning,
  onSimplify,
  onViewCases,
  className,
}: ResultCardProps) {
  const [isReasoningOpen, setIsReasoningOpen] = useState(false)
  const config = verdictConfig[verdict]
  const VerdictIcon = config.icon

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 animate-scale-in",
        className
      )}
    >
      {/* Article Header */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-accent">
              Article {articleNumber}
            </CardDescription>
            <CardTitle className="mt-1 text-xl">{articleTitle}</CardTitle>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border",
              config.bgColor,
              config.borderColor
            )}
          >
            <VerdictIcon className={cn("h-4 w-4", config.iconColor)} />
            <span className={cn("text-sm font-medium", config.textColor)}>
              {config.label}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Explanation */}
        <div className="rounded-xl bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-foreground">
              {explanation}
            </p>
          </div>
        </div>

        {/* Reasoning Section */}
        <Collapsible open={isReasoningOpen} onOpenChange={setIsReasoningOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-3 px-4 rounded-xl hover:bg-muted/50"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-accent" />
                View Reasoning Process
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  isReasoningOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-3 rounded-xl border border-border/50 p-4">
              {reasoning.map((step, index) => (
                <div
                  key={step.step}
                  className="flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                    {step.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onSimplify}
            className="rounded-xl"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Explain Simpler
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewCases}
            className="rounded-xl"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            View Case Studies
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
