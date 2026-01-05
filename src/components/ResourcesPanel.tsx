import { useState } from "react";
import { FileText, Copy, Check, Tag } from "lucide-react";
import { Resource } from "@/data/types";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResourcesPanelProps {
  resources: Resource[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "pdf":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "template":
      return "bg-primary/10 text-primary";
    case "link":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "video":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "document":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "pdf":
      return "PDF";
    case "template":
      return "템플릿";
    case "link":
      return "링크";
    case "video":
      return "영상";
    case "document":
      return "문서";
    default:
      return type;
  }
};

const ResourcesPanel = ({ resources }: ResourcesPanelProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (content: string, title: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      toast({
        title: "복사 완료",
        description: `"${title}" 내용이 클립보드에 복사되었습니다.`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "클립보드에 복사할 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  // content가 있는 자료만 필터링
  const resourcesWithContent = resources.filter((r) => r.content);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-1">
            학습 자료
          </h2>
          <p className="text-muted-foreground">
            자료를 펼쳐서 내용을 확인하고 복사하여 시연에 활용하세요
          </p>
        </div>
        <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          총 {resourcesWithContent.length}개 자료
        </span>
      </div>

      {/* Resources Accordion */}
      {resourcesWithContent.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-3">
          {resourcesWithContent.map((resource, index) => (
            <AccordionItem
              key={resource.id}
              value={resource.id}
              className="border border-border rounded-lg overflow-hidden animate-slide-up bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/30">
                <div className="flex items-start gap-5 flex-1 text-left">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-base">
                        {resource.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        {getTypeLabel(resource.type)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {resource.description}
                    </p>
                    {resource.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-2">
                  {/* Content Display */}
                  <div className="p-5 rounded-lg bg-muted/30 border border-border">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                      {resource.content}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        handleCopy(resource.content!, resource.title, resource.id)
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-soft disabled:opacity-50"
                      disabled={!resource.content}
                    >
                      {copiedId === resource.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          복사하기
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>이 차시에는 복사 가능한 자료가 없습니다.</p>
          <p className="text-sm mt-2">추후 자료가 추가될 예정입니다.</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              자료 활용 팁
            </h4>
            <p className="text-sm text-muted-foreground">
              자료를 펼쳐서 내용을 확인하고, 복사 버튼을 클릭하여 클립보드에 복사한 후
              AI 시연 탭에서 바로 붙여넣어 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel;
