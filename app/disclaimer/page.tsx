import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer - Veo3 Prompt Generator | Legal Disclaimers & Terms",
  description: "Read our disclaimer for Veo3 Prompt Generator. Important legal information about AI-generated content, user responsibilities, and service limitations.",
  keywords: "disclaimer, legal disclaimer, Veo3 Prompt Generator disclaimer, AI content disclaimer, user responsibility, legal terms, service limitations, AI-generated content disclaimer, legal information, user agreement disclaimer",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer - Veo3 Prompt Generator | Legal Disclaimers & Terms",
    description: "Read our disclaimer for Veo3 Prompt Generator. Important legal information about AI-generated content, user responsibilities, and service limitations.",
    url: "https://veo3promptgenerator.online/disclaimer",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Disclaimer - Veo3 Prompt Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer - Veo3 Prompt Generator | Legal Disclaimers & Terms",
    description: "Read our disclaimer for Veo3 Prompt Generator. Important legal information about AI-generated content, user responsibilities, and service limitations.",
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

export default function DisclaimerPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-primary">Disclaimer</span>
          </h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">General Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by
                  law, Veo3 Prompt Generator excludes all representations, warranties, obligations, and liabilities
                  arising out of or in connection with this website and its contents or which is or may be provided by
                  any affiliates or any other third party, including in relation to any inaccuracies or omissions in
                  this website and/or the company's literature.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">AI-Generated Content</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our service uses artificial intelligence to analyze content and generate prompts for video creation.
                  Please be aware that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>AI-generated prompts and scripts may not always be 100% accurate or complete</li>
                  <li>The quality of output depends on the quality and clarity of input content</li>
                  <li>Generated content should be reviewed and verified before use in professional contexts</li>
                  <li>We do not guarantee the accuracy, completeness, or reliability of AI-generated content</li>
                  <li>AI models may occasionally produce unexpected or inappropriate results</li>
                  <li>Generated content may require human editing and refinement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">User Responsibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Users are responsible for:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Ensuring they have the right to upload and process any media content</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Not uploading content that violates intellectual property rights</li>
                  <li>Not uploading inappropriate, offensive, or illegal content</li>
                  <li>Verifying the accuracy and appropriateness of generated prompts before use</li>
                  <li>Ensuring generated content complies with platform guidelines and policies</li>
                  <li>Respecting copyright and trademark laws when using generated content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by applicable law, Veo3 Prompt Generator shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
                  losses, resulting from your use of our service, including but not limited to damages arising from the
                  use of AI-generated content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain high service availability, but we do not guarantee that our service will be
                  available at all times. The service may be temporarily unavailable due to maintenance, updates, or
                  technical issues. We reserve the right to modify, suspend, or discontinue any part of our service at
                  any time without notice. AI processing times may vary based on system load and content complexity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Third-Party Content and Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites, services, or reference third-party content. We
                  do not endorse, warrant, or assume responsibility for the accuracy or reliability of any information
                  offered by third-party websites or services. Users access third-party content at their own risk. We
                  are not responsible for the availability, content, or practices of external sites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Professional Advice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information and tools provided by Veo3 Prompt Generator are for general informational purposes
                  only and should not be considered as professional advice. Users should consult with qualified
                  professionals for specific advice related to their particular circumstances, especially for commercial
                  or professional video production projects.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we provide tools to generate content, users are responsible for ensuring that their use of
                  generated content does not infringe on the intellectual property rights of others. We do not guarantee
                  that generated content is free from copyright, trademark, or other intellectual property claims. Users
                  should conduct their own due diligence before using generated content commercially.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Processing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI processing involves analyzing uploaded content to generate prompts and scripts. While we
                  implement security measures and delete uploaded files immediately after processing, users should be
                  aware that any content uploaded to our service will be processed by our AI systems. Users should not
                  upload confidential or sensitive information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to This Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon
                  posting on this website. Your continued use of our service after any changes constitutes acceptance of
                  the new disclaimer. We encourage users to review this disclaimer periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this disclaimer, please contact us at:
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
