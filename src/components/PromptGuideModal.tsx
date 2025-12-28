import { useState } from "react";
import { X, Lightbulb, CheckCircle2, XCircle, Thermometer, Code2, ArrowRight } from "lucide-react";
import { PromptGuide } from "@/data/types";

interface PromptGuideModalProps {
  guide: PromptGuide;
}

const PromptGuideModal = ({ guide }: PromptGuideModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'strategy' | 'comparison' | 'practice' | 'checklist'>('strategy');

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-36 z-40 flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
      >
        <Lightbulb className="w-4 h-4" />
        <span className="text-sm font-medium">프롬프트 설계</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
      <div
        className="relative w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-lg">프롬프트 설계 가이드</h2>
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
            { key: 'strategy', label: '프롬프트 전략', icon: Thermometer },
            { key: 'comparison', label: '나쁜 예 vs 좋은 예', icon: ArrowRight },
            { key: 'practice', label: '직접 실습', icon: Code2 },
            { key: 'checklist', label: '체크리스트', icon: CheckCircle2 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`
                flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2
                ${activeTab === key
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
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
          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {guide.strategy.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {guide.strategy.description}
                </p>
              </div>

              {/* Temperature Setting */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">
                    Temperature 설정: {guide.strategy.temperature}
                  </h4>
                </div>
                <p className="text-sm text-orange-800">
                  {guide.strategy.temperatureReason}
                </p>
              </div>

              {/* Key Points */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">핵심 포인트</h4>
                <div className="grid gap-3">
                  {guide.strategy.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-purple-900">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bad Example */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-900">
                      {guide.comparison.bad.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xs font-medium text-red-700 mb-2">프롬프트</p>
                      <pre className="text-sm text-red-900 whitespace-pre-wrap font-mono">
                        {guide.comparison.bad.userPrompt}
                      </pre>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-2">AI 응답</p>
                      <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                        {guide.comparison.bad.output}
                      </pre>
                    </div>

                    {guide.comparison.bad.issues && guide.comparison.bad.issues.length > 0 && (
                      <div className="p-3 rounded-lg bg-red-100 border border-red-300">
                        <p className="text-xs font-medium text-red-800 mb-2">문제점</p>
                        <ul className="space-y-1">
                          {guide.comparison.bad.issues.map((issue, idx) => (
                            <li key={idx} className="text-xs text-red-800 flex items-start gap-2">
                              <span className="text-red-600">•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Good Example */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">
                      {guide.comparison.good.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs font-medium text-blue-700 mb-2">시스템 프롬프트</p>
                      <pre className="text-xs text-blue-900 whitespace-pre-wrap font-mono mb-3">
                        {guide.comparison.good.systemPrompt}
                      </pre>
                      <p className="text-xs font-medium text-blue-700 mb-2">사용자 프롬프트</p>
                      <pre className="text-sm text-blue-900 whitespace-pre-wrap font-mono">
                        {guide.comparison.good.userPrompt}
                      </pre>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-xs font-medium text-green-700 mb-2">AI 응답</p>
                      <pre className="text-sm text-green-900 whitespace-pre-wrap">
                        {guide.comparison.good.output}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {guide.practice.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {guide.practice.instruction}
                </p>
              </div>

              {/* Base Prompt */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">개선 전 프롬프트</p>
                <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono p-4 bg-white rounded-lg border border-gray-200">
                  {guide.practice.basePrompt}
                </pre>
              </div>

              {/* Improvement Hints */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  개선 힌트
                </h4>
                <div className="grid gap-3">
                  {guide.practice.improvementHints.map((hint, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-amber-900">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 <strong>실습 방법:</strong> AI 패널에서 위 힌트를 참고하여 프롬프트를 개선해보세요.
                  시스템/사용자 프롬프트로 분리하고, 제약 조건을 명확히 추가해보세요.
                </p>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  프롬프트 품질 체크리스트
                </h3>
                <p className="text-muted-foreground">
                  프롬프트 작성 후 아래 항목을 확인하세요
                </p>
              </div>

              <div className="grid gap-3">
                {guide.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-muted-foreground">
            프롬프트 설계 원리를 이해하고 할루시네이션을 최소화하세요
          </p>
        </div>
      </div>
        </div>
      )}
    </>
  );
};

export default PromptGuideModal;
