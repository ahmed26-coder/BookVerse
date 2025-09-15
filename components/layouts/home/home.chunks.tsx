import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, Users, Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative py-30 lg:pt-22">
      <div className="absolute inset-0">
        <Image
          src="/library.webp"
          alt="Books Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Dive into Your Next <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore a world of stories waiting to be told. Discover your next favorite book from our vast collection of
            literary treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-3 hover:bg-red-700">
              <Link href="/books">Discover Books</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 bg-transparent hover:text-white text-white border-white hover:bg-white/10"
            >
              <Link href="#search">Start Searching</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}



export default function Millions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
      <Card className="text-center py-0">
        <CardContent className="p-6">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
          <h4 className="font-serif font-bold text-2xl mb-2">Millions of Books</h4>
          <p className="text-muted-foreground text-sm font-medium">
            Access to a vast collection of books from around the world
          </p>
        </CardContent>
      </Card>
      <Card className="text-center py-0">
        <CardContent className="p-6">
          <Users className="h-12 w-12 text-primary mx-auto mb-3" />
          <h4 className="font-serif font-bold text-2xl mb-2">Diverse Authors</h4>
          <p className="text-muted-foreground text-sm font-medium">
            Discover works from authors across all genres and time periods
          </p>
        </CardContent>
      </Card>
      <Card className="text-center py-0">
        <CardContent className="p-6">
          <Calendar className="h-12 w-12 text-primary mx-auto mb-3" />
          <h4 className="font-serif font-bold text-2xl mb-2">Always Updated</h4>
          <p className="text-muted-foreground text-sm font-medium">Fresh content and new releases added regularly</p>
        </CardContent>
      </Card>
    </div>
  )
}




export function WhyReadBooks() {
  const benefits = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Boost Your Mind",
      desc: "Reading improves focus, memory, and analytical thinking skills.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Expand Creativity",
      desc: "Books spark imagination and inspire new ideas.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Gain Knowledge",
      desc: "Discover endless information and learn from every page.",
    },
  ]

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="container px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif font-bold text-3xl lg:text-4xl mb-4 text-foreground">
          Why Read Books?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Unlock the true power of reading and see how it can transform your
          life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <Card key={i} className="hover:shadow-lg py-0 transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {b.icon}
                <h3 className="mt-4 font-semibold text-lg">{b.title}</h3>
                <p className="text-muted-foreground mt-2">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
