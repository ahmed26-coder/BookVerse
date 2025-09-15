import React from 'react'
import { AboutPage, MissionSection, Story, ValuesSection } from './about.chunks'

export default function page() {
  return (
    <div>
      <AboutPage />
      <MissionSection />
      <Story />
      <ValuesSection />
    </div>
  )
}
