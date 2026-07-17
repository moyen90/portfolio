"use client"

import AmbientBackground from "./ambient-background"
import SiteNav from "./site-nav"
import SiteHero from "./site-hero"
import BentoSection from "./bento-section"
import FeaturedProjects from "./featured-projects"
import SkillsBento from "./skills-bento"
import SiteContact from "./site-contact"
import SiteFooter from "./site-footer"

export default function LandingPage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <SiteHero />
        <BentoSection />
        <FeaturedProjects />
        <SkillsBento />
        <SiteContact />
      </main>
      <SiteFooter />
    </>
  )
}
