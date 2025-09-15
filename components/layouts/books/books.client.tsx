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
  const [, setHasMore] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  // read query params
  const query = searchParams.get("q") || ""
  const subject = searchParams.get("subject") || ""
  const author = searchParams.get("author") || ""
  const language = searchParams.get("language") || ""
  const publishYear = searchParams.get("publish_year") || ""
  const pageParam = Math.max(1, Number(searchParams.get("page") || "1"))

  const filters: Filters = {
    ...(author && { author }),
    ...(subject && { subject }),
    ...(language && { language }),
    ...(publishYear && { publish_year: publishYear }),
  }

  const searchQuery = query || subject || "popular books"

  // current page state synced with URL (pageParam)
  const [currentPage, setCurrentPage] = useState<number>(pageParam)

  // fetch function
  const fetchBooks = async (page: number) => {
    setLoading(true)
    setError(null)

    try {
      const response: SearchResponse = await searchBooks(searchQuery, page, 20, filters)

      // In pagination we replace results with the page requested
      setBooks(response.docs)
      setTotalResults(response.numFound)

      const totalPages = Math.max(1, Math.ceil(response.numFound / 20))
      setHasMore(page < totalPages)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to search books. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Sync when query/filters/pageParam change
  useEffect(() => {
    setCurrentPage(pageParam)
    fetchBooks(pageParam)
    window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, subject, author, language, publishYear, pageParam])

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newQuery) {
      params.set("q", newQuery)
    } else {
      params.delete("q")
    }
    params.delete("subject")
    params.delete("author")
    params.delete("language")
    params.delete("publish_year")
    params.delete("page")
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
    fetchBooks(currentPage)
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    router.push(`/books?${params.toString()}`)
  }

  const totalPages = Math.max(1, Math.ceil(totalResults / 20))

  const getPagesToShow = (): (number | string)[] => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      const start = Math.max(2, currentPage - 2)
      const end = Math.min(totalPages - 1, currentPage + 2)
      if (start > 2) pages.push("...")
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }
    return pages
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

          {/* Pagination */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <nav aria-label="Pagination" className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || loading}
              >
                Previous
              </Button>

              {getPagesToShow().map((p, i) =>
                typeof p === "string" ? (
                  <span key={`dots-${i}`} className="px-2 text-sm text-muted-foreground">
                    {p}
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={p === currentPage ? undefined : "ghost"}
                    size="sm"
                    onClick={() => goToPage(p)}
                    className={p === currentPage ? "bg-primary text-background border" : ""}
                    aria-current={p === currentPage ? "page" : undefined}
                    disabled={loading}
                  >
                    {p}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || loading}
              >
                Next
              </Button>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
