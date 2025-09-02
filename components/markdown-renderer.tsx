"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"

// Import stylesheets for KaTeX and Prism syntax highlighting
import "katex/dist/katex.min.css"
import "prism-themes/themes/prism-vsc-dark-plus.css"

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-headings:font-semibold">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeSlug, 
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeKatex,
          [rehypePrism, { showLineNumbers: true }]
        ]}
        components={{
          h1: ({ node, ...props }) => <h1 className="border-b pb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="border-b pb-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 pl-4 italic text-muted-foreground" {...props} />
          ),
          // Custom component for the <pre> tag to style code blocks
          pre: ({ node, ...props }) => (
            <div className="my-6 rounded-lg overflow-hidden">
                <pre {...props} />
            </div>
          ),
          // Inline code styling
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="rounded bg-muted px-1.5 py-1 font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }
            // For block code, we let rehype-prism-plus handle it via the `pre` component.
            return <code className={className} {...props}>{children}</code>;
          },
          table: (props) => (
            <div className="my-6 overflow-x-auto rounded-lg border">
              <table className="w-full text-left" {...props} />
            </div>
          ),
          th: (props) => <th className="bg-muted px-4 py-2 font-medium" {...props} />,
          td: (props) => <td className="border-t px-4 py-2 align-top" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
