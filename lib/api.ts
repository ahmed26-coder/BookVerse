// Open Library API integration utilities

export interface Book {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  isbn?: string[]
  cover_i?: number
  subject?: string[]
  publisher?: string[]
  language?: string[]
  number_of_pages_median?: number
  ratings_average?: number
  ratings_count?: number
}

export interface SearchResponse {
  docs: Book[]
  numFound: number
  start: number
}

export interface BookDetails extends Book {
  description?: string | { value: string }
  subjects?: string[]
  publishers?: string[]
  publish_date?: string[]
  works?: Array<{ key: string }>
}

const BASE_URL = "https://openlibrary.org"

export async function searchBooks(
  query: string,
  page = 1,
  limit = 20,
  filters?: {
    author?: string
    subject?: string
    language?: string
    publish_year?: string
  },
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
    fields:
      "key,title,author_name,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,ratings_average,ratings_count",
  })

  // Add filters if provided
  if (filters?.author) {
    params.append("author", filters.author)
  }
  if (filters?.subject) {
    params.append("subject", filters.subject)
  }
  if (filters?.language) {
    params.append("language", filters.language)
  }
  if (filters?.publish_year) {
    params.append("first_publish_year", filters.publish_year)
  }

  const response = await fetch(`${BASE_URL}/search.json?${params}`)

  if (!response.ok) {
    throw new Error(`Failed to search books: ${response.statusText}`)
  }

  return response.json()
}

export async function getBookDetails(key: string): Promise<BookDetails> {
  const cleanKey = key.startsWith("/works/") ? key : `/works/${key}`
  const response = await fetch(`${BASE_URL}${cleanKey}.json`)

  if (!response.ok) {
    throw new Error(`Failed to get book details: ${response.statusText}`)
  }

  return response.json()
}

export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M"): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export function getAuthorUrl(authorKey: string): string {
  return `${BASE_URL}${authorKey}.json`
}

// Popular subjects for filtering
export const POPULAR_SUBJECTS = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Biography",
  "History",
  "Science",
  "Philosophy",
  "Poetry",
  "Children",
  "Young Adult",
]

// Language options
export const LANGUAGES = [
  { code: "eng", name: "English" },
  { code: "spa", name: "Spanish" },
  { code: "fre", name: "French" },
  { code: "ger", name: "German" },
  { code: "ita", name: "Italian" },
  { code: "por", name: "Portuguese" },
  { code: "rus", name: "Russian" },
  { code: "jpn", name: "Japanese" },
  { code: "chi", name: "Chinese" },
]

// Helper functions for formatting
export function formatAuthors(authors?: string[]): string {
  if (!authors || authors.length === 0) return "Unknown Author"
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`
  return `${authors[0]} and ${authors.length - 1} others`
}

export function formatPublishYear(year?: number): string {
  if (!year) return "Unknown"
  return year.toString()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function formatRating(rating?: number): string {
  if (!rating) return "No rating"
  return `${rating.toFixed(1)}/5`
}

export function getBookDescription(description?: string | { value: string }): string {
  if (!description) return "No description available."
  if (typeof description === "string") return description
  return description.value || "No description available."
}
