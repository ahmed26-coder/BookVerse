import React from 'react'
import { HeroSection, WhyReadBooks } from './home.chunks'
import CategoryBook, { FeaturedBooks, NewsletterSection, SearchSection } from './home.client'

export default function page() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <div className=" bg-muted/70">
        <FeaturedBooks />
      </div>
      <div className=" bg-background">
        <CategoryBook />
      </div>
      <WhyReadBooks />
      <NewsletterSection />
    </div>
  )
}
