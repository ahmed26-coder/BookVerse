"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-6" />
            <h1 className="font-serif font-bold text-2xl mb-2">Something went wrong!</h1>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. This has been logged and we&#39;ll look into it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
            {error.digest && <p className="text-xs text-muted-foreground mt-4 font-mono">Error ID: {error.digest}</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
