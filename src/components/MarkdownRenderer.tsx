import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = "" }: MarkdownRendererProps) => {
  const components: Components = {
    // 헤딩 스타일
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-foreground mt-6 mb-3 pb-1.5 border-b border-border/50">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-foreground mt-5 mb-2 flex items-center gap-2">
        <span className="w-1 h-5 bg-primary rounded-full" />
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-foreground mt-4 mb-2">
        {children}
      </h4>
    ),

    // 단락
    p: ({ children }) => (
      <p className="text-foreground leading-relaxed mb-3 last:mb-0">
        {children}
      </p>
    ),

    // 강조
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/90">{children}</em>
    ),

    // 리스트
    ul: ({ children }) => (
      <ul className="space-y-1.5 mb-4 ml-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-1.5 mb-4 ml-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-foreground leading-relaxed">
        <span className="flex-1">{children}</span>
      </li>
    ),

    // 인용
    blockquote: ({ children }) => (
      <blockquote className="relative my-4 pl-4 py-2 border-l-4 border-primary/60 bg-primary/5 rounded-r-lg italic">
        <div className="text-foreground/80">{children}</div>
      </blockquote>
    ),

    // 코드
    code: ({ className, children }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">
            {children}
          </code>
        );
      }
      const language = className?.replace("language-", "") || "";
      return (
        <div className="my-4 rounded-lg overflow-hidden border border-border">
          {language && (
            <div className="px-4 py-1.5 bg-muted/80 border-b border-border text-xs font-mono text-muted-foreground">
              {language}
            </div>
          )}
          <pre className="p-4 bg-muted/30 overflow-x-auto">
            <code className="font-mono text-sm text-foreground">{children}</code>
          </pre>
        </div>
      );
    },
    pre: ({ children }) => <>{children}</>,

    // 테이블
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-foreground">{children}</td>
    ),

    // 수평선
    hr: () => (
      <hr className="my-6 border-t border-border/50" />
    ),

    // 링크
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline font-medium"
      >
        {children}
      </a>
    ),

    // 이미지
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="my-4 rounded-lg max-w-full h-auto border border-border"
      />
    ),
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
