import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Veo3 Prompt Generator | User Agreement & Legal Terms",
  description: "Read our terms of service for Veo3 Prompt Generator. Understand your rights and responsibilities when using our AI video prompt generation tools and services.",
  keywords: "terms of service, user agreement, Veo3 Prompt Generator terms, legal terms, service agreement, user rights, service conditions, legal policy, user responsibilities, service usage terms, legal compliance",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service - Veo3 Prompt Generator | User Agreement & Legal Terms",
    description: "Read our terms of service for Veo3 Prompt Generator. Understand your rights and responsibilities when using our AI video prompt generation tools and services.",
    url: "https://veo3promptgenerator.online/terms",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Terms of Service - Veo3 Prompt Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Veo3 Prompt Generator | User Agreement & Legal Terms",
    description: "Read our terms of service for Veo3 Prompt Generator. Understand your rights and responsibilities when using our AI video prompt generation tools and services.",
    images: ["/images/og-image-1200x630.png"],
    creator: "@veo3promptgen",
    site: "@veo3promptgen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function TermsPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Veo3 Prompt Generator ("Service"), you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to temporarily use Veo3 Prompt Generator for personal and commercial purposes.
                  This is the grant of a license, not a transfer of title, and under this license you may:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Use our AI-powered tools to generate video prompts and scripts</li>
                  <li>Download and use generated content for your projects</li>
                  <li>Share generated content with proper attribution</li>
                  <li>Use our service for commercial purposes</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  This license shall automatically terminate if you violate any of these restrictions and may be
                  terminated by Veo3 Prompt Generator at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">As a user of our service, you agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Provide accurate and complete information when creating an account</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not upload content that violates intellectual property rights</li>
                  <li>Not upload inappropriate, offensive, or illegal content</li>
                  <li>Not attempt to reverse engineer or hack our systems</li>
                  <li>Not use the service to generate harmful or misleading content</li>
                  <li>Respect the rights and privacy of others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Content and Intellectual Property</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your Content</h3>
                    <p className="text-muted-foreground">
                      You retain ownership of any content you upload to our service. By uploading content, you grant us
                      a temporary license to process and analyze your content solely for the purpose of providing our
                      services. We do not claim ownership of your uploaded content.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Generated Content</h3>
                    <p className="text-muted-foreground">
                      Content generated by our AI tools is provided to you for your use. However, you are responsible
                      for ensuring that any generated content complies with applicable laws and does not infringe on
                      third-party rights.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Intellectual Property</h3>
                    <p className="text-muted-foreground">
                      The Veo3 Prompt Generator service, including its design, functionality, and underlying technology,
                      is protected by copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
                <p className="text-muted-foreground">
                  We strive to maintain high service availability, but we do not guarantee that our service will be
                  available at all times. The service may be temporarily unavailable due to maintenance, updates, or
                  technical issues. We reserve the right to modify, suspend, or discontinue any part of our service at
                  any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by applicable law, Veo3 Prompt Generator shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
                  losses, resulting from your use of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                  service, to understand our practices regarding the collection and use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and access to the service immediately, without prior notice
                  or liability, for any reason whatsoever, including without limitation if you breach the Terms of
                  Service. Upon termination, your right to use the service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify users of any changes by posting
                  the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the
                  service after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms of Service and any separate agreements whereby we provide you services shall be governed
                  by and construed in accordance with the laws of the State of California, United States.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-muted rounded-lg p-4">
                                      <p className="font-medium">Email: veo3promptgenerator.online@gmail.com</p>
                  <p className="font-medium">Address: 123 Innovation Drive, San Francisco, CA 94105</p>
                  <p className="font-medium">Phone: +1 (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
