export default function PromptGuidePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Prompt Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Learn how to create effective prompts for AI video generation and get the best results from your creative
            projects.
          </p>

          <h2>Getting Started</h2>
          <p>
            Creating effective prompts is both an art and a science. This guide will help you understand the
            fundamentals of prompt engineering and how to apply them to video generation.
          </p>

          <h2>Basic Prompt Structure</h2>
          <p>A well-structured prompt should include:</p>
          <ul>
            <li>Clear description of the subject</li>
            <li>Specific actions or movements</li>
            <li>Setting and environment details</li>
            <li>Visual style and mood</li>
            <li>Technical specifications</li>
          </ul>

          <h2>Advanced Techniques</h2>
          <p>
            Once you master the basics, you can explore advanced prompting techniques to achieve more sophisticated
            results.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="mb-4">Try our AI-powered prompt generator to create professional prompts instantly.</p>
            <a href="/#generator" className="text-primary hover:underline font-medium">
              Generate Prompts Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
