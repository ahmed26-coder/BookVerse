"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

interface BookSearchProps {
  initialQuery: string
  onSearch: (query: string) => void
}

export function BookSearch({ initialQuery, onSearch }: BookSearchProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2" role="search" aria-label="Search books">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search for books, authors, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Search query"
              autoComplete="off"
            />
          </div>
          <Button type="submit" disabled={!query.trim()} aria-label="Search books">
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
