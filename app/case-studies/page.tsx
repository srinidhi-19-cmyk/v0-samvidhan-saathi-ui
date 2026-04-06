"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Scale,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  GraduationCap,
  Building2,
  Shield,
  Landmark,
} from "lucide-react"

type VerdictType = "valid" | "violation" | "depends"

interface CaseStudy {
  id: string
  title: string
  scenario: string
  category: string
  articleNumber: string
  articleTitle: string
  verdict: VerdictType
  explanation: string
  keyTakeaways: string[]
}

const categories = [
  { id: "all", label: "All Cases", icon: BookOpen },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "workplace", label: "Workplace", icon: Building2 },
  { id: "police", label: "Police", icon: Shield },
  { id: "government", label: "Government", icon: Landmark },
]

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "College Denies Admission Based on Caste",
    scenario:
      "Priya, a meritorious student from a scheduled caste, was denied admission to a private engineering college despite having higher marks than the cutoff. The college cited 'lack of seats' but admitted students with lower marks from general category.",
    category: "education",
    articleNumber: "15",
    articleTitle: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
    verdict: "violation",
    explanation:
      "This is a clear violation of Article 15 which prohibits discrimination based on caste. Private educational institutions receiving government aid are also bound by this provision. The student can file a complaint with the State Human Rights Commission and seek legal remedy.",
    keyTakeaways: [
      "Article 15 applies to both government and aided private institutions",
      "Discrimination based on caste is a punishable offense",
      "Students can approach Human Rights Commission for remedy",
      "Documentary evidence of discrimination strengthens the case",
    ],
  },
  {
    id: "2",
    title: "Employee Fired for Social Media Post",
    scenario:
      "Rahul, an IT professional, was terminated from his job after he posted criticism of his company's environmental practices on social media. The company claimed it violated their social media policy and damaged reputation.",
    category: "workplace",
    articleNumber: "19(1)(a)",
    articleTitle: "Right to Freedom of Speech and Expression",
    verdict: "depends",
    explanation:
      "While Article 19(1)(a) protects freedom of speech, reasonable restrictions can be imposed in the interest of public order or to protect reputation. The outcome depends on whether the criticism was factual, defamatory, or disclosed confidential information. Employment contracts may have valid clauses limiting certain speech.",
    keyTakeaways: [
      "Freedom of speech is not absolute in employment context",
      "Factual criticism is more protected than false statements",
      "Employment contracts can impose reasonable restrictions",
      "Whistleblowing about illegal activities may be protected",
    ],
  },
  {
    id: "3",
    title: "Police Detention Without Informing Reasons",
    scenario:
      "Amit was picked up by police from his home late at night. He was kept at the police station for questioning for 36 hours without being informed of the grounds for his detention or being allowed to contact a lawyer.",
    category: "police",
    articleNumber: "22",
    articleTitle: "Protection against arrest and detention in certain cases",
    verdict: "violation",
    explanation:
      "This is a serious violation of Article 22 which mandates that every person arrested must be informed of the grounds of arrest, must be produced before a magistrate within 24 hours, and has the right to consult a lawyer. The detention beyond 24 hours without magistrate's order is illegal.",
    keyTakeaways: [
      "Arrested person must be told reasons for arrest immediately",
      "Right to consult lawyer is fundamental and cannot be denied",
      "Must be produced before magistrate within 24 hours",
      "Illegal detention can lead to compensation and departmental action",
    ],
  },
  {
    id: "4",
    title: "Government Office Denies Service Based on Religion",
    scenario:
      "Mohammed visited a government passport office to apply for a passport. The officer refused to process his application and asked him to 'come back tomorrow' multiple times while processing applications of others who came after him.",
    category: "government",
    articleNumber: "14",
    articleTitle: "Right to Equality before Law",
    verdict: "violation",
    explanation:
      "This constitutes a violation of Article 14 which guarantees equality before law and equal protection of laws. Government officials cannot discriminate in providing public services. The citizen can file a complaint with the grievance redressal mechanism and the officer can face departmental inquiry.",
    keyTakeaways: [
      "Government services must be provided without discrimination",
      "Video or written evidence can help prove discrimination",
      "Grievance portals like CPGRAMS can be used for complaints",
      "RTI can be filed to get information about processing timelines",
    ],
  },
  {
    id: "5",
    title: "School Forces Religious Practice on Students",
    scenario:
      "A government school mandated that all students, regardless of their religion, must participate in prayers of a specific religion during morning assembly. Parents of minority community students objected to this practice.",
    category: "education",
    articleNumber: "28",
    articleTitle: "Freedom from attendance at religious instruction",
    verdict: "violation",
    explanation:
      "Article 28 prohibits religious instruction in state-funded educational institutions. No student can be compelled to participate in religious activities against their will or the will of their guardians. The school must make such activities optional or remove them entirely.",
    keyTakeaways: [
      "Government schools cannot mandate religious practices",
      "Parents have right to withdraw children from religious instruction",
      "Cultural activities are different from religious instruction",
      "Private unaided institutions have more flexibility in this matter",
    ],
  },
  {
    id: "6",
    title: "Woman Denied Property Rights by Family",
    scenario:
      "After her father's death, Sunita was told by her brothers that she has no right to ancestral property because she is married. They cited 'family tradition' and threatened her if she pursued legal action.",
    category: "government",
    articleNumber: "15(3)",
    articleTitle: "Special provisions for women and children",
    verdict: "valid",
    explanation:
      "Sunita's claim is valid. After the Hindu Succession (Amendment) Act, 2005, daughters have equal rights to ancestral property as sons. Article 15(3) empowers the State to make special provisions for women. The threats constitute criminal intimidation and she should file a police complaint along with civil suit for partition.",
    keyTakeaways: [
      "Daughters have equal rights to ancestral property since 2005",
      "Married or unmarried status doesn't affect property rights",
      "Threats for claiming rights is a criminal offense",
      "Free legal aid is available for women in property disputes",
    ],
  },
]

