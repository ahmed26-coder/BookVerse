import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, User, Calendar, AlertCircle, RefreshCw } from "lucide-react"
import { searchBooks, getCoverUrl, formatAuthors, formatPublishYear } from "@/lib/api"

type Book = {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  ratings_average?: number
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Science: "Explore groundbreaking discoveries and scientific wonders that shape our world.",
  History: "Travel back in time and discover the stories that defined humanity.",
  Romance: "Lose yourself in heartfelt love stories and timeless passion.",
  Technology: "Stay ahead with books on innovation, coding, and modern tech.",
  Art: "Dive into creativity with books about painting, design, and visual culture.",
  Fiction: "Step into imaginative worlds through gripping fictional tales.",
  Fantasy: "Embark on magical adventures filled with heroes, quests, and wonder.",
  Biography: "Get inspired by the lives and journeys of remarkable individuals.",
  Poetry: "Experience the beauty of words woven into timeless verses.",
  Travel: "Discover destinations and cultures around the globe.",
  Health: "Find guidance on wellness, fitness, and living a healthier life.",
  Business: "Unlock insights into strategy, leadership, and financial success."
}

export function CategoryBooks({ subject }: { subject: string }) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await searchBooks(subject, 1, 12)
      const results = response.docs.filter((book) => book.cover_i)
      setBooks(results)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unable to load books for this category"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30" aria-label={`${subject} books loading`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              {subject} Books
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="status">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse py-0">
                <CardContent className="p-6">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-3 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30" aria-label={`${subject} books error`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-2">Unable to Load {subject} Books</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchBooks} className="flex items-center gap-2">
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
    <section className="py-8 max-w-7xl mx-auto lg:py-8" aria-label={`${subject} books`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">
            {subject} Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {CATEGORY_DESCRIPTIONS[subject] || "Discover amazing books in this category."}
          </p>
        </div>

        <Carousel className=" max-w-2xs mx-auto">
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.key} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 py-4">
                <Card className="group py-0 hover:shadow-lg transition-shadow duration-400">
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
                      <h3 className="font-serif font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1 ">
                        {book.title}
                      </h3>

                      <div className="text-sm text-muted-foreground mb-4">
                        {book.author_name && (
                          <div className="flex items-center font-medium gap-1">
                            <User className="h-4 w-4" />
                            <span className="line-clamp-1">{formatAuthors(book.author_name)}</span>
                          </div>
                        )}
                        {book.first_publish_year && (
                          <div className="flex items-center font-medium gap-1">
                            <Calendar className="h-4 w-4" />
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
      </div>
    </section>
  )
}
