import { useState } from "react";
import { X, ListChecks, ChevronRight, Lightbulb, Check } from "lucide-react";
import { Exercise } from "@/data/types";

interface ExerciseGuidePanelProps {
  exercises: Exercise[];
}

const ExerciseGuidePanel = ({ exercises }: ExerciseGuidePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (exercises.length === 0) return null;

  const handleStepClick = (step: number) => {
    setExpandedStep(expandedStep === step ? -1 : step);
  };

  const toggleComplete = (step: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      return next;
    });
  };

  const completedCount = completedSteps.size;
  const progressPercent = (completedCount / exercises.length) * 100;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-20 z-40 flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
      >
        <ListChecks className="w-4 h-4" />
        <span className="text-sm font-medium">실습 단계</span>
        <span className="px-1.5 py-0.5 bg-primary-foreground/20 rounded-full text-xs font-semibold">
          {completedCount}/{exercises.length}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">실습 단계</h2>
                  <p className="text-xs text-muted-foreground">
                    총 {exercises.length}단계 실습 가이드
                  </p>
                </div>
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
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">진행률</span>
                  <span className="text-sm text-muted-foreground">
                    {completedCount}/{exercises.length} 완료
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Exercise steps */}
              <div className="space-y-3">
                {exercises.map((exercise) => {
                  const isExpanded = expandedStep === exercise.step;
                  const isCompleted = completedSteps.has(exercise.step);

                  return (
                    <div
                      key={exercise.step}
                      className={`
                        rounded-xl border transition-all duration-200
                        ${isCompleted
                          ? "border-primary/30 bg-primary/5"
                          : "border-border hover:border-primary/50 bg-card"
                        }
                      `}
                    >
                      {/* Step header */}
                      <button
                        onClick={() => handleStepClick(exercise.step)}
                        className="w-full p-4 flex items-center gap-3 text-left"
                      >
                        <button
                          onClick={(e) => toggleComplete(exercise.step, e)}
                          className={`
                            flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                            border-2 transition-all duration-200
                            ${isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border hover:border-primary"
                            }
                          `}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">
                              {exercise.step}
                            </span>
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h5 className={`
                            font-medium text-base
                            ${isCompleted ? "text-muted-foreground line-through" : "text-foreground"}
                          `}>
                            {exercise.title}
                          </h5>
                        </div>

                        <ChevronRight
                          className={`
                            w-5 h-5 text-muted-foreground transition-transform duration-200
                            ${isExpanded ? "rotate-90" : ""}
                          `}
                        />
                      </button>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="pl-10 space-y-3">
                            {/* Instruction */}
                            <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                              {exercise.instruction}
                            </div>

                            {/* Hint */}
                            {exercise.hint && (
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800">{exercise.hint}</p>
                              </div>
                            )}

                            {/* Expected output preview */}
                            {exercise.expectedOutput && (
                              <details className="group">
                                <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                                  예상 결과 보기
                                </summary>
                                <div className="mt-2 p-4 rounded-lg bg-muted/50 border border-border/50">
                                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                                    {exercise.expectedOutput}
                                  </pre>
                                </div>
                              </details>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t bg-gray-50 text-center">
              <p className="text-xs text-muted-foreground">
                각 단계를 순서대로 따라하며 AI 활용법을 익히세요
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseGuidePanel;
