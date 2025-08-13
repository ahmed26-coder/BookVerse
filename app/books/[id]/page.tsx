import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookDetailsContent } from "@/components/layouts/books/book.client";

// Define the props interface to handle async params
interface BookDetailsPageProps {
  params: Promise<{ id: string }>; // params is a Promise
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  // Await the params to resolve the Promise
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<BookDetailsSkeleton />}>
          <BookDetailsContent bookId={id} />
        </Suspense>
      </main>
    </div>
  );
}

function BookDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-muted h-96 rounded-lg mb-4"></div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-muted h-8 rounded w-3/4"></div>
          <div className="bg-muted h-6 rounded w-1/2"></div>
          <div className="bg-muted h-4 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="bg-muted h-4 rounded"></div>
            <div className="bg-muted h-4 rounded"></div>
            <div className="bg-muted h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}