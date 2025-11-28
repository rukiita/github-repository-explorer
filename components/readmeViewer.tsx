import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // テーブルや打ち消し線に対応
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface ReadmeViewerProps {
  content: string | null | undefined;
  isLoading: boolean;
}

export default function ReadmeViewer({
  content,
  isLoading,
}: ReadmeViewerProps) {
  if (isLoading) {
    return <div className="h-96 w-full bg-muted animate-pulse rounded-lg" />;
  }

  if (!content) {
    return (
      <div className="p-8 text-center text-muted-foreground border rounded-lg">
        README.md not found.
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 border-b py-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          README.md
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white dark:bg-slate-950">
        <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </CardContent>
    </Card>
  );
}
