"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar } from "lucide-react"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Star, User, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { searchBooks, getCoverUrl, formatAuthors, formatPublishYear } from "@/lib/api"
import Image from "next/image"
import Millions from "./home.chunks"
import { CategoryBooks } from "./categorybooks"

const POPULAR_SUBJECTS = ["Science", "History", "Romance", "Technology", "Art", "Fiction", "Fantasy", "Biography", "Poetry", "Travel", "Health", "Business"]
const POPULAR_SUBJECT = ["Science", "History", "Romance", "Technology", "Fiction"]


export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLoading(true)
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery.trim())}`
        )
        const data = await res.json()
        setResults(data.docs.slice(0, 12))
        setOpen(true)
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubjectClick = async (subject: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://openlibrary.org/subjects/${encodeURIComponent(subject.toLowerCase())}.json?limit=12`
      )
      const data = await res.json()
      setResults(data.works || [])
      setOpen(true)
    } catch (error) {
      console.error("Subject error:", error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getBookCover = (book: any) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    }
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    }
    return "/no-cover.png"
  }

  return (
    <section id="search" className="py-16 lg:pb-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Find Your Perfect Book
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through millions of books or explore popular categories to discover something new.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto mb-12 py-0 relative z-50">
          <CardContent className="p-6" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="flex gap-2 items-center">
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
              <Button className="hover:bg-red-700 w-fit" type="submit">
                Search
              </Button>
            </form>
            {open && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 max-h-[500px] overflow-y-auto z-50 p-4">
                {!loading && results.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {results.map((book, idx) => (
                      <Link
                        key={idx}
                        href={`/books/${book.key.replace("/works/", "")}`}
                        className="group"
                      >
                        <div className="cursor-pointer rounded-lg border bg-white hover:shadow-lg hover:border-primary transition-transform transform hover:scale-105 p-3 flex flex-col items-center">
                            {book.ratings_average && (
                              <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                                <Star className="h-3 w-3 mr-1" />
                                {book.ratings_average.toFixed(1)}
                              </Badge>
                            )}
                            {book.cover_i ? (
                              <Image
                                src={getBookCover(book)}
                                alt={book.title}
                                width={150}
                                height={220}
                                className="w-full h-[160px] object-cover rounded-md"
                                loading="lazy"
                              />
                            ) : (
                              <Image
                                src="/book.webp"
                                alt=""
                                width={150}
                                height={220}
                                className="w-full h-[160px] object-cover rounded-md"
                                loading="lazy"
                              />
                            )}
                          </div>
                          <p className="mt-3 text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {book.title}
                          </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  !loading && (
                    <p className="text-center text-muted-foreground">No results found</p>
                  )
                )}
              </div>

            )}
          </CardContent>
        </Card>
        <Millions />
        <div className="text-center mb-8 mt-10">
          <h3 className="font-serif font-semibold text-xl text-foreground mb-6">
            Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {POPULAR_SUBJECTS.slice(0, 12).map((subject) => (
              <Button
                key={subject}
                variant="outline"
                size="sm"
                onClick={() => handleSubjectClick(subject)}
                className="hover:bg-gray-100 transition-colors"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}





type Book = {
  key: string
  title: string
  cover_i?: number
  ratings_average?: number
  author_name?: string[]
  first_publish_year?: number
}

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
      const queries = ["bestseller", "classic literature", "science fiction"]
      const allBooks: Book[] = []

      for (const query of queries) {
        const response = await searchBooks(query, 1, 4)
        allBooks.push(...response.docs.filter((book) => book.cover_i))
      }
      const uniqueBooks = allBooks
        .filter((book, index, self) => index === self.findIndex((b) => b.key === book.key))
        .slice(0, 12)

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
      <section className="py-16 lg:py-24" aria-label="Featured books loading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Featured Books</h2>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            role="status"
            aria-label="Loading featured books"
          >
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse py-0">
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
    <section className="py-8 max-w-7xl mx-auto lg:py-16 bg-muted/30" aria-label="Featured books">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Featured Books</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover some of the most popular and acclaimed books in our collection.
          </p>
        </div>

        <Carousel className="mb-8 max-w-2xs mx-auto ">
          <CarouselContent>
            {featuredBooks.map((book) => (
              <CarouselItem key={book.key} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="group py-0 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="px-0">
                    <div className="w-full h-90 mb-4 rounded-t-md relative overflow-hidden">
                      {book.ratings_average && (
                        <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          {book.ratings_average.toFixed(1)}
                        </Badge>
                      )}
                      {book.cover_i ? (
                        <Image
                          src={getCoverUrl(book.cover_i, "M") || "/book.webp"}
                          alt={`Cover of ${book.title} by ${formatAuthors(book.author_name)}`}
                          width={350}
                          height={400}
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="/book.webp"
                          alt=""
                          width={350}
                          height={400}
                          className="object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="px-4 pb-5">
                      <h3 className="font-serif font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>

                      <div className="text-sm text-muted-foreground mb-4">
                        {book.author_name && (
                          <div className="flex space-y-1 items-center font-medium gap-1">
                            <User className="h-4 w-4" aria-hidden="true" />
                            <span className="line-clamp-1">{formatAuthors(book.author_name)}</span>
                          </div>
                        )}
                        {book.first_publish_year && (
                          <div className="flex items-center font-medium gap-1">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span>{formatPublishYear(book.first_publish_year)}</span>
                          </div>
                        )}
                      </div>

                      <Button asChild variant="outline" className="w-full bg-transparent cursor-pointer hover:bg-gray-50">
                        <Link href={`/books/${book.key.replace("/works/", "")}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center">
          <Button asChild size="lg" className="hover:bg-red-700 cursor-pointer">
            <Link href="/books">View All Books</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}



export default function CategoryBook() {
  return (
    <div>
      {POPULAR_SUBJECT.map((subject) => (
        <CategoryBooks key={subject} subject={subject} />
      ))}
    </div>
  )
}



import { Mail } from "lucide-react"
import { toast } from "sonner"
import { FormEvent } from "react"

export function NewsletterSection() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast.success("You’ve successfully subscribed to our newsletter!")
    }, 1000)
  }

  return (
    <section className="pb-10 max-w-7xl mx-auto bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-serif font-bold text-3xl lg:text-4xl mb-4 text-foreground">
          Join Our Community
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Stay updated with the latest books, insights, and inspiring stories.
          Subscribe to our newsletter today!
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
            required
          />
          <Button
            type="submit"
            className="hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}
