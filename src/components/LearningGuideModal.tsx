import { useState } from "react";
import { X, GraduationCap, Star, Lightbulb, AlertTriangle, CheckSquare } from "lucide-react";
import { LearningGuide } from "@/data/types";

interface LearningGuideModalProps {
  guide: LearningGuide;
}

const LearningGuideModal = ({ guide }: LearningGuideModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'keyTakeaways' | 'practicalConnection' | 'commonMistakes' | 'selfCheck'>('keyTakeaways');

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all hover:scale-105"
      >
        <GraduationCap className="w-4 h-4" />
        <span className="text-sm font-medium">학습 가이드</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-cyan-50">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                <h2 className="font-semibold text-lg">학습 가이드</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-gray-50">
              {[
                { key: 'keyTakeaways', label: '핵심 요약', icon: Star },
                { key: 'practicalConnection', label: '실무 연결', icon: Lightbulb },
                { key: 'commonMistakes', label: '흔한 오해', icon: AlertTriangle },
                { key: 'selfCheck', label: '자가 점검', icon: CheckSquare },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`
                    flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2
                    ${activeTab === key
                      ? 'text-teal-600 border-b-2 border-teal-600 bg-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Key Takeaways Tab */}
              {activeTab === 'keyTakeaways' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {guide.keyTakeaways.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      이 차시에서 꼭 기억해야 할 핵심 내용입니다
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {guide.keyTakeaways.points.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-teal-50 border border-teal-200"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-teal-900 flex-1">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Connection Tab */}
              {activeTab === 'practicalConnection' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {guide.practicalConnection.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      배운 내용을 실무에서 어떻게 활용할 수 있는지 알아보세요
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {guide.practicalConnection.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200"
                      >
                        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-900 flex-1">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Mistakes Tab */}
              {activeTab === 'commonMistakes' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {guide.commonMistakes.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      많은 분들이 오해하는 내용을 바로잡아보세요
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {guide.commonMistakes.mistakes.map((mistake, idx) => (
                      <div key={idx} className="grid md:grid-cols-2 gap-4">
                        {/* Myth */}
                        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <X className="w-4 h-4 text-red-600" />
                            <p className="text-xs font-medium text-red-700">잘못된 생각</p>
                          </div>
                          <p className="text-sm text-red-900">{mistake.myth}</p>
                        </div>

                        {/* Reality */}
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckSquare className="w-4 h-4 text-green-600" />
                            <p className="text-xs font-medium text-green-700">올바른 이해</p>
                          </div>
                          <p className="text-sm text-green-900">{mistake.reality}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Self Check Tab */}
              {activeTab === 'selfCheck' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {guide.selfCheck.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      학습 내용을 제대로 이해했는지 스스로 점검해보세요
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {guide.selfCheck.questions.map((question, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-blue-300 flex items-center justify-center mt-0.5">
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-sm text-blue-900 flex-1">{question}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
                    <p className="text-sm text-teal-800">
                      <strong>💡 Tip:</strong> 모든 질문에 자신있게 답할 수 있다면, 다음 차시로 진행하셔도 좋습니다!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t bg-gray-50 text-center">
              <p className="text-xs text-muted-foreground">
                이론을 실무와 연결하여 AI를 효과적으로 활용하세요
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LearningGuideModal;
