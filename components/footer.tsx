"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
        {/* Logo and Name */}
        <div className="mb-4 xs:mb-6 sm:mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 xs:gap-3">
            <Image 
              src="/images/veo3-logo-new.png" 
              alt="veo3promptgenerator.online" 
              width={40} 
              height={40} 
              className="h-5 w-auto xs:h-6 sm:h-8"
            />
            <span className="text-base xs:text-lg sm:text-xl font-bold text-primary">veo3promptgenerator.online</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <h3 className="font-semibold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Core Tools</h3>
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 text-xs xs:text-sm">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("video-script-generator")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-muted-foreground hover:text-primary cursor-pointer text-left w-full py-1"
                >
                  Video Script Generator
                </button>
              </li>
              <li>
                <Link href="/veo3-prompt-generator" className="text-muted-foreground hover:text-primary block py-1">
                  Veo3 Prompt Generator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Tools</h3>
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 text-xs xs:text-sm">
              <li>
                <Link href="/video-to-prompt" className="text-muted-foreground hover:text-primary block py-1">
                  Video to Prompt
                </Link>
              </li>
              <li>
                <Link href="/transcription" className="text-muted-foreground hover:text-primary block py-1">
                  Video Transcription
                </Link>
              </li>
              <li>
                <Link href="/prompt-guide" className="text-muted-foreground hover:text-primary block py-1">
                  Prompt Guide
                </Link>
              </li>
              <li>
                <Link href="/prompt-library" className="text-muted-foreground hover:text-primary block py-1">
                  Prompt Library
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Company</h3>
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 text-xs xs:text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary block py-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary block py-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary block py-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary block py-1">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">Legal</h3>
            <ul className="space-y-1 xs:space-y-2 sm:space-y-3 text-xs xs:text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary block py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary block py-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary block py-1">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-primary block py-1">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 xs:mt-8 sm:mt-12 pt-4 xs:pt-6 sm:pt-8 text-center text-xs xs:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VeO3 Prompt Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
