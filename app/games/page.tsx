"use client"

import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Gamepad2,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Timer,
  Shield,
  AlertTriangle,
} from "lucide-react"

interface Scenario {
  id: string
  description: string
  isViolation: boolean
  articleReference: string
  explanation: string
}

const scenarios: Scenario[] = [
  {
    id: "1",
    description:
      "A government school mandates that all students must sing religious hymns during morning assembly.",
    isViolation: true,
    articleReference: "Article 28",
    explanation:
      "This violates Article 28 which prohibits religious instruction in state-funded institutions.",
  },
  {
    id: "2",
    description:
      "A citizen peacefully protests against a government policy on the roadside with proper police permission.",
    isViolation: false,
    articleReference: "Article 19(1)(b)",
    explanation:
      "This is a valid exercise of the right to peaceful assembly under Article 19(1)(b).",
  },
  {
    id: "3",
    description:
      "Police arrest a person and keep them in custody for 48 hours without producing them before a magistrate.",
    isViolation: true,
    articleReference: "Article 22",
    explanation:
      "Article 22 requires that arrested persons be produced before a magistrate within 24 hours.",
  },
  {
    id: "4",
    description:
      "A private company refuses to hire someone based solely on their caste background.",
    isViolation: true,
    articleReference: "Article 15",
    explanation:
      "This violates Article 15 which prohibits discrimination based on caste.",
  },
  {
    id: "5",
    description:
      "A citizen writes a blog criticizing government policies using factual information.",
    isViolation: false,
    articleReference: "Article 19(1)(a)",
    explanation:
      "Factual criticism of government is protected under freedom of speech in Article 19(1)(a).",
  },
  {
    id: "6",
    description:
      "A person is denied the right to vote in elections because they cannot read or write.",
    isViolation: true,
    articleReference: "Article 326",
    explanation:
      "Universal adult suffrage under Article 326 grants voting rights regardless of literacy.",
  },
  {
    id: "7",
    description:
      "A minority community establishes a school to preserve their culture and language.",
    isViolation: false,
    articleReference: "Article 30",
    explanation:
      "Article 30 protects the right of minorities to establish educational institutions.",
  },
  {
    id: "8",
    description:
      "A factory employs children under 14 years in hazardous work conditions.",
    isViolation: true,
    articleReference: "Article 24",
    explanation:
      "Article 24 prohibits employment of children below 14 in hazardous occupations.",
  },
  {
    id: "9",
    description:
      "The government provides free and compulsory education to all children between ages 6-14.",
    isViolation: false,
    articleReference: "Article 21A",
    explanation:
      "This implements Article 21A which guarantees the right to education.",
  },
  {
    id: "10",
    description:
      "A person is forced to do unpaid labor as punishment for not repaying a loan.",
    isViolation: true,
    articleReference: "Article 23",
    explanation:
      "Article 23 prohibits forced labor and trafficking in human beings.",
  },
]

