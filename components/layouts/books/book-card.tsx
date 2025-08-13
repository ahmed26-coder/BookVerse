import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, User, BookOpen } from "lucide-react"
import { getCoverUrl, formatAuthors, formatPublishYear, type Book } from "@/lib/api"
import Image from "next/image"

interface BookCardProps {
    book: Book
}

export function BookCard({ book }: BookCardProps) {
    const bookId = book.key.replace("/works/", "")

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <CardContent className=" flex flex-col h-full">
                {/* Book Cover */}
                <div className="w-full h-100 mb-4 rounded-md relative overflow-hidden">
                    {book.cover_i ? (
                        <Image
                            src={getCoverUrl(book.cover_i, "M") || "/placeholder.svg"}
                            alt={`Cover of ${book.title} by ${formatAuthors(book.author_name)}`}
                            fill
                            className="object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div
                            className="w-full h-48 bg-muted rounded-lg flex items-center justify-center"
                            role="img"
                            aria-label="No cover available"
                        >
                            <BookOpen className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                        </div>
                    )}
                    {book.ratings_average && (
                        <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                            <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                            <span aria-label={`Rating: ${book.ratings_average.toFixed(1)} out of 5 stars`}>
                                {book.ratings_average.toFixed(1)}
                            </span>
                        </Badge>
                    )}
                </div>

                {/* Book Info */}
                <div className="flex-1 flex flex-col">
                    <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
                        {book.author_name && (
                            <div className="flex items-center gap-1">
                                <User className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                <span className="line-clamp-1">{formatAuthors(book.author_name)}</span>
                            </div>
                        )}
                        {book.first_publish_year && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                <span>{formatPublishYear(book.first_publish_year)}</span>
                            </div>
                        )}
                        {book.subject && book.subject.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {book.subject.slice(0, 2).map((subject, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                                {book.subject.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{book.subject.length - 2}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <Button asChild variant="outline" className="w-full mt-auto bg-transparent hover:text-white">
                        <Link
                            href={`/books/${bookId}`}
                            aria-label={`View details for ${book.title} by ${formatAuthors(book.author_name)}`}
                        >
                            View Details
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
