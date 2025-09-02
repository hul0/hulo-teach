"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="mdx-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
        components={{
          h1: ({ node, ...props }) => <h1 className="mt-6 mb-3 text-2xl md:text-3xl font-semibold" {...props} />,
          h2: ({ node, ...props }) => <h2 className="mt-6 mb-3 text-xl md:text-2xl font-semibold" {...props} />,
          h3: ({ node, ...props }) => <h3 className="mt-5 mb-2 text-lg font-semibold" {...props} />,
          p: ({ node, ...props }) => <p className="my-3 leading-relaxed" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
          ul: ({ node, ...props }) => <ul className="my-3 list-disc pl-6 space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="my-3 list-decimal pl-6 space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-4 border-l-2 pl-4 italic text-muted-foreground" {...props} />
          ),
          code: ({ inline, className, children, ...props }) =>
            inline ? (
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <pre className="my-4 overflow-x-auto rounded border bg-muted p-3">
                <code className="font-mono text-sm">{children}</code>
              </pre>
            ),
          hr: (props) => <hr className="my-6 border-muted" {...props} />,
          table: (props) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full text-sm" {...props} />
            </div>
          ),
          th: (props) => <th className="border px-2 py-1 text-left" {...props} />,
          td: (props) => <td className="border px-2 py-1 align-top" {...props} />,
          img: ({ node, ...props }) => <img className="my-4 rounded" alt="" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
