import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Copy, Check, Loader2, ChevronDown, RotateCcw, FileText, Table, List, ClipboardList, Clock, BarChart3, GitCompare, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { PracticeScenario, DummyData, PracticePrompt, DummyDataType, PromptType, OutputFormat, DifficultyLevel } from "@/data/types";
import { toast } from "@/hooks/use-toast";
import { AI_MODELS, generateAIResponse, getModelById, PROVIDER_INFO } from "@/services/ai";
import MarkdownRenderer from "./MarkdownRenderer";

interface PracticePanelProps {
  scenarios: PracticeScenario[];
  sessionTitle?: string;
}

const DATA_TYPE_CONFIG: Record<DummyDataType, { icon: string; label: string; color: string }> = {
  memo: { icon: "📝", label: "메모형", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  voice: { icon: "🎤", label: "음성전사", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  chat: { icon: "💬", label: "대화형", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  flawed: { icon: "⚠️", label: "함정데이터", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  role_switch: { icon: "👥", label: "역할전환", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
};

const ROLE_LABELS: Record<string, string> = {
  nurse: "간호사용",
  doctor: "의사용",
  admin: "원무과용",
  patient: "환자용",
  caregiver: "보호자용",
};

// 프롬프트 유형 설정
const PROMPT_TYPE_CONFIG: Record<PromptType, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
  summary: { icon: FileText, label: "요약", color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800" },
  convert: { icon: GitCompare, label: "변환", color: "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800" },
  analyze: { icon: Search, label: "분석", color: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800" },
  validate: { icon: CheckCircle2, label: "검증", color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800" },
  generate: { icon: Sparkles, label: "생성", color: "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800" },
  compare: { icon: BarChart3, label: "비교", color: "text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800" },
};

// 출력 형식 설정
const OUTPUT_FORMAT_CONFIG: Record<OutputFormat, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  text: { icon: FileText, label: "텍스트" },
  table: { icon: Table, label: "표" },
  list: { icon: List, label: "목록" },
  sbar: { icon: ClipboardList, label: "SBAR" },
  report: { icon: FileText, label: "보고서" },
  checklist: { icon: CheckCircle2, label: "체크리스트" },
  timeline: { icon: Clock, label: "타임라인" },
};

// 난이도 설정
const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; color: string; stars: number }> = {
  basic: { label: "기본", color: "text-green-600 bg-green-100 dark:bg-green-900/30", stars: 1 },
  intermediate: { label: "중급", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30", stars: 2 },
  advanced: { label: "심화", color: "text-red-600 bg-red-100 dark:bg-red-900/30", stars: 3 },
};

const PracticePanel = ({ scenarios, sessionTitle }: PracticePanelProps) => {
  // 시나리오 네비게이션
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  // 선택 상태
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

  // AI 실행 상태
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);

  // 모델 선택
  const [selectedModelId, setSelectedModelId] = useState("claude-haiku");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  // 현재 시나리오
  const currentScenario = scenarios[currentScenarioIndex];
  const currentData = currentScenario?.dummyDataList[selectedDataIndex];
  const currentPrompt = currentScenario?.prompts[selectedPromptIndex];
  const selectedModel = getModelById(selectedModelId);

  // 시나리오 네비게이션
  const goToPreviousScenario = useCallback(() => {
    setCurrentScenarioIndex((prev) => Math.max(0, prev - 1));
    setSelectedDataIndex(0);
    setSelectedPromptIndex(0);
    setResponse("");
  }, []);

  const goToNextScenario = useCallback(() => {
    setCurrentScenarioIndex((prev) => Math.min(scenarios.length - 1, prev + 1));
    setSelectedDataIndex(0);
    setSelectedPromptIndex(0);
    setResponse("");
  }, [scenarios.length]);

  // AI 실행
  const handleExecute = async () => {
    if (!currentData || !currentPrompt) return;

    setIsLoading(true);
    setResponse("");

    try {
      const userPrompt = currentPrompt.template.replace("{{data}}", currentData.content);

      const aiResponse = await generateAIResponse(
        selectedModelId,
        "당신은 의료 현장에서 일하는 전문가를 돕는 AI 어시스턴트입니다. 정확하고 실용적인 답변을 제공하세요.",
        userPrompt,
        { temperature: 0.3 }
      );
      setResponse(aiResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      toast({
        title: "AI 응답 실패",
        description: errorMessage,
        variant: "destructive",
      });
      setResponse(`오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 예상 결과 보기 (녹화용)
  const showExpectedOutput = () => {
    if (currentPrompt?.expectedOutput) {
      setResponse(currentPrompt.expectedOutput);
    }
  };

  // 복사
  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    toast({
      title: "복사 완료",
      description: "결과가 클립보드에 복사되었습니다.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // 리셋
  const handleReset = () => {
    setResponse("");
    setSelectedDataIndex(0);
    setSelectedPromptIndex(0);
  };

  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        실습 시나리오가 없습니다.
      </div>
    );
  }

  // 프롬프트에 데이터 삽입된 미리보기
  const getPromptPreview = () => {
    if (!currentPrompt || !currentData) return "";
    return currentPrompt.template.replace("{{data}}", currentData.content);
  };

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-220px)] animate-fade-in">
      {/* 상단: 시나리오 네비게이션 */}
      <div className="flex items-center justify-between bg-card rounded-xl border border-border p-3 flex-shrink-0">
        <button
          onClick={goToPreviousScenario}
          disabled={currentScenarioIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            currentScenarioIndex === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          이전 시나리오
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{sessionTitle}</span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold">
              시나리오 {currentScenario.id}/{scenarios.length}
            </span>
            <h2 className="font-semibold text-lg">{currentScenario.title}</h2>
          </div>
        </div>

        <button
          onClick={goToNextScenario}
          disabled={currentScenarioIndex >= scenarios.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            currentScenarioIndex >= scenarios.length - 1
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          다음 시나리오
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 시나리오 설명 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800 px-4 py-2 flex-shrink-0">
        <p className="text-blue-900 dark:text-blue-100 text-sm leading-relaxed">
          {currentScenario.description}
        </p>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 1. 더미데이터 선택 */}
        <div className="w-[320px] flex-shrink-0 flex flex-col bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
              더미데이터 선택
            </h3>
          </div>

          {/* 데이터 타입 탭 */}
          <div className="p-3 border-b border-border">
            <div className="flex flex-wrap gap-1.5">
              {currentScenario.dummyDataList.map((data, index) => {
                const typeConfig = data.dataType ? DATA_TYPE_CONFIG[data.dataType] : DATA_TYPE_CONFIG.memo;
                const isSelected = selectedDataIndex === index;
                return (
                  <button
                    key={data.id}
                    onClick={() => setSelectedDataIndex(index)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? `${typeConfig.color} ring-2 ring-offset-1 ring-current`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {typeConfig.icon} {data.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 선택된 데이터 표시 */}
          <div className="flex-1 overflow-auto p-4">
            {currentData && (
              <>
                {/* 역할 태그 (역할전환 데이터인 경우) */}
                {currentData.roleTarget && (
                  <div className="mb-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                      {ROLE_LABELS[currentData.roleTarget]}
                    </span>
                  </div>
                )}

                {/* 데이터 내용 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 mb-3 max-h-[400px] overflow-auto">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-slate-800 dark:text-slate-200">
                    {currentData.content}
                  </pre>
                </div>

                {/* 데이터 특징 설명 */}
                {currentData.characteristics && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                      <span className="text-amber-500">💡</span>
                      <span className="leading-relaxed">{currentData.characteristics}</span>
                    </p>
                  </div>
                )}

                {/* 함정 포인트 (함정 데이터인 경우) */}
                {currentData.trapPoints && currentData.trapPoints.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                    <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-2">⚠️ 함정 포인트:</p>
                    <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
                      {currentData.trapPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 2. 프롬프트 선택 및 미리보기 */}
        <div className="flex-1 flex flex-col bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
              프롬프트 선택
            </h3>
          </div>

          {/* 프롬프트 카드들 */}
          <div className="p-3 border-b border-border overflow-auto max-h-32 flex-shrink-0">
            <div className="grid grid-cols-3 gap-2">
              {currentScenario.prompts.map((prompt, index) => {
                const isSelected = selectedPromptIndex === index;
                const typeConfig = prompt.promptType ? PROMPT_TYPE_CONFIG[prompt.promptType] : null;
                const formatConfig = prompt.outputFormat ? OUTPUT_FORMAT_CONFIG[prompt.outputFormat] : null;
                const diffConfig = prompt.difficulty ? DIFFICULTY_CONFIG[prompt.difficulty] : null;
                const TypeIcon = typeConfig?.icon;
                const FormatIcon = formatConfig?.icon;

                return (
                  <button
                    key={prompt.id}
                    onClick={() => setSelectedPromptIndex(index)}
                    className={`p-2 rounded-lg text-left transition-all border ${
                      isSelected
                        ? "bg-primary/10 border-primary ring-2 ring-primary/30"
                        : "bg-card border-border hover:bg-muted/50 hover:border-muted-foreground/30"
                    }`}
                  >
                    {/* 프롬프트 제목 */}
                    <div className="font-medium text-xs mb-1.5 flex items-center gap-1.5">
                      {TypeIcon && (
                        <TypeIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-primary' : typeConfig?.color.split(' ')[0]}`} />
                      )}
                      <span className={`truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>{prompt.title}</span>
                    </div>

                    {/* 태그 영역 - 한 줄로 */}
                    <div className="flex items-center gap-1 overflow-hidden">
                      {/* 난이도 */}
                      {diffConfig && (
                        <span className={`px-1 py-0.5 rounded text-[9px] font-medium flex-shrink-0 ${diffConfig.color}`}>
                          {'★'.repeat(diffConfig.stars)}
                        </span>
                      )}

                      {/* 출력 형식 */}
                      {formatConfig && (
                        <span className="px-1 py-0.5 rounded text-[9px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-0.5 flex-shrink-0">
                          {FormatIcon && <FormatIcon className="w-2.5 h-2.5" />}
                        </span>
                      )}

                      {/* 첫번째 태그만 */}
                      {prompt.tags?.[0] && (
                        <span className="px-1 py-0.5 rounded text-[9px] font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 truncate">
                          {prompt.tags[0]}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 프롬프트 미리보기 */}
          <div className="flex-1 overflow-auto p-4 min-h-[250px]">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 h-full overflow-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                {getPromptPreview()}
              </pre>
            </div>
          </div>

          {/* 실행 버튼 영역 */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center gap-3">
              {/* 모델 선택 */}
              <div className="relative">
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors min-w-[140px]"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedModel ? PROVIDER_INFO[selectedModel.provider].color : '#888' }}
                  />
                  <span className="truncate">{selectedModel?.name || '모델 선택'}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                {isModelDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-1 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                    {AI_MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModelId(model.id);
                          setIsModelDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${
                          selectedModelId === model.id ? 'bg-muted' : ''
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: PROVIDER_INFO[model.provider].color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{model.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{model.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleExecute}
                disabled={isLoading || !currentData || !currentPrompt}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  isLoading || !currentData || !currentPrompt
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:opacity-90 shadow-soft"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI 실행 중...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    AI 실행
                  </>
                )}
              </button>

              <button
                onClick={showExpectedOutput}
                className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                title="녹화용 예상 결과 보기"
              >
                📋 예상 결과
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. AI 응답 및 해설 */}
        <div className="w-[400px] flex-shrink-0 flex flex-col bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
              AI 응답
            </h3>
            {response && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-primary" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    복사
                  </>
                )}
              </button>
            )}
          </div>

          {/* 응답 표시 */}
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="font-medium text-sm">AI가 응답을 생성하고 있습니다...</p>
              </div>
            ) : response ? (
              <div className="p-4">
                <MarkdownRenderer content={response} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                  <Play className="w-6 h-6" />
                </div>
                <p className="font-medium text-sm mb-1">아직 응답이 없습니다</p>
                <p className="text-xs">데이터와 프롬프트를 선택하고 실행하세요</p>
              </div>
            )}
          </div>

          {/* 결과 해설 */}
          {response && currentPrompt?.outputExplanation && (
            <div className="p-4 border-t border-border bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <h4 className="font-semibold text-sm text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
                📌 결과 해설
              </h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                {currentPrompt.outputExplanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 시나리오 마무리 멘트 */}
      {currentScenario.summary && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800 px-4 py-2 flex-shrink-0">
          <p className="text-purple-900 dark:text-purple-100 text-sm">
            <span className="font-semibold">📍 정리:</span> {currentScenario.summary}
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticePanel;
