"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"
import {
  Search,
  BookOpen,
  Briefcase,
  ArrowRight,
  Brain,
  Scale,
  MapPin,
  Shield,
  Megaphone,
  Users,
  Building,
  Mic,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Ashoka Chakra watermark component
function AshokaChakraWatermark() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] text-primary/[0.03] pointer-events-none"
      fill="currentColor"
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180
        const x1 = 50 + 12 * Math.cos(angle)
        const y1 = 50 + 12 * Math.sin(angle)
        const x2 = 50 + 44 * Math.cos(angle)
        const y2 = 50 + 44 * Math.sin(angle)
        return (
          <line 
            key={i} 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            stroke="currentColor" 
            strokeWidth="1"
          />
        )
      })}
    </svg>
  )
}

const domains = [
  { id: 'police', icon: Shield, color: 'bg-destructive/10 text-destructive' },
  { id: 'workplace', icon: Building, color: 'bg-primary/10 text-primary' },
  { id: 'speech', icon: Megaphone, color: 'bg-secondary/10 text-secondary' },
  { id: 'equality', icon: Users, color: 'bg-success/10 text-success' },
  { id: 'protest', icon: Megaphone, color: 'bg-warning/10 text-warning' },
  { id: 'govt', icon: Building, color: 'bg-primary/10 text-primary' },
]

export default function HomePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const features = [
    {
      title: t('features.intake.title'),
      description: t('features.intake.description'),
      icon: Brain,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: t('features.engine.title'),
      description: t('features.engine.description'),
      icon: Scale,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: t('features.explorer.title'),
      description: t('features.explorer.description'),
      icon: BookOpen,
      color: 'bg-success/10 text-success',
    },
    {
      title: t('features.pathfinder.title'),
      description: t('features.pathfinder.description'),
      icon: MapPin,
      color: 'bg-warning/10 text-warning',
    },
  ]

  const howItWorks = [
    { step: 1, title: t('how.step1.title'), description: t('how.step1.description') },
    { step: 2, title: t('how.step2.title'), description: t('how.step2.description') },
    { step: 3, title: t('how.step3.title'), description: t('how.step3.description') },
    { step: 4, title: t('how.step4.title'), description: t('how.step4.description') },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh noise-bg">
        <AshokaChakraWatermark />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="max-w-3xl mx-auto text-center page-enter">
            {/* Display Heading */}
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
              {t('hero.title')}
            </h1>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
              {t('hero.subtitle')}
            </h2>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 text-pretty">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-lift text-base font-medium"
              >
                <Link href="/analyze">
                  {t('hero.cta.analyze')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl border-2 border-border hover:bg-muted/50 text-base font-medium btn-lift"
              >
                <Link href="/explore">{t('hero.cta.explore')}</Link>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('explore.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-24 rounded-2xl border-2 border-border bg-card text-base input-focus shadow-sm"
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <Mic className="h-5 w-5" />
                    <span className="sr-only">{t('a11y.voiceInput')}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-background border border-border card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="heading-ui text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-4">
              {t('how.title')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={step.step} className="relative text-center">
                  {/* Step number */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-card border-2 border-border mb-6 mx-auto">
                    <span className="absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">
                      {step.step}
                    </span>
                    <span className="text-3xl font-bold text-primary">0{step.step}</span>
                  </div>
                  <h3 className="heading-ui text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl sm:text-4xl text-foreground mb-4">
              {t('domains.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {domains.map((domain) => {
              const Icon = domain.icon
              const domainKey = `domains.${domain.id}` as const
              return (
                <Link
                  key={domain.id}
                  href={`/analyze?domain=${domain.id}`}
                  className="group flex flex-col items-center p-6 rounded-2xl bg-background border border-border card-hover"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${domain.color} mb-3 transition-transform group-hover:scale-110`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">
                    {t(domainKey)}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Case Strip */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                scenario: "A citizen was detained without being informed of the grounds of arrest.",
                verdict: "VIOLATION",
                article: "Article 22(1)",
                color: "border-l-destructive",
              },
              {
                scenario: "A government employee was transferred as punishment for whistleblowing.",
                verdict: "VALID",
                article: "Article 19(1)(a)",
                color: "border-l-success",
              },
              {
                scenario: "A private company denied service based on caste.",
                verdict: "DEPENDS",
                article: "Article 15",
                color: "border-l-warning",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-card border-l-4 ${item.color} border border-border shadow-sm`}
              >
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  &ldquo;{item.scenario}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.verdict === 'VIOLATION' ? 'bg-destructive/10 text-destructive' :
                    item.verdict === 'VALID' ? 'bg-success/10 text-success' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {item.verdict}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.article}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-primary-foreground mb-4">
                Ready to understand your constitutional rights?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Start analyzing your situation now and get AI-powered guidance based on the Indian Constitution.
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground btn-lift"
              >
                <Link href="/analyze">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <div>
                <span className="heading-ui font-semibold text-foreground">Samvidhan Saathi</span>
                <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom padding for mobile nav */}
      <div className="h-16 lg:hidden" />
    </div>
  )
}
