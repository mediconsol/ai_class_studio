import { useState } from "react";
import { X, Lightbulb, CheckCircle2, XCircle, Sparkles, BookOpen } from "lucide-react";
import { PracticeGuide } from "@/data/types";

interface PracticeGuidePanelProps {
  guide: PracticeGuide;
}

const PracticeGuidePanel = ({ guide }: PracticeGuidePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all hover:scale-105"
      >
        <BookOpen className="w-4 h-4" />
        <span className="text-sm font-medium">실무 가이드</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">실무 가이드</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {/* 실무 활용 가이드 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {guide.usageGuide.title}
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Dos */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      이렇게 활용하세요
                    </p>
                    <ul className="space-y-2">
                      {guide.usageGuide.dos.map((item, idx) => (
                        <li key={idx} className="text-sm text-foreground pl-4 relative">
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                    <p className="text-sm font-medium text-destructive mb-3 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      이것은 대체하지 않습니다
                    </p>
                    <ul className="space-y-2">
                      {guide.usageGuide.donts.map((item, idx) => (
                        <li key={idx} className="text-sm text-foreground pl-4 relative">
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-destructive" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Message */}
                {guide.usageGuide.keyMessage && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <p className="text-sm text-primary font-medium leading-relaxed text-center">
                      {guide.usageGuide.keyMessage}
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <hr className="border-border my-5" />

              {/* 확장 활용 힌트 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {guide.extendedHints.title}
                  </h3>
                </div>

                <div className="grid gap-2">
                  {guide.extendedHints.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/30 border border-border/50 flex items-start gap-2"
                    >
                      <span className="text-accent font-medium">{idx + 1}.</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t bg-gray-50 text-center">
              <p className="text-xs text-muted-foreground">
                교육용 시연, 실습 예시, 병원 내부 가이드 목적
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PracticeGuidePanel;
