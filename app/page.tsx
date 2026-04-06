import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import {
  Search,
  BookOpen,
  Briefcase,
  HelpCircle,
  Gamepad2,
  ArrowRight,
  Scale,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Analyze Situation",
    description:
      "Get instant analysis of your legal situation with AI-powered decision engine",
    href: "/analyze",
    icon: Search,
    variant: "primary" as const,
  },
  {
    title: "Explore Constitution",
    description:
      "Browse through articles, fundamental rights, and constitutional provisions",
    href: "/explore",
    icon: BookOpen,
    variant: "default" as const,
  },
  {
    title: "Case Studies",
    description:
      "Learn from real-world scenarios and landmark constitutional cases",
    href: "/case-studies",
    icon: Briefcase,
    variant: "default" as const,
  },
  {
    title: "Quiz & Learning",
    description:
      "Test your knowledge with interactive quizzes and track your progress",
    href: "/quiz",
    icon: HelpCircle,
    variant: "default" as const,
  },
  {
    title: "Games",
    description:
      "Make learning fun with interactive games about constitutional rights",
    href: "/games",
    icon: Gamepad2,
    variant: "default" as const,
  },
]

const stats = [
  { label: "Articles Covered", value: "448", icon: BookOpen },
  { label: "Case Studies", value: "100+", icon: Briefcase },
  { label: "Active Users", value: "10K+", icon: Users },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-success/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-4 py-2 text-sm text-muted-foreground mb-8">
              <Scale className="h-4 w-4 text-accent" />
              <span>AI-Powered Constitutional Assistant</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Know Your Rights.{" "}
              <span className="text-accent">Apply Them.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Your intelligent guide to understanding the Indian Constitution.
              Analyze situations, learn your rights, and make informed decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link href="/analyze">
                  Analyze Situation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 rounded-xl border-border/50 hover:bg-secondary"
              >
                <Link href="/explore">Explore Constitution</Link>
              </Button>
            </div>

            {/* Search Bar */}
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex items-center justify-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools to understand, learn, and apply constitutional
              knowledge in your daily life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get answers to your constitutional questions in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Describe Your Situation",
                description:
                  "Select the context and describe the issue you are facing",
                icon: Search,
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our engine maps your situation to relevant articles and rights",
                icon: Scale,
              },
              {
                step: "03",
                title: "Get Guidance",
                description:
                  "Receive simplified explanations and actionable insights",
                icon: Shield,
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="relative text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
                  )}
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-card border border-border/50">
                    <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {item.step}
                    </span>
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-48 w-48 rounded-full bg-success/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Ready to understand your constitutional rights?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Start analyzing your situation now and get AI-powered guidance
                based on the Indian Constitution.
              </p>
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/analyze">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-accent" />
              <span className="font-semibold">Samvidhan Saathi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering citizens with constitutional knowledge
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
