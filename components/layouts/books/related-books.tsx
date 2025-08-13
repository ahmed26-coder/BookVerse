"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { searchBooks, type Book } from "@/lib/api"
import { BookCard } from "./book-card"

interface RelatedBooksProps {
  subject: string
  currentBookId: string
}

export function RelatedBooks({ subject, currentBookId }: RelatedBooksProps) {
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRelatedBooks()
  }, [subject, currentBookId])

  const fetchRelatedBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await searchBooks("", 1, 8, { subject })
      // Filter out the current book
      const filtered = response.docs.filter((book) => !book.key.includes(currentBookId) && book.cover_i).slice(0, 4)
      setRelatedBooks(filtered)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unable to load related books"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="font-serif font-semibold text-xl mb-4">Related Books</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="status"
            aria-label="Loading related books"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-3" aria-hidden="true"></div>
                <div className="bg-muted h-4 rounded mb-2" aria-hidden="true"></div>
                <div className="bg-muted h-3 rounded w-2/3" aria-hidden="true"></div>
              </div>
            ))}
          </div>
          <span className="sr-only">Loading related books...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="font-serif font-semibold text-xl mb-4">Related Books</h2>
          <div className="text-center py-8">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
              onClick={fetchRelatedBooks}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (relatedBooks.length === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="font-serif font-semibold text-xl mb-4">
          More books in <span className="text-primary">{subject}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
