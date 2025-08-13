import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Dive into Your Next <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore a world of stories waiting to be told. Discover your next favorite book from our vast collection of
            literary treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/books">Discover Books</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent hover:text-white ">
              <Link href="#search">Start Searching</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
