import { type Locale, getTranslation } from "@/lib/i18n"

interface MinimalHeroProps {
  locale: Locale
}

export function MinimalHero({ locale }: MinimalHeroProps) {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">{getTranslation(locale, "mainTitle")}</h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {getTranslation(locale, "mainDescription")}
          </p>
        </div>
      </div>
    </section>
  )
}
