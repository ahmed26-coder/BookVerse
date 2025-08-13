"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMenuOpen])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/books", label: "Books" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          >
            <BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="font-serif font-bold text-xl text-foreground">BookVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden animate-in slide-in-from-top-2 duration-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
