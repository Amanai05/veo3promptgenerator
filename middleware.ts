import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./lib/i18n"

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get locale from Accept-Language header or use default
    const locale = getLocale(request) || defaultLocale

    // Don't redirect for default locale (English)
    if (locale === defaultLocale) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

function getLocale(request: NextRequest): string | undefined {
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (!acceptLanguage) return undefined

  // Simple locale detection - you might want to use a library like @formatjs/intl-locale
  const preferredLocales = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim().toLowerCase())

  for (const preferredLocale of preferredLocales) {
    // Check for exact match
    if (locales.includes(preferredLocale as any)) {
      return preferredLocale
    }

    // Check for language match (e.g., 'fr-FR' -> 'fr')
    const language = preferredLocale.split("-")[0]
    if (locales.includes(language as any)) {
      return language
    }
  }

  return undefined
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|images).*)",
  ],
}
