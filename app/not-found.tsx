import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-serif font-bold text-2xl mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you&#39;re looking for doesn&#39;t exist or has been moved.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/books">Browse Books</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
