import { MainHero } from "@/components/main-hero"
import { HomeSections } from "@/components/home-sections"

export default function FrenchHomePage() {
  return (
    <main>
      <MainHero locale="fr" />
      <HomeSections locale="fr" />
    </main>
  )
}
