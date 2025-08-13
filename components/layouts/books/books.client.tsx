"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, BookOpen, AlertCircle, RefreshCw } from "lucide-react"
import { searchBooks, type Book, type SearchResponse } from "@/lib/api"
import { BookSearch } from "./book-search"
import { BookFilters } from "./book-filters"
import { BookCard } from "./book-card"

interface Filters {
  author?: string
  subject?: string
  language?: string
  publish_year?: string
}

export function BooksContent() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get("q") || ""
  const subject = searchParams.get("subject") || ""
  const author = searchParams.get("author") || ""
  const language = searchParams.get("language") || ""
  const publishYear = searchParams.get("publish_year") || ""

  const filters: Filters = {
    ...(author && { author }),
    ...(subject && { subject }),
    ...(language && { language }),
    ...(publishYear && { publish_year: publishYear }),
  }

  const searchQuery = query || subject || "popular books"

  useEffect(() => {
    setCurrentPage(1)
    fetchBooks(1, true)
  }, [query, subject, author, language, publishYear])

  const fetchBooks = async (page: number, reset = false) => {
    setLoading(true)
    setError(null)

    try {
      const response: SearchResponse = await searchBooks(searchQuery, page, 20, filters)

      if (reset) {
        setBooks(response.docs)
      } else {
        setBooks((prev) => [...prev, ...response.docs])
      }

      setTotalResults(response.numFound)
      setHasMore(response.docs.length === 20 && books.length + response.docs.length < response.numFound)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to search books. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchBooks(nextPage, false)
  }

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newQuery) {
      params.set("q", newQuery)
    } else {
      params.delete("q")
    }
    // Clear other params when doing a new search
    params.delete("subject")
    params.delete("author")
    params.delete("language")
    params.delete("publish_year")
    router.push(`/books?${params.toString()}`)
  }

  const handleFilterChange = (newFilters: Filters) => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (newFilters.author) params.set("author", newFilters.author)
    if (newFilters.subject) params.set("subject", newFilters.subject)
    if (newFilters.language) params.set("language", newFilters.language)
    if (newFilters.publish_year) params.set("publish_year", newFilters.publish_year)
    router.push(`/books?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/books")
  }

  const retrySearch = () => {
    fetchBooks(1, true)
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="font-serif font-semibold text-lg mb-2">Search Error</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={retrySearch} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <BookSearch initialQuery={query} onSearch={handleSearch} />
        <BookFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          totalResults={totalResults}
        />
      </div>

      {/* Results */}
      {loading && books.length === 0 ? (
        <div className="flex items-center justify-center py-12" role="status" aria-label="Searching books">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Searching books...</span>
        </div>
      ) : books.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif font-semibold text-lg mb-2">No books found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters to find more books.</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {totalResults > 0 && `Found ${totalResults.toLocaleString()} books`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <BookCard key={`${book.key}-${index}`} book={book} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center pt-8">
              <Button onClick={handleLoadMore} disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Load More Books"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}



