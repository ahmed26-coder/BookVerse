import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Globe, Heart, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-4">About BookVerse</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&#39;re passionate about connecting readers with their next great adventure. BookVerse is your gateway to
            discovering millions of books from around the world.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif font-bold text-2xl lg:text-3xl mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                To make the world&#39;s literature accessible to everyone, helping readers discover books that inspire,
                educate, and entertain across all genres and cultures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Powerful Search</h3>
              <p className="text-muted-foreground text-sm">
                Find exactly what you&#39;re looking for with our advanced search capabilities across millions of books.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Filter className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Smart Filters</h3>
              <p className="text-muted-foreground text-sm">
                Narrow down your search by genre, author, publication year, language, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Global Collection</h3>
              <p className="text-muted-foreground text-sm">
                Access books from authors and publishers worldwide, spanning multiple languages and cultures.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Built on the Open Library platform, supported by a community of book lovers and librarians.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Personal Library</h3>
              <p className="text-muted-foreground text-sm">
                Save your favorite books and build your personal reading list for future reference.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg mb-3">Detailed Information</h3>
              <p className="text-muted-foreground text-sm">
                Get comprehensive details about each book including descriptions, ratings, and publication info.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif font-bold text-2xl lg:text-3xl text-center mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BookVerse was born from a simple belief: that everyone deserves access to the world&#39;s knowledge and
                  stories. In an age where information is abundant but discovery can be overwhelming, we wanted to
                  create a space where book lovers could easily find their next great read.
                </p>
                <p>
                  Built on the foundation of the Open Library project, BookVerse leverages one of the world&#39;s largest
                  collections of book metadata to bring you detailed information about millions of titles. Whether
                  you&#39;re searching for a classic novel, the latest bestseller, or an obscure academic text, we&#39;re here
                  to help you discover it.
                </p>
                <p>
                  Our platform is designed with readers in mind - from the casual browser looking for weekend
                  entertainment to the serious researcher seeking specific academic works. We believe that the right
                  book at the right time can change a life, and we&#39;re honored to be part of that journey.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="font-serif font-bold text-2xl lg:text-3xl mb-4">Ready to Start Exploring?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of readers who have already discovered their next favorite book.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/books">Browse Books</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
