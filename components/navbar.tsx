"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, Eye, Type, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useLanguage, type Language } from "@/context/language-context"
import { useAccessibility } from "@/context/accessibility-context"
import { cn } from "@/lib/utils"

// Ashoka Chakra SVG component
function AshokaChakra({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="currentColor"
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2"/>
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
            strokeWidth="1.5"
          />
        )
      })}
    </svg>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { simpleMode, setSimpleMode, largeText, setLargeText } = useAccessibility()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/analyze", label: t('nav.analyze') },
    { href: "/explore", label: t('nav.explore') },
    { href: "/case-studies", label: t('nav.cases') },
    { href: "/quiz", label: t('nav.quiz') },
    { href: "/games", label: t('nav.games') },
  ]

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'te', label: 'తెలుగు', short: 'తె' },
    { code: 'hi', label: 'हिंदी', short: 'हि' },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "glass shadow-md" 
            : "bg-background/80 backdrop-blur-sm"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <AshokaChakra className="w-8 h-8 text-primary transition-transform group-hover:rotate-[30deg] duration-500" />
              <span className="heading-ui text-lg font-semibold text-foreground hidden sm:block">
                Samvidhan Saathi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="hidden sm:flex items-center bg-muted rounded-full p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full transition-all",
                      language === lang.code
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {lang.short}
                  </button>
                ))}
              </div>

              {/* Accessibility Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Eye className="w-5 h-5" />
                    <span className="sr-only">Accessibility settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('a11y.simpleMode')}</span>
                      </div>
                      <Switch
                        checked={simpleMode}
                        onCheckedChange={setSimpleMode}
                      />
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('a11y.largeText')}</span>
                      </div>
                      <Switch
                        checked={largeText}
                        onCheckedChange={setLargeText}
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
                <User className="w-5 h-5" />
                <span className="sr-only">Profile</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <AshokaChakra className="w-8 h-8 text-primary" />
                        <span className="heading-ui text-lg font-semibold">Samvidhan Saathi</span>
                      </Link>
                    </div>
                    
                    <nav className="flex-1 p-4">
                      <div className="space-y-1">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                              pathname === link.href
                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </nav>

                    {/* Mobile Language Selector */}
                    <div className="p-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Language / भाषा</p>
                      <div className="flex gap-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={cn(
                              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                              language === lang.code
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden glass border-t z-50">
        <nav className="flex items-center justify-around h-16 max-w-md mx-auto">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors rounded-lg",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-[11px] font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
