"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
  Zap,
  HelpCircle,
  BookOpen,
} from "lucide-react"

interface Question {
  id: string
  scenario: string
  options: string[]
  correctAnswer: number
  explanation: string
  articleReference: string
  difficulty: "easy" | "medium" | "hard"
}

const difficultyConfig = {
  easy: { label: "Easy", color: "bg-success/10 text-success", points: 10 },
  medium: { label: "Medium", color: "bg-warning/10 text-warning", points: 20 },
  hard: { label: "Hard", color: "bg-destructive/10 text-destructive", points: 30 },
}

const questions: Question[] = [
  {
    id: "1",
    scenario:
      "A government hospital refuses to treat an accident victim because they don't have money for immediate payment. Which fundamental right is being violated?",
    options: [
      "Right to Equality (Article 14)",
      "Right to Life (Article 21)",
      "Right to Freedom of Religion (Article 25)",
      "Right against Exploitation (Article 23)",
    ],
    correctAnswer: 1,
    explanation:
      "Article 21 guarantees the right to life and personal liberty. The Supreme Court has interpreted this to include the right to emergency medical care. No one can be denied medical treatment in an emergency based on inability to pay.",
    articleReference: "Article 21",
    difficulty: "easy",
  },
  {
    id: "2",
    scenario:
      "A private company requires all employees to work on Sundays without compensatory leave or extra pay. An employee objects saying it violates their right to practice religion. Is their claim valid?",
    options: [
      "Yes, Article 25 guarantees freedom of religion absolutely",
      "No, fundamental rights don't apply to private employment",
      "Yes, but only if it affects religious practice essential to their faith",
      "No, employment is a contractual matter only",
    ],
    correctAnswer: 2,
    explanation:
      "While Article 25 guarantees freedom of religion, it is subject to reasonable restrictions. If Sunday attendance at religious service is an essential part of their religion and the job requirement prevents it, they may have a valid claim. However, general working conditions are typically covered under labor laws.",
    articleReference: "Article 25",
    difficulty: "hard",
  },
  {
    id: "3",
    scenario:
      "A student is expelled from a government college for participating in a peaceful protest against fee hike. Which article protects the student's right to protest?",
    options: [
      "Article 14 - Right to Equality",
      "Article 19(1)(a) - Freedom of Speech",
      "Article 19(1)(b) - Right to Assemble Peacefully",
      "Article 21A - Right to Education",
    ],
    correctAnswer: 2,
    explanation:
      "Article 19(1)(b) guarantees citizens the right to assemble peaceably and without arms. Peaceful protests are protected under this article, though reasonable restrictions can be imposed in the interest of public order.",
    articleReference: "Article 19(1)(b)",
    difficulty: "easy",
  },
  {
    id: "4",
    scenario:
      "A person is detained by police for questioning. After 30 hours, they still haven't been produced before a magistrate. What is the maximum time allowed before production?",
    options: [
      "12 hours",
      "24 hours",
      "48 hours",
      "72 hours",
    ],
    correctAnswer: 1,
    explanation:
      "Article 22(2) mandates that every person arrested and detained must be produced before the nearest magistrate within a period of 24 hours (excluding travel time). Detention beyond this without magistrate's order is illegal.",
    articleReference: "Article 22(2)",
    difficulty: "medium",
  },
  {
    id: "5",
    scenario:
      "A minority educational institution wants to admit students from their community exclusively. Can they do so under the Constitution?",
    options: [
      "No, it violates Article 14",
      "Yes, Article 30 gives minorities the right to establish and administer educational institutions",
      "Only if government approves",
      "Only for religious education",
    ],
    correctAnswer: 1,
    explanation:
      "Article 30(1) gives minorities the right to establish and administer educational institutions of their choice. This includes the right to admit students from their own community, though they must follow reasonable regulations for standards.",
    articleReference: "Article 30",
    difficulty: "medium",
  },
  {
    id: "6",
    scenario:
      "Parliament passes a law that the Supreme Court declares unconstitutional. Can Parliament amend the Constitution to validate this law?",
    options: [
      "Yes, Parliament has unlimited power to amend",
      "No, once struck down, a law cannot be revived",
      "Yes, but only if it doesn't violate the basic structure doctrine",
      "Only with President's approval",
    ],
    correctAnswer: 2,
    explanation:
      "While Parliament can amend the Constitution under Article 368, the Supreme Court in Kesavananda Bharati case (1973) established that amendments cannot destroy the 'basic structure' of the Constitution. Any amendment violating basic structure can be struck down.",
    articleReference: "Article 368",
    difficulty: "hard",
  },
]

