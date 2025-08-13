import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-lg text-muted-foreground">Loading...</span>
      </div>
    </div>
  )
}
