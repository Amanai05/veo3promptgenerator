import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Veo3 Prompt Generator | Data Protection & Security",
  description: "Learn how Veo3 Prompt Generator protects your privacy and data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
  keywords: "privacy policy, data protection, Veo3 Prompt Generator privacy, user data security, GDPR compliance, data privacy, information security, user privacy, data collection policy, privacy protection, secure data handling",
  authors: [{ name: "Veo3 Prompt Generator Team" }],
  creator: "Veo3 Prompt Generator",
  publisher: "Veo3 Prompt Generator",
  metadataBase: new URL("https://veo3promptgenerator.online"),
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy - Veo3 Prompt Generator | Data Protection & Security",
    description: "Learn how Veo3 Prompt Generator protects your privacy and data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
    url: "https://veo3promptgenerator.online/privacy",
    siteName: "Veo3 Prompt Generator",
    images: [
      {
        url: "/images/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Veo3 Prompt Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Veo3 Prompt Generator | Data Protection & Security",
    description: "Learn how Veo3 Prompt Generator protects your privacy and data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
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

export default function PrivacyPage() {
  return (
    <main>
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Veo3 Prompt Generator, we take your privacy seriously. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit our website and use our services. Please
                  read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
                  do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <p className="text-muted-foreground mb-2">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Create an account on our platform</li>
                      <li>Contact us for support or inquiries</li>
                      <li>Subscribe to our newsletter or updates</li>
                      <li>Participate in surveys, contests, or promotions</li>
                      <li>Use our AI-powered tools and services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
                    <p className="text-muted-foreground mb-2">
                      We automatically collect certain information when you visit our website, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>IP address and browser information</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Device information and operating system</li>
                      <li>Referral sources and search terms</li>
                      <li>Interaction data with our tools and features</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Content and Media</h3>
                    <p className="text-muted-foreground">
                      When you upload videos, images, or other content to our service, we temporarily process this
                      content to generate prompts and provide our services. All uploaded files are automatically deleted
                      from our servers immediately after processing is complete, typically within minutes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Providing and maintaining our AI-powered services</li>
                  <li>Processing your requests and generating prompts</li>
                  <li>Sending you technical notices and support messages</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Improving our website, tools, and user experience</li>
                  <li>Analyzing usage patterns and service performance</li>
                  <li>Detecting and preventing fraud, abuse, or security issues</li>
                  <li>Complying with legal obligations and protecting our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. These measures
                  include encryption, secure data transmission, access controls, and regular security audits. However,
                  please note that no method of transmission over the internet or electronic storage is 100% secure, and
                  we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in
                  this Privacy Policy. Uploaded media files are deleted immediately after processing. Account
                  information is retained until you request deletion or close your account. Usage data may be retained
                  for analytical purposes in anonymized form.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites or services, and we may use third-party services
                  for analytics, payment processing, or other functions. We are not responsible for the privacy
                  practices of these third parties. We encourage you to read their privacy policies before providing any
                  personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal information</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than your own. We ensure that
                  such transfers comply with applicable data protection laws and implement appropriate safeguards to
                  protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
                  Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
