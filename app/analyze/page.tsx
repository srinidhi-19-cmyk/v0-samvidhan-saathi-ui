"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ResultCard } from "@/components/result-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import {
  Send,
  Mic,
  MicOff,
  ArrowLeft,
  Loader2,
  Scale,
  Shield,
  Building,
  Megaphone,
  Users,
  FileText,
  ChevronRight,
} from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'system'
  content: string
  timestamp: Date
}

const quickStartScenarios = [
  { id: 'arrest', icon: Shield },
  { id: 'speech', icon: Megaphone },
  { id: 'workplace', icon: Building },
  { id: 'govt', icon: FileText },
  { id: 'protest', icon: Users },
]

export default function AnalyzePage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [detectedDomain, setDetectedDomain] = useState<string | null>(null)
  const [keywords, setKeywords] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [evaluatingArticle, setEvaluatingArticle] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'system',
        content: "Welcome to Samvidhan Saathi. Please describe your situation in detail, and I'll help you understand your constitutional rights.",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  const handleSend = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setIsTyping(true)
    setDetectedDomain("Police & Arrest")
    setKeywords(["arrest", "detention", "rights"])
    setProgress(25)
    setEvaluatingArticle("Article 22")

    setTimeout(() => {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: "I understand you're describing a situation involving detention or arrest. To provide accurate guidance, I need to ask: Were you informed of the grounds of your arrest at the time of detention?",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, systemMessage])
      setIsTyping(false)
      setProgress(50)
    }, 1500)
  }

  const handleQuickStart = (scenarioId: string) => {
    const scenarioKey = `analyze.quick.${scenarioId}` as const
    const scenarioText = t(scenarioKey)
    setInputValue(scenarioText)
  }

  const simulateAnalysis = () => {
    setIsTyping(true)
    setProgress(75)
    setEvaluatingArticle("Article 22(1), 22(2)")

    setTimeout(() => {
      setProgress(100)
      setShowResults(true)
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (messages.length >= 3) {
        simulateAnalysis()
      } else {
        handleSend()
      }
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input would be implemented here
  }

  const resetAnalysis = () => {
    setMessages([])
    setShowResults(false)
    setDetectedDomain(null)
    setKeywords([])
    setProgress(0)
    setEvaluatingArticle(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 page-enter">
            <h1 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
              {t('analyze.title')}
            </h1>
            <p className="text-muted-foreground">
              Describe your situation and get AI-powered constitutional analysis
            </p>
          </div>

          {!showResults ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface - Left/Main */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col rounded-2xl border-2 border-border overflow-hidden">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.type === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            message.type === 'user'
                              ? "bg-muted text-foreground chat-bubble-user"
                              : "bg-card border-2 border-border border-l-4 border-l-primary chat-bubble-system"
                          )}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-[10px] text-muted-foreground mt-1 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-card border-2 border-border border-l-4 border-l-secondary rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-secondary typing-dot" />
                            <span className="w-2 h-2 rounded-full bg-secondary typing-dot" />
                            <span className="w-2 h-2 rounded-full bg-secondary typing-dot" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Start Chips */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">
                        {t('analyze.quickstart')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickStartScenarios.map((scenario) => {
                          const Icon = scenario.icon
                          const labelKey = `analyze.quick.${scenario.id}` as const
                          return (
                            <button
                              key={scenario.id}
                              onClick={() => handleQuickStart(scenario.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-xs font-medium text-foreground transition-colors"
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[150px]">{t(labelKey)}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 border-t border-border bg-card">
                    <div className="relative">
                      <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('analyze.placeholder')}
                        className="min-h-[80px] pr-24 rounded-xl border-2 border-border resize-none input-focus"
                      />
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleVoiceInput}
                          className={cn(
                            "h-8 w-8 rounded-lg",
                            isListening && "bg-destructive/10 text-destructive"
                          )}
                        >
                          {isListening ? (
                            <MicOff className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          onClick={messages.length >= 3 ? simulateAnalysis : handleSend}
                          disabled={!inputValue.trim() && messages.length < 3}
                          className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Context Panel - Right */}
              <div className="space-y-4">
                {/* Domain Detection */}
                <Card className="rounded-2xl border-2 border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {t('analyze.context.domain')}
                    </h3>
                    {detectedDomain ? (
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">{detectedDomain}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Waiting for input...</p>
                    )}
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card className="rounded-2xl border-2 border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {t('analyze.context.keywords')}
                    </h3>
                    {keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="bg-primary/10 text-primary border-0">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No keywords detected</p>
                    )}
                  </CardContent>
                </Card>

                {/* Progress */}
                <Card className="rounded-2xl border-2 border-border">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      {t('analyze.context.progress')}
                    </h3>
                    <Progress value={progress} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {progress === 0 && "Waiting for information..."}
                      {progress === 25 && "Gathering context..."}
                      {progress === 50 && "Asking clarifying questions..."}
                      {progress === 75 && "Analyzing against articles..."}
                      {progress === 100 && "Analysis complete!"}
                    </p>
                  </CardContent>
                </Card>

                {/* Evaluating Article */}
                {evaluatingArticle && (
                  <Card className="rounded-2xl border-2 border-border">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        {t('analyze.context.article')}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Scale className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="font-medium text-foreground">{evaluatingArticle}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Analyze Button */}
                {messages.length >= 2 && !showResults && (
                  <Button
                    onClick={simulateAnalysis}
                    disabled={isTyping}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground btn-lift"
                  >
                    {isTyping ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get Verdict
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="max-w-3xl mx-auto space-y-6 page-enter">
              <Button
                variant="ghost"
                onClick={resetAnalysis}
                className="mb-4 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </Button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                  <Scale className="h-4 w-4" />
                  Analysis Complete
                </div>
              </div>

              <ResultCard
                articleNumber="22(1)"
                articleTitle="Protection against arrest and detention"
                verdict="violation"
                explanation="Based on your description, there appears to be a violation of Article 22(1). Every person who is arrested must be informed of the grounds of arrest as soon as possible. The failure to provide this information constitutes a violation of your fundamental right."
                reasoning={[
                  {
                    step: 1,
                    title: "Identified Issue",
                    description: "Arrest without being informed of grounds",
                  },
                  {
                    step: 2,
                    title: "Mapped to Article",
                    description: "Article 22(1) - Right to be informed of grounds of arrest",
                  },
                  {
                    step: 3,
                    title: "Checked Conditions",
                    description: "Person was arrested but not informed of reasons",
                  },
                  {
                    step: 4,
                    title: "Verdict",
                    description: "This constitutes a violation of fundamental rights",
                  },
                ]}
                onSimplify={() => console.log("Simplify")}
                onViewCases={() => console.log("View cases")}
              />

              <ResultCard
                articleNumber="22(2)"
                articleTitle="Right to consult legal practitioner"
                verdict="depends"
                explanation="Article 22(2) guarantees the right to consult and be defended by a legal practitioner of choice. Whether this was violated depends on whether you were denied access to legal counsel after your arrest."
                reasoning={[
                  {
                    step: 1,
                    title: "Secondary Check",
                    description: "Right to legal representation",
                  },
                  {
                    step: 2,
                    title: "Condition",
                    description: "Access to lawyer must be provided",
                  },
                  {
                    step: 3,
                    title: "Status",
                    description: "Need more information about access to counsel",
                  },
                  {
                    step: 4,
                    title: "Recommendation",
                    description: "Clarify if legal access was denied",
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
        </div>
      </main>

      {/* Bottom padding for mobile nav */}
      <div className="h-16 lg:hidden" />
    </div>
  )
}
