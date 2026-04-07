"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "../../context/language-context"
import { useAccessibility } from "../../context/accessibility-context"
import { cn } from "@/lib/utils"
import {
  Scale,
  BookOpen,
  Shield,
  Target,
  FileText,
  Sparkles,
  ChevronRight,
  Search,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "all",
    labelKey: "explore.filter.all",
    icon: BookOpen,
    count: 448,
    color: "bg-muted text-muted-foreground",
  },
  {
    id: "fundamental-rights",
    labelKey: "explore.filter.part3",
    icon: Shield,
    count: 23,
    color: "bg-success/10 text-success",
  },
  {
    id: "dpsp",
    labelKey: "explore.filter.part4",
    icon: Target,
    count: 18,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: "amendments",
    labelKey: "explore.filter.amendments",
    icon: FileText,
    count: 105,
    color: "bg-primary/10 text-primary",
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
    id: "22",
    number: "22",
    title: "Protection against arrest and detention",
    category: "fundamental-rights",
    shortDescription:
      "Provides safeguards against arbitrary arrest and detention, including the right to be informed of grounds of arrest and the right to consult a legal practitioner.",
    fullExplanation:
      "Article 22 provides protection against arbitrary arrest and detention. It guarantees that an arrested person must be informed of the grounds of arrest, has the right to consult and be defended by a legal practitioner, and must be produced before a magistrate within 24 hours.",
    simpleExplanation:
      "If you are arrested, the police must tell you why, allow you to see a lawyer, and bring you to court within 24 hours.",
    example:
      "If police arrest someone and keep them in custody for 3 days without producing them before a magistrate, it violates Article 22.",
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
  const { t } = useLanguage()
  const { simpleMode, setSimpleMode } = useAccessibility()
  const [selectedCategory, setSelectedCategory] = useState("all")
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

      <main className="pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 page-enter">
            <h1 className="heading-display text-3xl sm:text-4xl text-foreground mb-2">
              {t('explore.title')}
            </h1>
            <p className="text-muted-foreground">
              Browse articles, fundamental rights, and constitutional provisions
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('explore.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 rounded-2xl border-2 border-border bg-card text-base input-focus"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(category.labelKey as keyof typeof t)}
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-1 text-xs",
                      isSelected ? "bg-primary-foreground/20 text-primary-foreground" : ""
                    )}
                  >
                    {category.count}
                  </Badge>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Simple Mode Toggle */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <Card className="rounded-2xl border-2 border-border sticky top-24">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="simple-mode" className="font-medium text-sm">
                        {t('explore.simple')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Easy to understand explanations
                      </p>
                    </div>
                    <Switch
                      id="simple-mode"
                      checked={simpleMode}
                      onCheckedChange={setSimpleMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Article Detail View */}
              {currentArticle ? (
                <Card className="rounded-2xl border-2 border-border animate-scale-in">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedArticle(null)}
                          className="mb-3 -ml-2 rounded-xl"
                        >
                          <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                          {t('common.back')}
                        </Button>
                        <Badge className="mb-3 bg-primary/10 text-primary border-0 text-base px-3 py-1">
                          Article {currentArticle.number}
                        </Badge>
                        <CardTitle className="heading-display text-2xl">
                          {currentArticle.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Constitutional Text */}
                    <div className="constitutional-border rounded-xl p-6 bg-muted/30">
                      <p className="text-legal text-foreground leading-relaxed">
                        &ldquo;{currentArticle.shortDescription}&rdquo;
                      </p>
                    </div>

                    {/* Explanation */}
                    <div className="rounded-xl bg-card border-2 border-border p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-secondary" />
                        <h3 className="heading-ui text-sm font-semibold text-foreground">
                          {simpleMode ? t('explore.simple') : 'Detailed Explanation'}
                        </h3>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {simpleMode
                          ? currentArticle.simpleExplanation
                          : currentArticle.fullExplanation}
                      </p>
                    </div>

                    {/* Example */}
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Scale className="h-5 w-5 text-primary" />
                        <h3 className="heading-ui text-sm font-semibold text-foreground">
                          {t('explore.example')}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentArticle.example}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button asChild className="rounded-xl bg-primary hover:bg-primary/90">
                        <Link href={`/analyze?article=${currentArticle.number}`}>
                          {t('explore.analyze')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href="/case-studies">
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Related Cases
                        </Link>
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
                        className="border-2 border-border rounded-2xl px-4 bg-card data-[state=open]:bg-primary/5 data-[state=open]:border-primary/30"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-4 text-left">
                            <Badge
                              className="shrink-0 bg-primary text-primary-foreground border-0 font-semibold"
                            >
                              {article.number}
                            </Badge>
                            <div>
                              <p className="font-medium text-foreground">
                                {article.title}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                {article.shortDescription}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="pl-[52px] space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {simpleMode
                                ? article.simpleExplanation
                                : article.shortDescription}
                            </p>
                            <Button
                              size="sm"
                              onClick={() => setSelectedArticle(article.id)}
                              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              {t('explore.readmore')}
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
        </div>
      </main>

      {/* Bottom padding for mobile nav */}
      <div className="h-16 lg:hidden" />
    </div>
  )
}