type QuizState = "intro" | "playing" | "result"
type Difficulty = "all" | "easy" | "medium" | "hard"

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("all")

  const filteredQuestions =
    selectedDifficulty === "all"
      ? questions
      : questions.filter((q) => q.difficulty === selectedDifficulty)

  const currentQuestion = filteredQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100

  const startQuiz = () => {
    setQuizState("playing")
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerRevealed(false)
    setScore(0)
    setAnswers([])
  }

  const handleAnswerSelect = (index: number) => {
    if (isAnswerRevealed) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setIsAnswerRevealed(true)
    setAnswers([...answers, selectedAnswer])

    if (selectedAnswer === currentQuestion.correctAnswer) {
      const points = difficultyConfig[currentQuestion.difficulty].points
      setScore((prev) => prev + points)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerRevealed(false)
    } else {
      setQuizState("result")
    }
  }

  const getCorrectAnswersCount = () => {
    return answers.filter(
      (answer, index) => answer === filteredQuestions[index].correctAnswer
    ).length
  }

  const resetQuiz = () => {
    setQuizState("intro")
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerRevealed(false)
    setScore(0)
    setAnswers([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Intro State */}
        {quizState === "intro" && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-accent/10 mb-6">
              <HelpCircle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Constitutional Quiz
            </h1>
            <p className="text-muted-foreground mb-8">
              Test your knowledge of the Indian Constitution with scenario-based
              questions. Learn as you go with detailed explanations.
            </p>

            {/* Difficulty Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Select Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-3">
                  {(["all", "easy", "medium", "hard"] as Difficulty[]).map(
                    (diff) => {
                      const isSelected = selectedDifficulty === diff
                      const config =
                        diff === "all"
                          ? { label: "All Levels", color: "bg-muted text-muted-foreground" }
                          : difficultyConfig[diff]
                      return (
                        <Button
                          key={diff}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={cn(
                            "rounded-xl",
                            isSelected && "bg-accent hover:bg-accent/90 text-accent-foreground"
                          )}
                        >
                          {config.label}
                        </Button>
                      )
                    }
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {filteredQuestions.length} questions available
                </p>
              </CardContent>
            </Card>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-card border border-border/50 p-4">
                <Target className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {filteredQuestions.length}
                </p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="rounded-xl bg-card border border-border/50 p-4">
                <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {filteredQuestions.reduce(
                    (acc, q) => acc + difficultyConfig[q.difficulty].points,
                    0
                  )}
                </p>
                <p className="text-xs text-muted-foreground">Max Points</p>
              </div>
              <div className="rounded-xl bg-card border border-border/50 p-4">
                <Trophy className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">Learn</p>
                <p className="text-xs text-muted-foreground">& Grow</p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={startQuiz}
              className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Playing State */}
        {quizState === "playing" && currentQuestion && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Score: {score}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <Badge
                    className={cn(
                      "shrink-0",
                      difficultyConfig[currentQuestion.difficulty].color
                    )}
                  >
                    {difficultyConfig[currentQuestion.difficulty].label} (+
                    {difficultyConfig[currentQuestion.difficulty].points} pts)
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-relaxed mt-4">
                  {currentQuestion.scenario}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrect = index === currentQuestion.correctAnswer
                  const showCorrect = isAnswerRevealed && isCorrect
                  const showWrong = isAnswerRevealed && isSelected && !isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswerRevealed}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
                        !isAnswerRevealed && "hover:border-accent/50 hover:bg-accent/5",
                        isSelected && !isAnswerRevealed && "border-accent bg-accent/10",
                        !isSelected && !isAnswerRevealed && "border-border/50 bg-card",
                        showCorrect && "border-success bg-success/10",
                        showWrong && "border-destructive bg-destructive/10"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                          isSelected && !isAnswerRevealed && "border-accent bg-accent text-accent-foreground",
                          !isSelected && !isAnswerRevealed && "border-border",
                          showCorrect && "border-success bg-success text-success-foreground",
                          showWrong && "border-destructive bg-destructive text-destructive-foreground"
                        )}
                      >
                        {showCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : showWrong ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-foreground",
                          showCorrect && "text-success",
                          showWrong && "text-destructive"
                        )}
                      >
                        {option}
                      </span>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Explanation (shown after answer) */}
            {isAnswerRevealed && (
              <Card className="mb-6 animate-scale-in border-accent/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Explanation ({currentQuestion.articleReference})
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {!isAnswerRevealed ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {currentQuestionIndex < filteredQuestions.length - 1
                    ? "Next Question"
                    : "View Results"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Result State */}
        {quizState === "result" && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-accent/10 mb-6">
              <Trophy className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Quiz Complete!
            </h1>
            <p className="text-muted-foreground mb-8">
              Great effort! Here&apos;s how you performed.
            </p>

            {/* Score Card */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-accent/10">
                    <p className="text-4xl font-bold text-accent">{score}</p>
                    <p className="text-sm text-muted-foreground">Points Scored</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-success/10">
                    <p className="text-4xl font-bold text-success">
                      {getCorrectAnswersCount()}/{filteredQuestions.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                </div>

                {/* Accuracy */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(
                        (getCorrectAnswersCount() / filteredQuestions.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (getCorrectAnswersCount() / filteredQuestions.length) * 100
                    }
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance Message */}
            <div className="rounded-xl bg-muted/50 p-6 mb-8">
              {getCorrectAnswersCount() === filteredQuestions.length ? (
                <p className="text-foreground">
                  Perfect score! You have an excellent understanding of constitutional rights.
                </p>
              ) : getCorrectAnswersCount() >= filteredQuestions.length * 0.7 ? (
                <p className="text-foreground">
                  Great job! You have a good grasp of constitutional concepts. Review the explanations for questions you missed.
                </p>
              ) : (
                <p className="text-foreground">
                  Good attempt! Consider exploring the Constitution Explorer to strengthen your understanding.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="rounded-xl"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={startQuiz}
                className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                New Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
