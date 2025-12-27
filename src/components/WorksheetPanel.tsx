import { useState } from "react";
import { ClipboardList, Save, RotateCcw, Check, AlertCircle } from "lucide-react";
import { Worksheet, WorksheetField } from "@/data/types";
import { toast } from "@/hooks/use-toast";

interface WorksheetPanelProps {
  worksheets: Worksheet[];
}

interface FieldValue {
  [fieldId: string]: string | string[];
}

interface WorksheetValues {
  [worksheetId: string]: FieldValue;
}

const WorksheetPanel = ({ worksheets }: WorksheetPanelProps) => {
  const [activeWorksheet, setActiveWorksheet] = useState<string>(worksheets[0]?.id || "");
  const [values, setValues] = useState<WorksheetValues>({});
  const [savedWorksheets, setSavedWorksheets] = useState<Set<string>>(new Set());

  const currentWorksheet = worksheets.find((w) => w.id === activeWorksheet);

  const handleFieldChange = (worksheetId: string, fieldId: string, value: string | string[]) => {
    setValues((prev) => ({
      ...prev,
      [worksheetId]: {
        ...prev[worksheetId],
        [fieldId]: value,
      },
    }));
    // Remove from saved when edited
    setSavedWorksheets((prev) => {
      const next = new Set(prev);
      next.delete(worksheetId);
      return next;
    });
  };

  const handleChecklistToggle = (worksheetId: string, fieldId: string, option: string) => {
    const currentValue = (values[worksheetId]?.[fieldId] as string[]) || [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter((v) => v !== option)
      : [...currentValue, option];
    handleFieldChange(worksheetId, fieldId, newValue);
  };

  const handleSave = () => {
    if (!currentWorksheet) return;

    // Check required fields
    const missingFields = currentWorksheet.fields.filter(
      (field) => field.required && !values[currentWorksheet.id]?.[field.id]
    );

    if (missingFields.length > 0) {
      toast({
        title: "필수 항목 누락",
        description: `${missingFields.map((f) => f.label).join(", ")}을(를) 입력해주세요.`,
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage for persistence
    const storageKey = `worksheet-${currentWorksheet.id}`;
    localStorage.setItem(storageKey, JSON.stringify(values[currentWorksheet.id]));

    setSavedWorksheets((prev) => new Set(prev).add(currentWorksheet.id));
    toast({
      title: "저장 완료",
      description: `"${currentWorksheet.title}"이(가) 저장되었습니다.`,
    });
  };

  const handleReset = () => {
    if (!currentWorksheet) return;
    setValues((prev) => ({
      ...prev,
      [currentWorksheet.id]: {},
    }));
    setSavedWorksheets((prev) => {
      const next = new Set(prev);
      next.delete(currentWorksheet.id);
      return next;
    });
  };

  const renderField = (field: WorksheetField, worksheetId: string) => {
    const fieldValue = values[worksheetId]?.[field.id];

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={(fieldValue as string) || ""}
            onChange={(e) => handleFieldChange(worksheetId, field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        );

      case "textarea":
        return (
          <textarea
            value={(fieldValue as string) || ""}
            onChange={(e) => handleFieldChange(worksheetId, field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
          />
        );

      case "select":
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleFieldChange(worksheetId, field.id, option)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${fieldValue === option
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case "checklist":
        return (
          <div className="flex gap-3">
            {field.options?.map((option) => {
              const isChecked = ((fieldValue as string[]) || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleChecklistToggle(worksheetId, field.id, option)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isChecked
                      ? option === "예"
                        ? "bg-primary text-primary-foreground"
                        : "bg-destructive/10 text-destructive border border-destructive/30"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }
                  `}
                >
                  {isChecked && <Check className="w-4 h-4" />}
                  {option}
                </button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  if (worksheets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>이 차시에는 워크시트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground mb-1">
            과제 워크시트
          </h2>
          <p className="text-muted-foreground">
            아래 양식을 작성하여 과제를 정의하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-colors shadow-soft"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
        </div>
      </div>

      {/* Worksheet Tabs (if multiple) */}
      {worksheets.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {worksheets.map((worksheet) => (
            <button
              key={worksheet.id}
              onClick={() => setActiveWorksheet(worksheet.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${activeWorksheet === worksheet.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              {savedWorksheets.has(worksheet.id) && (
                <Check className="w-4 h-4" />
              )}
              {worksheet.title}
            </button>
          ))}
        </div>
      )}

      {/* Worksheet Content */}
      {currentWorksheet && (
        <div className="ai-panel p-6">
          {/* Worksheet Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {currentWorksheet.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentWorksheet.description}
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-6">
            {currentWorksheet.fields.map((field) => (
              <div key={field.id}>
                <label className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-foreground">{field.label}</span>
                  {field.required && (
                    <span className="text-xs text-destructive">*필수</span>
                  )}
                </label>
                {renderField(field, currentWorksheet.id)}
              </div>
            ))}
          </div>

          {/* Completion Status */}
          {savedWorksheets.has(currentWorksheet.id) && (
            <div className="mt-6 flex items-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                이 워크시트가 저장되었습니다
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-900 mb-1">작성 팁</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>- 실제 업무 상황을 구체적으로 작성하세요</li>
              <li>- 범위를 명확히 하면 실현 가능성이 높아집니다</li>
              <li>- 저장된 내용은 브라우저에 보관됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetPanel;
