import { Suspense } from "react"
import { BooksContent } from "./books.client"



export default function BooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">Discover Books</h1>
          <p className="text-lg text-muted-foreground">
            Explore our vast collection of books with advanced search and filtering options.
          </p>
        </div>
        <Suspense fallback={<div>Loading books...</div>}>
          <BooksContent />
        </Suspense>
      </main>
    </div>
  )
}
