import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Globe, Heart, Search, Filter, Lightbulb } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MissionSection() {
  return (
    <section className="py-10 mb-5 bg-muted/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          At BookVerse, our mission is to make reading accessible, enjoyable,
          and inspiring for everyone. We believe books have the power to
          transform lives and spark creativity.
        </p>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <div className="">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-4">About BookVerse</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&#39;re passionate about connecting readers with their next great adventure. BookVerse is your gateway to
            discovering millions of books from around the world.
          </p>
        </div>
      </main>
    </div>
  )
}


export function Story() {
  const features = [
    {
      icon: <Search className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Powerful Search",
      desc: "Find exactly what you're looking for with our advanced search capabilities across millions of books.",
    },
    {
      icon: <Filter className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Smart Filters",
      desc: "Narrow down your search by genre, author, publication year, language, and more.",
    },
    {
      icon: <Globe className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Global Collection",
      desc: "Access books from authors and publishers worldwide, spanning multiple languages and cultures.",
    },
    {
      icon: <Users className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Community Driven",
      desc: "Built on the Open Library platform, supported by a community of book lovers and librarians.",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Personal Library",
      desc: "Save your favorite books and build your personal reading list for future reference.",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary mx-auto mb-4 transition-colors group-hover:text-red-600" />,
      title: "Detailed Information",
      desc: "Get comprehensive details about each book including descriptions, ratings, and publication info.",
    },
  ]
  return (
    <>
      <div className=" max-w-7xl mx-auto container">
        <div className="grid grid-cols-1 px-5 md:px-0 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg hover:-translate-y-1 py-0 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                {feature.icon}
                <h3 className="font-serif font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className=" max-w-7xl mx-auto container">
        <Card className="mb-12 md:shadow-lg border-none md:border">
          <CardContent className="">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
              {/* النص */}
              <div className="flex-1">
                <h2 className="font-serif font-bold text-2xl lg:text-3xl text-center lg:text-left mb-6">
                  Our Story
                </h2>
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

              {/* الصورة */}
              <div className="flex-1">
                <Image
                  src="/7O6A9338.webp"
                  width={650}
                  height={450}
                  alt="Our Story"
                  className="rounded-2xl shadow-md object-cover w-full h-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center bg-muted/70 py-15">
        <h2 className="font-serif font-bold text-2xl lg:text-3xl mb-4">Ready to Start Exploring?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Join thousands of readers who have already discovered their next favorite book.
        </p>
        <div className="flex flex-col px-5 md:px-0 sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className=" hover:bg-red-700">
            <Link href="/books">Browse Books</Link>
          </Button>
          <Button variant="outline" className=" hover:bg-gray-100 " size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  )
}


export function ValuesSection() {
  const values = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Accessibility",
      desc: "Making books easily available to everyone, anytime, anywhere.",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Community",
      desc: "Building a space where readers connect and share experiences.",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-primary" />,
      title: "Innovation",
      desc: "Bringing modern design and technology to the world of books.",
    },
  ]

  return (
    <section className="pt-15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-center text-foreground mb-10">
          Our Values
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2 text-center">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
