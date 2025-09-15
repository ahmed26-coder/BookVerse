"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X, Filter } from "lucide-react"
import { LANGUAGES } from "@/lib/api"

// ✅ الفئات
const POPULAR_SUBJECTS = [
  "Science",
  "History",
  "Romance",
  "Technology",
  "Art",
  "Fiction",
  "Fantasy",
  "Biography",
  "Poetry",
  "Travel",
  "Health",
  "Business",
]

interface Filters {
  subject?: string
  language?: string
  publish_year?: string
}

interface BookFiltersProps {
  filters: Filters
  onFilterChange: (newFilters: Filters) => void
  onClearFilters: () => void
  totalResults: number
}

export function BookFilters({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}: BookFiltersProps) {
  const yearRanges = [
    { label: "2020s", value: "2020" },
    { label: "2010s", value: "2010" },
    { label: "2000s", value: "2000" },
    { label: "1990s", value: "1990" },
    { label: "1980s", value: "1980" },
    { label: "Before 1980", value: "1979" },
  ]

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters }
    if (value === "all") {
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

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center hover:bg-gray-100 gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={5} className="w-[600px] p-4">
            <Card>
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Subject Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select
                    value={filters.subject || "all"}
                    onValueChange={(value) => handleFilterChange("subject", value)}
                  >
                    <SelectTrigger>
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
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select
                    value={filters.language || "all"}
                    onValueChange={(value) => handleFilterChange("language", value)}
                  >
                    <SelectTrigger>
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

                {/* Year Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Publication Era</label>
                  <Select
                    value={filters.publish_year || "all"}
                    onValueChange={(value) => handleFilterChange("publish_year", value)}
                  >
                    <SelectTrigger>
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
              </CardContent>

              {/* Active Filters */}
              <div className="px-5">
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.subject && (
                      <Badge variant="secondary" className="flex items-center gap-1 font-medium border">
                        Subject: {filters.subject}
                        <button className="cursor-pointer" onClick={() => removeFilter("subject")}>
                          <X className="h-4 w-4" />
                        </button>
                      </Badge>
                    )}
                    {filters.language && (
                      <Badge variant="secondary" className="flex items-center gap-1 font-medium border">
                        Language: {LANGUAGES.find((l) => l.code === filters.language)?.name || filters.language}
                        <button className="cursor-pointer" onClick={() => removeFilter("language")}>
                          <X className="h-4 w-4" />
                        </button>
                      </Badge>
                    )}
                    {filters.publish_year && (
                      <Badge variant="secondary" className="flex items-center gap-1 font-medium border">
                        Year: {yearRanges.find((y) => y.value === filters.publish_year)?.label || filters.publish_year}
                        <button className="cursor-pointer" onClick={() => removeFilter("publish_year")}>
                          <X className="h-4 w-4" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </PopoverContent>
        </Popover>

        {activeFiltersCount > 0 && (
          <Button
            className=" hover:bg-gray-100 cursor-pointer border"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      {totalResults > 0 && (
        <span className="text-sm text-muted-foreground">
          {totalResults.toLocaleString()} books found
        </span>
      )}
    </div>
  )
}