type GameType = "scenario-challenge" | "right-wrong"
type GameState = "menu" | "playing" | "result"

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [gameState, setGameState] = useState<GameState>("menu")
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameScenarios, setGameScenarios] = useState<Scenario[]>([])

  const shuffleScenarios = useCallback(() => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5)
    setGameScenarios(shuffled.slice(0, 6))
  }, [])

  useEffect(() => {
    if (gameState === "playing" && selectedGame === "right-wrong") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(null)
            return 30
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState, selectedGame, currentScenarioIndex])

  const startGame = (game: GameType) => {
    setSelectedGame(game)
    setGameState("playing")
    setCurrentScenarioIndex(0)
    setScore(0)
    setStreak(0)
    setAnswers([])
    setTimeLeft(30)
    shuffleScenarios()
  }

  const handleAnswer = (answer: boolean | null) => {
    const currentScenario = gameScenarios[currentScenarioIndex]
    const isCorrect =
      answer !== null && answer === currentScenario.isViolation

    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)
    setAnswers([...answers, isCorrect])

    if (isCorrect) {
      const timeBonus = selectedGame === "right-wrong" ? Math.floor(timeLeft / 3) : 0
      setScore((prev) => prev + 10 + timeBonus)
      setStreak((prev) => {
        const newStreak = prev + 1
        if (newStreak > bestStreak) setBestStreak(newStreak)
        return newStreak
      })
    } else {
      setStreak(0)
    }

    setTimeout(() => {
      setShowFeedback(false)
      if (currentScenarioIndex < gameScenarios.length - 1) {
        setCurrentScenarioIndex((prev) => prev + 1)
        setTimeLeft(30)
      } else {
        setGameState("result")
      }
    }, 2000)
  }

  const resetGame = () => {
    setSelectedGame(null)
    setGameState("menu")
    setCurrentScenarioIndex(0)
    setScore(0)
    setStreak(0)
    setAnswers([])
    setTimeLeft(30)
  }

  const currentScenario = gameScenarios[currentScenarioIndex]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Game Menu */}
        {gameState === "menu" && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-accent/10 mb-6">
                <Gamepad2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Constitutional Games
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Learn constitutional rights through fun and interactive games.
                Test your knowledge while having fun!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scenario Challenge Game */}
              <Card
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onClick={() => startGame("scenario-challenge")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <Badge className="bg-success/10 text-success">Popular</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">
                    Scenario Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Read real-life scenarios and determine if constitutional
                    rights are being violated. Answer MCQs to test your
                    understanding.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />6 Scenarios
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      Earn Points
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Right vs Wrong Game */}
              <Card
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onClick={() => startGame("right-wrong")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className="bg-warning/10 text-warning">
                      <Timer className="h-3 w-3 mr-1" />
                      Timed
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">Valid or Violation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Fast-paced game! Quickly decide if a scenario is a valid
                    right or a constitutional violation. Beat the clock!
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      30s Timer
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      Streak Bonus
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Scenario Challenge Game */}
        {gameState === "playing" &&
          selectedGame === "scenario-challenge" &&
          currentScenario && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Scenario {currentScenarioIndex + 1} of {gameScenarios.length}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Zap className="h-4 w-4 text-accent" />
                      Streak: {streak}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      Score: {score}
                    </span>
                  </div>
                </div>
                <Progress
                  value={((currentScenarioIndex + 1) / gameScenarios.length) * 100}
                  className="h-2"
                />
              </div>

              {/* Scenario Card */}
              <Card className="mb-6">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {currentScenario.articleReference}
                  </Badge>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentScenario.description}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    Is this a valid exercise of rights or a constitutional
                    violation?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      size="lg"
                      onClick={() => handleAnswer(false)}
                      disabled={showFeedback}
                      className={cn(
                        "h-20 rounded-xl text-lg font-semibold transition-all",
                        showFeedback && !currentScenario.isViolation
                          ? "bg-success hover:bg-success text-success-foreground"
                          : showFeedback && currentScenario.isViolation
                          ? "bg-muted text-muted-foreground"
                          : "bg-success/10 hover:bg-success/20 text-success border-2 border-success/30"
                      )}
                    >
                      <CheckCircle2 className="mr-2 h-6 w-6" />
                      Valid Right
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => handleAnswer(true)}
                      disabled={showFeedback}
                      className={cn(
                        "h-20 rounded-xl text-lg font-semibold transition-all",
                        showFeedback && currentScenario.isViolation
                          ? "bg-destructive hover:bg-destructive text-destructive-foreground"
                          : showFeedback && !currentScenario.isViolation
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/10 hover:bg-destructive/20 text-destructive border-2 border-destructive/30"
                      )}
                    >
                      <XCircle className="mr-2 h-6 w-6" />
                      Violation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              {showFeedback && (
                <Card
                  className={cn(
                    "animate-scale-in",
                    lastAnswerCorrect
                      ? "border-success/50 bg-success/5"
                      : "border-destructive/50 bg-destructive/5"
                  )}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {lastAnswerCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive shrink-0" />
                      )}
                      <div>
                        <p
                          className={cn(
                            "font-semibold mb-1",
                            lastAnswerCorrect ? "text-success" : "text-destructive"
                          )}
                        >
                          {lastAnswerCorrect ? "Correct!" : "Incorrect!"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentScenario.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

        {/* Right vs Wrong Game */}
        {gameState === "playing" &&
          selectedGame === "right-wrong" &&
          currentScenario && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              {/* Timer and Score */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Timer
                      className={cn(
                        "h-5 w-5",
                        timeLeft <= 10 ? "text-destructive" : "text-accent"
                      )}
                    />
                    <span
                      className={cn(
                        "text-2xl font-bold",
                        timeLeft <= 10 ? "text-destructive" : "text-foreground"
                      )}
                    >
                      {timeLeft}s
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Zap className="h-4 w-4 text-accent" />
                      Streak: {streak}
                    </span>
                    <Badge className="text-lg px-4 py-1 bg-accent/10 text-accent">
                      {score} pts
                    </Badge>
                  </div>
                </div>
                <Progress value={(timeLeft / 30) * 100} className="h-2" />
              </div>

              {/* Scenario */}
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl leading-relaxed">
                    {currentScenario.description}
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Large Buttons */}
              <div className="grid grid-cols-2 gap-6">
                <Button
                  size="lg"
                  onClick={() => handleAnswer(false)}
                  disabled={showFeedback}
                  className={cn(
                    "h-32 rounded-2xl text-xl font-bold transition-all duration-200",
                    showFeedback && !currentScenario.isViolation
                      ? "bg-success hover:bg-success text-success-foreground scale-105"
                      : showFeedback
                      ? "bg-muted text-muted-foreground scale-95 opacity-50"
                      : "bg-success hover:bg-success/90 text-success-foreground hover:scale-105"
                  )}
                >
                  <Shield className="mr-3 h-8 w-8" />
                  VALID
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleAnswer(true)}
                  disabled={showFeedback}
                  className={cn(
                    "h-32 rounded-2xl text-xl font-bold transition-all duration-200",
                    showFeedback && currentScenario.isViolation
                      ? "bg-destructive hover:bg-destructive text-destructive-foreground scale-105"
                      : showFeedback
                      ? "bg-muted text-muted-foreground scale-95 opacity-50"
                      : "bg-destructive hover:bg-destructive/90 text-destructive-foreground hover:scale-105"
                  )}
                >
                  <AlertTriangle className="mr-3 h-8 w-8" />
                  VIOLATION
                </Button>
              </div>

              {/* Quick Feedback */}
              {showFeedback && (
                <div
                  className={cn(
                    "mt-6 text-center p-4 rounded-xl animate-scale-in",
                    lastAnswerCorrect ? "bg-success/10" : "bg-destructive/10"
                  )}
                >
                  <p
                    className={cn(
                      "font-bold text-lg",
                      lastAnswerCorrect ? "text-success" : "text-destructive"
                    )}
                  >
                    {lastAnswerCorrect ? "+10 Points!" : "Wrong!"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentScenario.articleReference}
                  </p>
                </div>
              )}
            </div>
          )}

        {/* Results */}
        {gameState === "result" && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-accent/10 mb-6">
              <Trophy className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Game Over!
            </h1>
            <p className="text-muted-foreground mb-8">
              {selectedGame === "right-wrong"
                ? "Great reflexes! Here are your results."
                : "Well played! Here's how you did."}
            </p>

            {/* Stats */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-accent/10">
                    <p className="text-4xl font-bold text-accent">{score}</p>
                    <p className="text-sm text-muted-foreground">Total Score</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-success/10">
                    <p className="text-4xl font-bold text-success">
                      {answers.filter(Boolean).length}/{gameScenarios.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-warning/10">
                    <p className="text-4xl font-bold text-warning">{bestStreak}</p>
                    <p className="text-sm text-muted-foreground">Best Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={resetGame}
                variant="outline"
                className="rounded-xl"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Back to Games
              </Button>
              <Button
                onClick={() => startGame(selectedGame!)}
                className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Play Again
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
