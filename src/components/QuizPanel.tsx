import { useState } from "react";
import { Quiz } from "@/data/types";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, HelpCircle } from "lucide-react";

interface QuizPanelProps {
  quizzes: Quiz[];
}

type AnswerState = {
  [quizId: string]: {
    selected: string | null;
    submitted: boolean;
  };
};

const QuizPanel = ({ quizzes }: QuizPanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuiz = quizzes[currentIndex];
  const currentAnswer = answers[currentQuiz?.id];

  const handleSelect = (value: string) => {
    if (currentAnswer?.submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuiz.id]: {
        selected: value,
        submitted: false,
      },
    }));
  };

  const handleSubmit = () => {
    if (!currentAnswer?.selected) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuiz.id]: {
        ...prev[currentQuiz.id],
        submitted: true,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const getScore = () => {
    return quizzes.reduce((score, quiz) => {
      const answer = answers[quiz.id];
      if (answer?.submitted && answer.selected === quiz.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const isCorrect = currentAnswer?.submitted && currentAnswer.selected === currentQuiz?.correctAnswer;
  const isWrong = currentAnswer?.submitted && currentAnswer.selected !== currentQuiz?.correctAnswer;

  if (!currentQuiz) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        퀴즈가 없습니다.
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / quizzes.length) * 100);

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            {percentage >= 80 ? (
              <CheckCircle2 className="w-10 h-10 text-primary" />
            ) : (
              <HelpCircle className="w-10 h-10 text-amber-500" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">퀴즈 완료!</h2>
          <p className="text-muted-foreground mb-6">
            {quizzes.length}문제 중 {score}문제 정답
          </p>

          <div className="text-5xl font-bold text-primary mb-6">{percentage}점</div>

          <p className="text-sm text-muted-foreground mb-8">
            {percentage >= 80
              ? "훌륭합니다! 이 차시의 핵심 내용을 잘 이해하셨습니다."
              : percentage >= 60
              ? "좋습니다! 조금 더 복습하면 완벽해질 거예요."
              : "슬라이드를 다시 한번 복습해보시는 것을 권장합니다."}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              다시 풀기
            </button>
          </div>

          {/* 문제별 결과 */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">문제별 결과</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {quizzes.map((quiz, index) => {
                const answer = answers[quiz.id];
                const correct = answer?.selected === quiz.correctAnswer;
                return (
                  <button
                    key={quiz.id}
                    onClick={() => {
                      setShowResults(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      correct
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>문제 {currentIndex + 1} / {quizzes.length}</span>
          <span>{currentQuiz.type === 'ox' ? 'O/X 퀴즈' : '4지선다'}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl border border-border p-8">
        {/* Question */}
        <h2 className="text-xl font-semibold text-foreground mb-8 leading-relaxed">
          {currentQuiz.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuiz.type === 'ox' ? (
            // O/X 퀴즈
            <div className="grid grid-cols-2 gap-4">
              {['O', 'X'].map((option) => {
                const isSelected = currentAnswer?.selected === option;
                const showCorrect = currentAnswer?.submitted && option === currentQuiz.correctAnswer;
                const showWrong = currentAnswer?.submitted && isSelected && option !== currentQuiz.correctAnswer;

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={currentAnswer?.submitted}
                    className={`
                      py-6 rounded-xl text-2xl font-bold transition-all
                      ${showCorrect
                        ? "bg-green-100 border-2 border-green-500 text-green-700"
                        : showWrong
                        ? "bg-red-100 border-2 border-red-500 text-red-700"
                        : isSelected
                        ? "bg-primary/10 border-2 border-primary text-primary"
                        : "bg-muted border-2 border-transparent text-foreground hover:bg-muted/80"
                      }
                      ${currentAnswer?.submitted ? "cursor-default" : "cursor-pointer"}
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            // 4지선다
            currentQuiz.options?.map((option) => {
              const isSelected = currentAnswer?.selected === option.id;
              const showCorrect = currentAnswer?.submitted && option.id === currentQuiz.correctAnswer;
              const showWrong = currentAnswer?.submitted && isSelected && option.id !== currentQuiz.correctAnswer;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={currentAnswer?.submitted}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all flex items-center gap-4
                    ${showCorrect
                      ? "bg-green-100 border-2 border-green-500"
                      : showWrong
                      ? "bg-red-100 border-2 border-red-500"
                      : isSelected
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted border-2 border-transparent hover:bg-muted/80"
                    }
                    ${currentAnswer?.submitted ? "cursor-default" : "cursor-pointer"}
                  `}
                >
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0
                    ${showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border border-border"
                    }
                  `}>
                    {option.id.toUpperCase()}
                  </span>
                  <span className={`
                    text-base
                    ${showCorrect ? "text-green-700 font-medium" : showWrong ? "text-red-700" : "text-foreground"}
                  `}>
                    {option.text}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Feedback */}
        {currentAnswer?.submitted && (
          <div className={`p-4 rounded-xl mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className={`font-medium mb-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isCorrect ? "정답입니다!" : "오답입니다."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentQuiz.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <div>
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                이전 문제
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {!currentAnswer?.submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!currentAnswer?.selected}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-colors
                  ${currentAnswer?.selected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                  }
                `}
              >
                정답 확인
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {currentIndex < quizzes.length - 1 ? "다음 문제" : "결과 보기"}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-6 flex justify-center gap-2">
        {quizzes.map((quiz, index) => {
          const answer = answers[quiz.id];
          const isAnswered = answer?.submitted;
          const correct = answer?.selected === quiz.correctAnswer;

          return (
            <button
              key={quiz.id}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-8 h-8 rounded-lg text-xs font-medium transition-colors
                ${index === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : isAnswered
                  ? correct
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPanel;
