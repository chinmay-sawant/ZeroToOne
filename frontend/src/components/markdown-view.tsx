import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownViewProps = {
  content: string
}

export function MarkdownView({ content }: MarkdownViewProps) {
  return (
    <div className="prose-roadmap">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
