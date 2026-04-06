"use client"

import { useState } from "react"
import { Search, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({
  placeholder = "Search Articles, Rights, or Topics...",
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center w-full max-w-2xl mx-auto",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center w-full rounded-2xl border bg-card transition-all duration-300",
          isFocused
            ? "border-accent shadow-lg shadow-accent/10"
            : "border-border/50 hover:border-border"
        )}
      >
        <Search
          className={cn(
            "absolute left-4 h-5 w-5 transition-colors",
            isFocused ? "text-accent" : "text-muted-foreground"
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent py-4 pl-12 pr-24 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="absolute right-2 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-accent"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            size="sm"
            className="h-8 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}
