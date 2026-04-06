"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import {
  Scale,
  BookOpen,
  Shield,
  Target,
  FileText,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react"

const categories = [
  {
    id: "fundamental-rights",
    label: "Fundamental Rights",
    icon: Shield,
    count: 23,
    color: "bg-success/10 text-success",
  },
  {
    id: "dpsp",
    label: "Directive Principles",
    icon: Target,
    count: 18,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "amendments",
    label: "Amendments",
    icon: FileText,
    count: 105,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "all",
    label: "All Articles",
    icon: BookOpen,
    count: 448,
    color: "bg-muted text-muted-foreground",
  },
]

const articles = [
  {
    id: "14",
    number: "14",
    title: "Right to Equality",
    category: "fundamental-rights",
    shortDescription:
      "Equality before law - The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    fullExplanation:
      "Article 14 guarantees that every person, whether citizen or non-citizen, is entitled to equal treatment before the law. This means the State cannot discriminate between individuals based on arbitrary distinctions. However, reasonable classification is permitted if it is based on intelligible differentia and has a rational nexus to the objective sought to be achieved.",
    simpleExplanation:
      "Everyone must be treated equally by the law. The government cannot favor some people over others without a good reason.",
    example:
      "If a company refuses to hire someone solely because of their religion, this would violate Article 14 as it constitutes arbitrary discrimination.",
  },
  {
    id: "19",
    number: "19",
    title: "Protection of certain rights regarding freedom of speech",
    category: "fundamental-rights",
    shortDescription:
      "All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely, to reside and settle, and to practice any profession.",
    fullExplanation:
      "Article 19 provides six fundamental freedoms to citizens of India. These rights are subject to reasonable restrictions in the interest of sovereignty, security, public order, decency, morality, and other specified grounds under Article 19(2) to 19(6).",
    simpleExplanation:
      "You have the freedom to speak your mind, meet with others, start groups, travel anywhere in India, live where you want, and choose your job.",
    example:
      "A journalist writing about government corruption is protected under Article 19(1)(a), unless the content threatens national security.",
  },
  {
    id: "21",
    number: "21",
    title: "Protection of life and personal liberty",
    category: "fundamental-rights",
    shortDescription:
      "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    fullExplanation:
      "Article 21 is considered the heart of fundamental rights. Through judicial interpretation, it now includes the right to live with dignity, right to livelihood, right to privacy, right to clean environment, right to speedy trial, and many more. It applies to both citizens and non-citizens.",
    simpleExplanation:
      "The government cannot take away your life or freedom without following proper legal procedures. This also includes your right to live with dignity.",
    example:
      "Keeping someone in jail for years without trial would violate Article 21's guarantee of speedy justice.",
  },
  {
    id: "21A",
    number: "21A",
    title: "Right to Education",
    category: "fundamental-rights",
    shortDescription:
      "The State shall provide free and compulsory education to all children of the age of six to fourteen years.",
    fullExplanation:
      "Added by the 86th Constitutional Amendment Act, 2002, this article makes education a fundamental right. The Right of Children to Free and Compulsory Education Act, 2009, provides the framework for implementing this right.",
    simpleExplanation:
      "Every child between 6 and 14 years old has the right to free education from the government.",
    example:
      "A government school cannot deny admission to a child based on their family's income level.",
  },
  {
    id: "32",
    number: "32",
    title: "Remedies for enforcement of fundamental rights",
    category: "fundamental-rights",
    shortDescription:
      "The right to move the Supreme Court for the enforcement of fundamental rights is guaranteed.",
    fullExplanation:
      "Article 32 provides the right to directly approach the Supreme Court if fundamental rights are violated. Dr. B.R. Ambedkar called it the very soul of the Constitution. The Supreme Court can issue writs including habeas corpus, mandamus, prohibition, quo warranto, and certiorari.",
    simpleExplanation:
      "If your fundamental rights are violated, you can directly go to the Supreme Court to seek justice.",
    example:
      "If someone is illegally detained, they or their family can file a habeas corpus petition under Article 32.",
  },
  {
    id: "38",
    number: "38",
    title: "State to secure a social order for the promotion of welfare",
    category: "dpsp",
    shortDescription:
      "The State shall strive to promote the welfare of the people by securing a social order with justice - social, economic and political.",
    fullExplanation:
      "This directive principle obligates the State to create conditions where citizens can enjoy justice in all its forms. While not enforceable in court, it guides government policy-making.",
    simpleExplanation:
      "The government should work towards creating a fair society where everyone has equal opportunities.",
    example:
      "Government programs providing subsidies for education and healthcare for underprivileged communities align with this directive.",
  },
  {
    id: "39",
    number: "39",
    title: "Certain principles of policy to be followed by the State",
    category: "dpsp",
    shortDescription:
      "The State shall direct its policy towards securing adequate means of livelihood, equal pay for equal work, and protection of children.",
    fullExplanation:
      "Article 39 outlines specific goals including ensuring citizens have adequate livelihood, preventing concentration of wealth, equal pay for equal work, and protecting children and youth from exploitation.",
    simpleExplanation:
      "The government should make sure everyone can earn a living, get fair pay, and children are protected from harmful work.",
    example:
      "Laws mandating minimum wages and prohibiting child labor are implementations of Article 39.",
  },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [simpleMode, setSimpleMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.number.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const currentArticle = selectedArticle
    ? articles.find((a) => a.id === selectedArticle)
    : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Explore the Constitution
          </h1>
          <p className="text-muted-foreground">
            Browse articles, fundamental rights, and constitutional provisions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar
            placeholder="Search articles by number or title..."
            onSearch={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
              <Filter className="h-4 w-4" />
              Categories
            </div>

            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isSelected = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      isSelected
                        ? "bg-accent/10 border-2 border-accent"
                        : "bg-card border-2 border-transparent hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        category.color
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isSelected ? "text-accent" : "text-foreground"
                        )}
                      >
                        {category.label}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                )
              })}
            </div>

            {/* Simple Mode Toggle */}
            <Card className="mt-6">
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <Label htmlFor="simple-mode" className="font-medium text-sm">
                    Simple Language
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Easy to understand
                  </p>
                </div>
                <Switch
                  id="simple-mode"
                  checked={simpleMode}
                  onCheckedChange={setSimpleMode}
                />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Detail View */}
            {currentArticle ? (
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedArticle(null)}
                        className="mb-2 -ml-2"
                      >
                        <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                        Back to list
                      </Button>
                      <Badge className="mb-2 bg-accent/10 text-accent hover:bg-accent/20">
                        Article {currentArticle.number}
                      </Badge>
                      <CardTitle className="text-2xl">
                        {currentArticle.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <span className="text-xs text-muted-foreground">
                        AI Simplified
                      </span>
                      <Switch
                        checked={simpleMode}
                        onCheckedChange={setSimpleMode}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Explanation */}
                  <div className="rounded-xl bg-muted/50 p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      {simpleMode ? "Simple Explanation" : "Detailed Explanation"}
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      {simpleMode
                        ? currentArticle.simpleExplanation
                        : currentArticle.fullExplanation}
                    </p>
                  </div>

                  {/* Example */}
                  <div className="rounded-xl border border-border/50 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="h-5 w-5 text-accent" />
                      <h3 className="text-sm font-semibold text-foreground">
                        Example Scenario
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentArticle.example}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-xl">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Related Cases
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ask AI a Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Article List */
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredArticles.length} articles
                  </p>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {filteredArticles.map((article, index) => (
                    <AccordionItem
                      key={article.id}
                      value={article.id}
                      className="border rounded-xl px-4 bg-card animate-fade-in-up data-[state=open]:bg-accent/5"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4 text-left">
                          <Badge
                            variant="outline"
                            className="shrink-0 bg-accent/10 text-accent border-accent/20"
                          >
                            {article.number}
                          </Badge>
                          <div>
                            <p className="font-medium text-foreground">
                              {article.title}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {article.shortDescription}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="pl-[60px] space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {simpleMode
                              ? article.simpleExplanation
                              : article.shortDescription}
                          </p>
                          <Button
                            size="sm"
                            onClick={() => setSelectedArticle(article.id)}
                            className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
                          >
                            Read Full Article
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
