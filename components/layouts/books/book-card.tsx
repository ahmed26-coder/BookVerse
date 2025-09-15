import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, User } from "lucide-react"
import { getCoverUrl, formatAuthors, formatPublishYear, type Book } from "@/lib/api"
import Image from "next/image"

interface BookCardProps {
    book: Book
}

export function BookCard({ book }: BookCardProps) {
    const bookId = book.key.replace("/works/", "")

    return (
        <Card className="group p-0 hover:shadow-lg transition-all duration-500 h-full flex flex-col ">
            <CardContent className=" flex p-0 flex-col h-full">
                {/* Book Cover */}
                <div className="w-full h-100 mb-4 rounded-t-md relative overflow-hidden">
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
                            alt=""
                            fill
                            className="object-cover"
                            loading="lazy"
                        />
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
                <div className="flex-1 flex flex-col px-4">
                    <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                    </h3>

                    <div className=" text-sm text-muted-foreground flex-1">
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
                            <div className="flex line-clamp-1 gap-1 mt-2">
                                {book.subject.slice(0, 2).map((subject, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {subject}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <Button asChild variant="outline" className="w-full my-5 bg-transparent cursor-pointer hover:bg-gray-100 ">
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
