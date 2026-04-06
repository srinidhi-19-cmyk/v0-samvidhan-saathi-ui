"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  variant?: "default" | "primary"
  className?: string
}

export function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card border border-border/50 hover:border-border",
        className
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          variant === "primary"
            ? "bg-primary-foreground/20"
            : "bg-accent/10"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6",
            variant === "primary" ? "text-primary-foreground" : "text-accent"
          )}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            variant === "primary"
              ? "text-primary-foreground/80"
              : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </div>
      <div
        className={cn(
          "absolute bottom-6 right-6 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
          "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
          variant === "primary"
            ? "bg-primary-foreground/20"
            : "bg-accent/10"
        )}
      >
        <svg
          className={cn(
            "h-4 w-4",
            variant === "primary" ? "text-primary-foreground" : "text-accent"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}
