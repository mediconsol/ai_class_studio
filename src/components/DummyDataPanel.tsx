import { useState } from "react";
import { Database, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { DummyData } from "@/data/types";
import { toast } from "@/hooks/use-toast";

interface DummyDataPanelProps {
  dummyData: DummyData[];
  onSelect?: (data: DummyData) => void;
  selectedId?: string;
}

const categoryLabels: Record<string, string> = {
  nursing: "간호",
  admin: "행정",
  medical: "의료",
  general: "일반",
};

const DummyDataPanel = ({ dummyData, onSelect, selectedId }: DummyDataPanelProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (data: DummyData, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(data.content);
    setCopiedId(data.id);
    toast({
      title: "복사 완료",
      description: `"${data.title}" 데이터가 클립보드에 복사되었습니다.`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelect = (data: DummyData) => {
    onSelect?.(data);
    toast({
      title: "데이터 선택됨",
      description: `"${data.title}"이(가) 프롬프트에 삽입됩니다.`,
    });
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  if (dummyData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Database className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>이 차시에는 예제데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-4 h-4 text-primary" />
        <h4 className="font-medium text-foreground text-sm">실습용 예제데이터</h4>
        <span className="text-xs text-muted-foreground">({dummyData.length}개)</span>
      </div>

      {dummyData.map((data) => (
        <div
          key={data.id}
          className={`
            rounded-lg border transition-all duration-200 cursor-pointer
            ${selectedId === data.id
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
            }
          `}
          onClick={() => handleSelect(data)}
        >
          <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-foreground text-sm truncate">
                    {data.title}
                  </h5>
                  {data.category && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground">
                      {categoryLabels[data.category] || data.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {data.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => handleCopy(data, e)}
                  className="p-1.5 rounded hover:bg-muted transition-colors"
                  title="복사"
                >
                  {copiedId === data.id ? (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={(e) => toggleExpand(data.id, e)}
                  className="p-1.5 rounded hover:bg-muted transition-colors"
                  title={expandedId === data.id ? "접기" : "펼치기"}
                >
                  {expandedId === data.id ? (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {expandedId === data.id && (
              <div className="mt-3 p-3 rounded bg-muted/50 border border-border/50">
                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {data.content}
                </pre>
              </div>
            )}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground mt-4 px-1">
        데이터를 클릭하면 프롬프트에 자동 삽입됩니다
      </p>
    </div>
  );
};

export default DummyDataPanel;
