import { useState } from "react";
import { ListChecks, ChevronRight, Lightbulb, Check } from "lucide-react";
import { Exercise } from "@/data/types";

interface ExerciseGuideProps {
  exercises: Exercise[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

const ExerciseGuide = ({ exercises, currentStep = 1, onStepChange }: ExerciseGuideProps) => {
  const [expandedStep, setExpandedStep] = useState<number>(currentStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepClick = (step: number) => {
    setExpandedStep(expandedStep === step ? -1 : step);
    onStepChange?.(step);
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

  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <ListChecks className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>이 차시에는 실습 단계가 없습니다.</p>
      </div>
    );
  }

  const completedCount = completedSteps.size;
  const progressPercent = (completedCount / exercises.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-foreground text-sm">실습 단계</h4>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{exercises.length} 완료
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Exercise steps */}
      <div className="space-y-2">
        {exercises.map((exercise) => {
          const isExpanded = expandedStep === exercise.step;
          const isCompleted = completedSteps.has(exercise.step);
          const isCurrent = currentStep === exercise.step;

          return (
            <div
              key={exercise.step}
              className={`
                rounded-lg border transition-all duration-200
                ${isCompleted
                  ? "border-primary/30 bg-primary/5"
                  : isCurrent
                    ? "border-primary bg-card shadow-sm"
                    : "border-border hover:border-primary/50"
                }
              `}
            >
              {/* Step header */}
              <button
                onClick={() => handleStepClick(exercise.step)}
                className="w-full p-3 flex items-center gap-3 text-left"
              >
                <button
                  onClick={(e) => toggleComplete(exercise.step, e)}
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                    border-2 transition-all duration-200
                    ${isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">
                      {exercise.step}
                    </span>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h5 className={`
                    font-medium text-sm truncate
                    ${isCompleted ? "text-muted-foreground line-through" : "text-foreground"}
                  `}>
                    {exercise.title}
                  </h5>
                </div>

                <ChevronRight
                  className={`
                    w-4 h-4 text-muted-foreground transition-transform duration-200
                    ${isExpanded ? "rotate-90" : ""}
                  `}
                />
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0">
                  <div className="pl-9 space-y-3">
                    {/* Instruction */}
                    <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                      {exercise.instruction}
                    </div>

                    {/* Hint */}
                    {exercise.hint && (
                      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                        <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800">{exercise.hint}</p>
                      </div>
                    )}

                    {/* Expected output preview */}
                    {exercise.expectedOutput && (
                      <details className="group">
                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                          예상 결과 보기
                        </summary>
                        <div className="mt-2 p-3 rounded bg-muted/50 border border-border/50">
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
  );
};

export default ExerciseGuide;
