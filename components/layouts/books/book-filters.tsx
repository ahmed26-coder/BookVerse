"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { POPULAR_SUBJECTS, LANGUAGES } from "@/lib/api"

interface Filters {
  author?: string
  subject?: string
  language?: string
  publish_year?: string
}

interface BookFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
  onClearFilters: () => void
  totalResults: number
}

export function BookFilters({ filters, onFilterChange, onClearFilters, totalResults }: BookFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters }
    if (value === "all" || !value) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    onFilterChange(newFilters)
  }

  const removeFilter = (key: keyof Filters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFilterChange(newFilters)
  }

  const yearRanges = [
    { label: "2020s", value: "2020" },
    { label: "2010s", value: "2010" },
    { label: "2000s", value: "2000" },
    { label: "1990s", value: "1990" },
    { label: "1980s", value: "1980" },
    { label: "Before 1980", value: "1979" },
  ]

  return (
    <div className="space-y-4">
      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            aria-label={`${showFilters ? "Hide" : "Show"} filters`}
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          {totalResults > 0 && (
            <span className="text-sm text-muted-foreground" aria-live="polite">
              {totalResults.toLocaleString()} books found
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Active filters">
          {filters.subject && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Subject: {filters.subject}
              <button
                onClick={() => removeFilter("subject")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove subject filter: ${filters.subject}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.author && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Author: {filters.author}
              <button
                onClick={() => removeFilter("author")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove author filter: ${filters.author}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.language && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Language: {LANGUAGES.find((l) => l.code === filters.language)?.name || filters.language}
              <button
                onClick={() => removeFilter("language")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove language filter: ${LANGUAGES.find((l) => l.code === filters.language)?.name || filters.language}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.publish_year && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Year: {yearRanges.find((y) => y.value === filters.publish_year)?.label || `${filters.publish_year}s`}
              <button
                onClick={() => removeFilter("publish_year")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                aria-label={`Remove year filter: ${yearRanges.find((y) => y.value === filters.publish_year)?.label || `${filters.publish_year}s`}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Controls */}
      {showFilters && (
        <Card id="filter-panel">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject Filter */}
              <div>
                <label htmlFor="subject-filter" className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select
                  value={filters.subject || "all"}
                  onValueChange={(value) => handleFilterChange("subject", value)}
                >
                  <SelectTrigger id="subject-filter" aria-label="Filter by subject">
                    <SelectValue placeholder="All subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All subjects</SelectItem>
                    {POPULAR_SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language Filter */}
              <div>
                <label htmlFor="language-filter" className="text-sm font-medium mb-2 block">
                  Language
                </label>
                <Select
                  value={filters.language || "all"}
                  onValueChange={(value) => handleFilterChange("language", value)}
                >
                  <SelectTrigger id="language-filter" aria-label="Filter by language">
                    <SelectValue placeholder="All languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All languages</SelectItem>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Publication Year Filter */}
              <div>
                <label htmlFor="year-filter" className="text-sm font-medium mb-2 block">
                  Publication Era
                </label>
                <Select
                  value={filters.publish_year || "all"}
                  onValueChange={(value) => handleFilterChange("publish_year", value)}
                >
                  <SelectTrigger id="year-filter" aria-label="Filter by publication era">
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All years</SelectItem>
                    {yearRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
