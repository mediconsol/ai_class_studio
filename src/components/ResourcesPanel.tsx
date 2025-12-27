import { FileText, Download, ExternalLink, Tag } from "lucide-react";
import { Resource } from "@/data/types";

interface ResourcesPanelProps {
  resources: Resource[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "pdf":
      return "bg-red-100 text-red-700";
    case "template":
      return "bg-primary/10 text-primary";
    case "link":
      return "bg-blue-100 text-blue-700";
    case "video":
      return "bg-purple-100 text-purple-700";
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
    default:
      return type;
  }
};

const ResourcesPanel = ({ resources }: ResourcesPanelProps) => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-1">
            학습 자료
          </h2>
          <p className="text-muted-foreground">
            강의에 필요한 자료를 다운로드하고 참고하세요
          </p>
        </div>
        <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          총 {resources.length}개 자료
        </span>
      </div>

      {/* Resources Grid */}
      {resources.length > 0 ? (
        <div className="grid gap-4">
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              className="ai-panel p-6 hover:shadow-elevated transition-all duration-200 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <FileText className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {resource.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2">
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
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors shadow-soft">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>이 차시에는 등록된 자료가 없습니다.</p>
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
              추가 자료가 필요하신가요?
            </h4>
            <p className="text-sm text-muted-foreground">
              강의 진행 중 필요한 자료가 있으시면 강사에게 문의해주세요.
              향후 자료 저장소 기능이 추가될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel;