const verdictConfig = {
  valid: {
    icon: CheckCircle2,
    label: "Rights Protected",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    textColor: "text-success",
  },
  violation: {
    icon: XCircle,
    label: "Rights Violated",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    textColor: "text-destructive",
  },
  depends: {
    icon: AlertCircle,
    label: "Context Dependent",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    textColor: "text-warning",
  },
}

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)

  const filteredCases = caseStudies.filter((study) => {
    const matchesCategory =
      selectedCategory === "all" || study.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.scenario.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Case Studies
          </h1>
          <p className="text-muted-foreground">
            Learn from real-world scenarios and understand how constitutional
            rights apply
          </p>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-8">
          <SearchBar
            placeholder="Search case studies..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "rounded-xl",
                  isSelected && "bg-accent hover:bg-accent/90 text-accent-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        {selectedCase ? (
          /* Case Detail View */
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <Button
              variant="ghost"
              onClick={() => setSelectedCase(null)}
              className="mb-6 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all cases
            </Button>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {categories.find((c) => c.id === selectedCase.category)?.label}
                    </Badge>
                    <CardTitle className="text-2xl">{selectedCase.title}</CardTitle>
                  </div>
                  {(() => {
                    const config = verdictConfig[selectedCase.verdict]
                    const VerdictIcon = config.icon
                    return (
                      <div
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl border",
                          config.bgColor,
                          config.borderColor
                        )}
                      >
                        <VerdictIcon className={cn("h-5 w-5", config.textColor)} />
                        <span className={cn("font-medium", config.textColor)}>
                          {config.label}
                        </span>
                      </div>
                    )
                  })()}
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Scenario */}
                <div className="rounded-xl bg-muted/50 p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    Scenario
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {selectedCase.scenario}
                  </p>
                </div>

                {/* Article Applied */}
                <div className="rounded-xl border border-border/50 p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-accent" />
                    Constitutional Article Applied
                  </h3>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                      Article {selectedCase.articleNumber}
                    </Badge>
                    <span className="text-foreground font-medium">
                      {selectedCase.articleTitle}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Analysis & Explanation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.explanation}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="rounded-xl bg-accent/5 border border-accent/20 p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {selectedCase.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="rounded-xl">
                    <Scale className="mr-2 h-4 w-4" />
                    Analyze Similar Situation
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Article {selectedCase.articleNumber}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Case List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((study, index) => {
              const config = verdictConfig[study.verdict]
              const VerdictIcon = config.icon
              return (
                <Card
                  key={study.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedCase(study)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="outline" className="text-xs">
                        {categories.find((c) => c.id === study.category)?.label}
                      </Badge>
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                          config.bgColor
                        )}
                      >
                        <VerdictIcon className={cn("h-3 w-3", config.textColor)} />
                        <span className={config.textColor}>{config.label}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2 line-clamp-2">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {study.scenario}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-accent"
                      >
                        Article {study.articleNumber}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent group-hover:bg-accent/10"
                      >
                        Read more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {filteredCases.length === 0 && !selectedCase && (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No case studies found matching your criteria
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
