"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, BookOpen, Users, Calendar } from "lucide-react"
import { POPULAR_SUBJECTS } from "@/lib/api"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/books?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSubjectClick = (subject: string) => {
    router.push(`/books?subject=${encodeURIComponent(subject)}`)
  }

  return (
    <section id="search" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Find Your Perfect Book</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through millions of books or explore popular categories to discover something new.
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for books, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-base"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <div className="text-center mb-8">
          <h3 className="font-serif font-semibold text-xl text-foreground mb-6">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {POPULAR_SUBJECTS.slice(0, 12).map((subject) => (
              <Button
                key={subject}
                variant="outline"
                size="sm"
                onClick={() => handleSubjectClick(subject)}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-serif font-semibold text-lg mb-2">Millions of Books</h4>
              <p className="text-muted-foreground text-sm">
                Access to a vast collection of books from around the world
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-serif font-semibold text-lg mb-2">Diverse Authors</h4>
              <p className="text-muted-foreground text-sm">
                Discover works from authors across all genres and time periods
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-serif font-semibold text-lg mb-2">Always Updated</h4>
              <p className="text-muted-foreground text-sm">Fresh content and new releases added regularly</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Star, User, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { searchBooks, getCoverUrl, formatAuthors, formatPublishYear, type Book } from "@/lib/api"
import Image from "next/image"

export function FeaturedBooks() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedBooks()
  }, [])

  const fetchFeaturedBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      // Fetch some popular/featured books
      const queries = ["bestseller", "classic literature", "science fiction"]
      const allBooks: Book[] = []

      for (const query of queries) {
        const response = await searchBooks(query, 1, 4)
        allBooks.push(...response.docs.filter((book) => book.cover_i))
      }

      // Remove duplicates and take first 6 books with covers
      const uniqueBooks = allBooks
        .filter((book, index, self) => index === self.findIndex((b) => b.key === book.key))
        .slice(0, 6)

      setFeaturedBooks(uniqueBooks)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unable to load featured books at the moment"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30" aria-label="Featured books loading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Featured Books</h2>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="status"
            aria-label="Loading featured books"
          >
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="bg-muted h-48 rounded-lg mb-4" aria-hidden="true"></div>
                  <div className="bg-muted h-4 rounded mb-2" aria-hidden="true"></div>
                  <div className="bg-muted h-3 rounded w-2/3" aria-hidden="true"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <span className="sr-only">Loading featured books...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30" aria-label="Featured books error">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-2">Unable to Load Featured Books</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchFeaturedBooks} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30" aria-label="Featured books">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Featured Books</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover some of the most popular and acclaimed books in our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredBooks.map((book) => (
            <Card key={book.key} className="group  hover:shadow-lg transition-shadow duration-300">
              <CardContent className="">
                <div className="w-full h-100 mb-4 rounded-md relative overflow-hidden">
                  {book.cover_i && (
                    <Image
                      src={getCoverUrl(book.cover_i, "M") || "/placeholder.svg"}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  )}
                  {book.ratings_average && (
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {book.ratings_average.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  {book.author_name && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" aria-hidden="true" />
                      <span>{formatAuthors(book.author_name)}</span>
                    </div>
                  )}
                  {book.first_publish_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <span>{formatPublishYear(book.first_publish_year)}</span>
                    </div>
                  )}
                </div>

                <Button asChild variant="outline" className="w-full bg-transparent hover:text-white">
                  <Link href={`/books/${book.key.replace("/works/", "")}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/books">View All Books</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
