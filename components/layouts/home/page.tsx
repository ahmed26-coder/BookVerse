import React from 'react'
import { HeroSection } from './home.chunks'
import { FeaturedBooks, SearchSection } from './home.client'

export default function page() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <FeaturedBooks />
    </div>
  )
}
