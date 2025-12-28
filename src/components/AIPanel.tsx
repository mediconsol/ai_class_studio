import { useState } from "react";
import { Send, Copy, Check, Loader2, RotateCcw, PlusCircle, ChevronDown, Maximize2, X } from "lucide-react";
import { MediConsolLogo } from "./MediConsolLogo";
import { toast } from "@/hooks/use-toast";
import { PromptTemplate, DummyData, Exercise, PracticeGuide, PromptGuide, LearningGuide } from "@/data/types";
import DummyDataPanel from "./DummyDataPanel";
import ExerciseGuidePanel from "./ExerciseGuidePanel";
import PracticeGuidePanel from "./PracticeGuidePanel";
import PromptGuideModal from "./PromptGuideModal";
import LearningGuideModal from "./LearningGuideModal";
import MarkdownRenderer from "./MarkdownRenderer";
import { AI_MODELS, generateAIResponse, getModelById, PROVIDER_INFO } from "@/services/ai";

interface AIPanelProps {
  promptTemplates: PromptTemplate[];
  dummyData?: DummyData[];
  exercises?: Exercise[];
  practiceGuide?: PracticeGuide;
  promptGuide?: PromptGuide;
  learningGuide?: LearningGuide;
}

const AIPanel = ({ promptTemplates, dummyData, exercises, practiceGuide, promptGuide, learningGuide }: AIPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedDummyData, setSelectedDummyData] = useState<DummyData | null>(null);
  const [currentExerciseStep, setCurrentExerciseStep] = useState(1);
  const [selectedModelId, setSelectedModelId] = useState("claude-haiku");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);

  // Check if this is a practice session (has dummy data or exercises)
  const isPracticeMode = (dummyData && dummyData.length > 0) || (exercises && exercises.length > 0);

  const selectedModel = getModelById(selectedModelId);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      // 선택된 템플릿이 있으면 템플릿의 systemPrompt 사용, 없으면 기본 systemPrompt
      const systemPrompt = selectedTemplate?.systemPrompt || promptTemplates[0]?.systemPrompt || '';
      const userPrompt = prompt;

      // 템플릿에 설정된 temperature 사용 (없으면 기본값 0.2)
      const temperature = selectedTemplate?.temperature;
      const topP = selectedTemplate?.topP;

      const aiResponse = await generateAIResponse(
        selectedModelId,
        systemPrompt,
        userPrompt,
        { temperature, topP }
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    toast({
      title: "복사 완료",
      description: "결과가 클립보드에 복사되었습니다.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setSelectedDummyData(null);
    setSelectedTemplateId(null);
    setSelectedTemplate(null);
  };

  const handleTemplateClick = (template: PromptTemplate) => {
    setSelectedTemplateId(template.id);
    setSelectedTemplate(template);

    // userPrompt 사용 (기존 prompt 필드 대신)
    let userPrompt = template.userPrompt;

    // If there's selected dummy data, insert it into the prompt
    if (selectedDummyData) {
      if (userPrompt.includes("{데이터}")) {
        userPrompt = userPrompt.replace("{데이터}", selectedDummyData.content);
      } else {
        userPrompt = `${userPrompt}\n\n[입력 데이터]\n${selectedDummyData.content}`;
      }
    }

    setPrompt(userPrompt);
  };

  const handleDummyDataSelect = (data: DummyData) => {
    setSelectedDummyData(data);
    // If prompt already has content, append the dummy data
    if (prompt.trim()) {
      // Check if there's already a data section
      if (prompt.includes("[입력 데이터]")) {
        const parts = prompt.split("[입력 데이터]");
        setPrompt(`${parts[0]}[입력 데이터]\n${data.content}`);
      } else {
        setPrompt(`${prompt}\n\n[입력 데이터]\n${data.content}`);
      }
    }
  };

  const insertDummyData = () => {
    if (selectedDummyData) {
      if (prompt.includes("[입력 데이터]")) {
        const parts = prompt.split("[입력 데이터]");
        setPrompt(`${parts[0]}[입력 데이터]\n${selectedDummyData.content}`);
      } else {
        setPrompt(`${prompt}\n\n[입력 데이터]\n${selectedDummyData.content}`);
      }
      toast({
        title: "데이터 삽입됨",
        description: "프롬프트에 예제데이터가 추가되었습니다.",
      });
    }
  };

  // Practice mode: 3-column layout
  if (isPracticeMode) {
    return (
      <div className="flex gap-4 h-[calc(100vh-280px)] animate-fade-in">
        {/* Left Panel - Dummy Data Only */}
        {dummyData && dummyData.length > 0 && (
          <div className="w-[280px] flex-shrink-0">
            <div className="ai-panel p-4 h-full overflow-auto">
              <DummyDataPanel
                dummyData={dummyData}
                onSelect={handleDummyDataSelect}
                selectedId={selectedDummyData?.id}
              />
            </div>
          </div>
        )}

        {/* Middle Panel - Input */}
        <div className="flex-1 ai-panel flex flex-col p-5 overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <MediConsolLogo size="sm" className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">프롬프트 입력</h3>
              <p className="text-xs text-muted-foreground">AI에게 요청할 내용을 입력하세요</p>
            </div>
          </div>

          {/* Prompt Templates */}
          {promptTemplates.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">프롬프트 템플릿</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {promptTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateClick(template)}
                    className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                      selectedTemplateId === template.id
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    title={template.description}
                  >
                    {template.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Dummy Data Indicator */}
          {selectedDummyData && (
            <div className="mb-3 flex items-center justify-between p-2.5 rounded-lg bg-accent/15 border-2 border-accent/50 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold">✓</span>
                <span className="text-sm text-accent font-semibold">
                  {selectedDummyData.title}
                </span>
              </div>
              <button
                onClick={insertDummyData}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-accent text-white font-medium hover:opacity-90 transition-opacity"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                삽입
              </button>
            </div>
          )}

          {/* Prompt Input */}
          <div className="flex-1 flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="여기에 프롬프트를 입력하세요...

템플릿을 선택하거나 직접 입력하세요.
왼쪽에서 예제데이터를 선택하면 자동으로 삽입됩니다."
              className="flex-1 w-full p-3 rounded-lg prompt-input border resize-none text-sm focus:outline-none"
            />
          </div>

          {/* Model Selector & Action Buttons */}
          <div className="flex items-center gap-2 mt-3">
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors min-w-[120px]"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedModel ? PROVIDER_INFO[selectedModel.provider].color : '#888' }}
                />
                <span className="truncate">{selectedModel?.name || '모델 선택'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {isModelDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModelId(model.id);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted transition-colors ${
                        selectedModelId === model.id ? 'bg-muted' : ''
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PROVIDER_INFO[model.provider].color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{model.name}</div>
                        <div className="text-muted-foreground truncate">{model.description}</div>
                      </div>
                      {model.tier === 'free' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">무료</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm
                transition-all duration-200
                ${!prompt.trim() || isLoading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:opacity-90 shadow-soft"
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  실행
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="flex-1 ai-panel flex flex-col p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
                <MediConsolLogo size="sm" className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">AI 응답</h3>
                <p className="text-xs text-muted-foreground">생성된 결과</p>
              </div>
            </div>
            {response && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsResponseModalOpen(true)}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="크게 보기"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
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
              </div>
            )}
          </div>

          {/* Response Display */}
          <div className="flex-1 min-h-0 rounded-lg result-display overflow-auto">
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
                  <MediConsolLogo size="md" />
                </div>
                <p className="font-medium text-sm mb-1">아직 응답이 없습니다</p>
                <p className="text-xs">프롬프트를 입력하고 실행하세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Response Modal */}
        {isResponseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
            <div className="bg-background rounded-xl shadow-elevated w-[90vw] h-[85vh] max-w-6xl flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
                    <MediConsolLogo size="sm" className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI 응답 결과</h3>
                    <p className="text-xs text-muted-foreground">{selectedModel?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-primary" />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        복사
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsResponseModalOpen(false)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6">
                <MarkdownRenderer content={response} />
              </div>
            </div>
          </div>
        )}

        {/* Exercise Guide Panel - Modal */}
        {exercises && exercises.length > 0 && <ExerciseGuidePanel exercises={exercises} />}

        {/* Practice Guide Panel - Modal */}
        {practiceGuide && <PracticeGuidePanel guide={practiceGuide} />}

        {/* Prompt Guide Modal */}
        {promptGuide && <PromptGuideModal guide={promptGuide} />}

        {/* Learning Guide Modal */}
        {learningGuide && <LearningGuideModal guide={learningGuide} />}
      </div>
    );
  }

  // Default mode: 2-column layout (original)
  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-280px)] animate-fade-in">
      {/* Left Panel - Input */}
      <div className="ai-panel flex flex-col p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <MediConsolLogo size="md" className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">프롬프트 입력</h3>
            <p className="text-sm text-muted-foreground">AI에게 요청할 내용을 입력하세요</p>
          </div>
        </div>

        {/* Prompt Templates */}
        {promptTemplates.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground">프롬프트 템플릿</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {promptTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    selectedTemplateId === template.id
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  title={template.description}
                >
                  {template.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Input */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="여기에 프롬프트를 입력하세요...

예: 위 템플릿을 선택하거나 직접 요청 내용을 입력하세요."
            className="flex-1 w-full p-4 rounded-lg prompt-input border resize-none text-base focus:outline-none"
          />
        </div>

        {/* Model Selector & Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          {/* Model Selector */}
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
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-muted transition-colors ${
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
                    {model.tier === 'free' && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">무료</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold
              transition-all duration-200
              ${!prompt.trim() || isLoading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90 shadow-soft"
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI 응답 생성 중...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                실행하기
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Panel - Output */}
      <div className="ai-panel flex flex-col p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
              <MediConsolLogo size="md" className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI 응답 결과</h3>
              <p className="text-sm text-muted-foreground">생성된 결과물이 여기에 표시됩니다</p>
            </div>
          </div>
          {response && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsResponseModalOpen(true)}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="크게 보기"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-primary" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    복사
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Response Display */}
        <div className="flex-1 min-h-0 rounded-lg result-display overflow-auto">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-medium">AI가 응답을 생성하고 있습니다...</p>
              <p className="text-sm">잠시만 기다려주세요</p>
            </div>
          ) : response ? (
            <div className="p-6">
              <MarkdownRenderer content={response} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <MediConsolLogo size="lg" />
              </div>
              <p className="font-medium mb-2">아직 응답이 없습니다</p>
              <p className="text-sm">
                왼쪽에 프롬프트를 입력하고 '실행하기' 버튼을 클릭하세요
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Response Modal */}
      {isResponseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-background rounded-xl shadow-elevated w-[90vw] h-[85vh] max-w-6xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                  <MediConsolLogo size="md" className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">AI 응답 결과</h3>
                  <p className="text-sm text-muted-foreground">{selectedModel?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-primary" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      복사
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsResponseModalOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-8">
              <MarkdownRenderer content={response} />
            </div>
          </div>
        </div>
      )}

      {/* Prompt Guide Modal */}
      {promptGuide && <PromptGuideModal guide={promptGuide} />}

      {/* Learning Guide Modal */}
      {learningGuide && <LearningGuideModal guide={learningGuide} />}
    </div>
  );
};

export default AIPanel;
