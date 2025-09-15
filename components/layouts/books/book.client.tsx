"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Globe,
  Building,
  Hash,
  ExternalLink,
  Heart,
  Share2,
  Star,
} from "lucide-react"
import { getBookDetails, getCoverUrl, formatAuthors, getBookDescription, type BookDetails } from "@/lib/api"
import Image from "next/image"
import { RelatedBooks } from "./related-books"

interface BookDetailsContentProps {
  bookId: string
}

export function BookDetailsContent({ bookId }: BookDetailsContentProps) {
  const [book, setBook] = useState<BookDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const bookData = await getBookDetails(bookId)
        setBook(bookData)

        // Check if book is in favorites (localStorage for demo)
        const favorites = JSON.parse(localStorage.getItem("bookFavorites") || "[]")
        setIsFavorite(favorites.includes(bookId))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load book details")
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [bookId])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("bookFavorites") || "[]")
    let newFavorites

    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== bookId)
    } else {
      newFavorites = [...favorites, bookId]
    }

    localStorage.setItem("bookFavorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const handleShare = async () => {
    if (navigator.share && book) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out "${book.title}" by ${formatAuthors(book.author_name)}`,
          url: window.location.href,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-muted h-96 rounded-lg mb-4"></div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-muted h-8 rounded w-3/4"></div>
            <div className="bg-muted h-6 rounded w-1/2"></div>
            <div className="bg-muted h-4 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded"></div>
              <div className="bg-muted h-4 rounded"></div>
              <div className="bg-muted h-4 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-serif font-semibold text-lg mb-2">Book not found</h3>
          <p className="text-muted-foreground mb-4">
            {error || "The book you're looking for doesn't exist or couldn't be loaded."}
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Books
      </Button>

      {/* Main Book Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
       <div className="lg:col-span-1">
  <Card className="sticky top-8 shadow-lg py-0 rounded-2xl overflow-hidden">
    <CardContent className="p-0 relative">
      {/* Book Cover */}
      <div className="relative w-full h-150 bg-muted">
        {book.cover_i ? (
          <Image
            src={getCoverUrl(book.cover_i, "M") || "/book.webp"}
            alt={`Cover of ${book.title} by ${formatAuthors(book.author_name)}`}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <Image
            src="/book.webp"
            alt="No cover available"
            fill
            className="object-cover"
            loading="lazy"
          />
        )}

        {/* Rating Badge */}
        {book.ratings_average && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-md px-2 py-1 text-xs">
            <Star className="h-3 w-3 mr-1" aria-hidden="true" />
            <span aria-label={`Rating: ${book.ratings_average.toFixed(1)} out of 5 stars`}>
              {book.ratings_average.toFixed(1)}
            </span>
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <Button
          variant={isFavorite ? "default" : "outline"}
          onClick={toggleFavorite}
          className="flex-1 hover:bg-gray-100"
        >
          <Heart
            className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-white" : ""}`}
          />
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleShare}
          className=" hover:bg-gray-100"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</div>


        {/* Book Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Author */}
          <div>
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-3">{book.title}</h1>
            {book.author_name && (
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                <User className="h-5 w-5" />
                <span>by {formatAuthors(book.author_name)}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {book.description && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-xl mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{getBookDescription(book.description)}</p>
              </CardContent>
            </Card>
          )}

          {/* Subjects/Tags */}
          {book.subjects && book.subjects.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif font-semibold text-xl mb-3">Subjects</h2>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 15).map((subject, index) => (
                    <Badge key={index} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                  {book.subjects.length > 15 && <Badge variant="outline">+{book.subjects.length - 15} more</Badge>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Publication Details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif font-semibold text-xl mb-4">Publication Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {book.publishers && book.publishers.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Publishers</span>
                      <span className="text-muted-foreground">
                        {book.publishers.slice(0, 3).join(", ")}
                        {book.publishers.length > 3 && ` +${book.publishers.length - 3} more`}
                      </span>
                    </div>
                  </div>
                )}

                {book.publish_date && book.publish_date.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Publish Dates</span>
                      <span className="text-muted-foreground">
                        {book.publish_date.slice(0, 3).join(", ")}
                        {book.publish_date.length > 3 && ` +${book.publish_date.length - 3} more`}
                      </span>
                    </div>
                  </div>
                )}

                {book.language && book.language.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Languages</span>
                      <span className="text-muted-foreground">
                        {book.language.slice(0, 3).join(", ")}
                        {book.language.length > 3 && ` +${book.language.length - 3} more`}
                      </span>
                    </div>
                  </div>
                )}

                {book.isbn && book.isbn.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">ISBN</span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {book.isbn[0]}
                        {book.isbn.length > 1 && ` +${book.isbn.length - 1} more`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* External Links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-serif font-semibold text-xl mb-4">External Links</h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:bg-gray-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Library
                  </a>
                </Button>
                {book.isbn && book.isbn[0] && (
                  <Button variant="outline" asChild>
                    <a
                      href={`https://www.worldcat.org/isbn/${book.isbn[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      WorldCat
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Books */}
      {book.subjects && book.subjects.length > 0 && <RelatedBooks subject={book.subjects[0]} currentBookId={bookId} />}
    </div>
  )
}
