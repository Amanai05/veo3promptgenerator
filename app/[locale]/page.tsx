import { MainHero } from "@/components/main-hero"
import { HomeSections } from "@/components/home-sections"
import { type Locale, locales } from "@/lib/i18n"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface LocalePageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const locale = params.locale as Locale

  if (locale === "fr") {
    return {
      title: "Générateur de Prompts Veo3 Gratuit en Ligne",
      description:
        "Transformez vos images et vidéos en prompts IA puissants avec notre technologie Gemini 2.5 Pro avancée.",
      alternates: {
        canonical: "/fr",
        languages: {
          en: "/",
          fr: "/fr",
        },
      },
      openGraph: {
        title: "Générateur de Prompts Veo3 Gratuit en Ligne",
        description:
          "Transformez vos images et vidéos en prompts IA puissants avec notre technologie Gemini 2.5 Pro avancée.",
        locale: "fr_FR",
      },
    }
  }

  return {}
}

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .map((locale) => ({
      locale: locale,
    }))
}

export default function LocalePage({ params }: LocalePageProps) {
  const locale = params.locale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <main>
      <MainHero />
      <HomeSections />
    </main>
  )
}
