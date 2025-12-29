import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { submissionApi, type Submission } from '@/lib/api'
import { getSession } from '@/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Send, CheckCircle2, Copy, Check as CheckIcon, Loader2, RotateCcw, ChevronDown } from 'lucide-react'
import { MediConsolLogo } from '@/components/MediConsolLogo'
import { useToast } from '@/hooks/use-toast'
import { AI_MODELS, generateAIResponse, getModelById, PROVIDER_INFO } from '@/services/ai'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function StudentPractice() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()

  const sessionId = parseInt(id || '0', 10)
  const session = getSession(sessionId)

  const [submission, setSubmission] = useState<Submission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // AI Panel 상태
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [modelId, setModelId] = useState('claude-haiku')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)

  const selectedModel = getModelById(modelId)

  // 기존 제출물 불러오기
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const { submissions } = await submissionApi.getMySubmissions()
        const existingSubmission = submissions.find((sub) => sub.sessionId === sessionId)

        if (existingSubmission) {
          setSubmission(existingSubmission)
          setPrompt(existingSubmission.prompt)
          setResult(existingSubmission.result)
          setModelId(existingSubmission.modelId)
        }
      } catch (error) {
        console.error('Failed to fetch submission:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmission()
  }, [sessionId])

  // AI 실행
  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResult('')

    try {
      const systemPrompt = session?.prompts[0]?.systemPrompt || ''
      const temperature = session?.prompts[0]?.temperature
      const topP = session?.prompts[0]?.topP

      const aiResponse = await generateAIResponse(
        modelId,
        systemPrompt,
        prompt,
        { temperature, topP }
      )
      setResult(aiResponse)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      toast({
        title: 'AI 응답 실패',
        description: errorMessage,
        variant: 'destructive',
      })
      setResult(`오류가 발생했습니다: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  // 복사
  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    toast({
      title: '복사 완료',
      description: '결과가 클립보드에 복사되었습니다.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // 저장 버튼
  const handleSave = async () => {
    if (!prompt || !result) {
      toast({
        title: '저장 실패',
        description: 'AI 응답을 먼저 실행해주세요.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    try {
      const { submission: savedSubmission } = await submissionApi.createOrUpdate({
        sessionId,
        prompt,
        result,
        modelId,
        status: 'saved',
      })

      setSubmission(savedSubmission)
      toast({
        title: '저장 완료',
        description: '실습 내용이 저장되었습니다.',
      })
    } catch (error) {
      console.error('Failed to save submission:', error)
      toast({
        title: '저장 실패',
        description: error instanceof Error ? error.message : '저장에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // 제출 버튼
  const handleSubmitPractice = async () => {
    if (!prompt || !result) {
      toast({
        title: '제출 실패',
        description: 'AI 응답을 먼저 실행해주세요.',
        variant: 'destructive',
      })
      return
    }

    // 이미 제출된 경우
    if (submission?.status === 'submitted') {
      toast({
        title: '이미 제출됨',
        description: '이미 제출한 차시입니다.',
        variant: 'destructive',
      })
      return
    }

    // 확인 다이얼로그
    if (!confirm('제출하시겠습니까?\n제출 후에는 수정할 수 없습니다.')) {
      return
    }

    setIsSubmitting(true)
    try {
      const { submission: submittedSubmission } = await submissionApi.createOrUpdate({
        sessionId,
        prompt,
        result,
        modelId,
        status: 'submitted',
      })

      setSubmission(submittedSubmission)
      toast({
        title: '제출 완료',
        description: '실습이 제출되었습니다.',
      })

      // 2초 후 대시보드로 이동
      setTimeout(() => {
        navigate('/student')
      }, 2000)
    } catch (error) {
      console.error('Failed to submit:', error)
      toast({
        title: '제출 실패',
        description: error instanceof Error ? error.message : '제출에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">차시를 찾을 수 없습니다</h2>
          <Button onClick={() => navigate('/student')}>대시보드로 돌아가기</Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const isSubmitted = submission?.status === 'submitted'
  const hasEvaluation = !!(submission?.evaluations && submission.evaluations.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MediConsolLogo size="lg" />
              <div>
                <h1 className="text-xl font-display font-semibold text-foreground">
                  {session.id}차시. {session.title}
                </h1>
                {session.subtitle && (
                  <p className="text-sm text-muted-foreground">{session.subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasEvaluation && (
                <Badge variant="default" className="gap-1 bg-green-600">
                  <CheckCircle2 className="w-3 h-3" />
                  평가완료
                </Badge>
              )}
              {isSubmitted && !hasEvaluation && (
                <Badge variant="outline" className="gap-1 border-purple-500 text-purple-600">
                  <Send className="w-3 h-3" />
                  제출완료
                </Badge>
              )}
              <Button variant="outline" onClick={() => navigate('/student')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                대시보드
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* 평가 결과 (평가 완료된 경우) */}
        {hasEvaluation && submission?.evaluations && submission.evaluations.length > 0 && (
          <Card className="mb-6 border-2 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                평가 결과 ({submission.evaluations.length}명 평가)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 평균 점수 */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <span className="text-lg font-semibold text-green-800 dark:text-green-200">
                    평균 점수
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    {(
                      submission.evaluations.reduce((sum, ev) => sum + ev.score, 0) /
                      submission.evaluations.length
                    ).toFixed(1)}
                    점
                  </span>
                </div>

                {/* 평가자별 상세 */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold">평가자별 상세</p>
                  {submission.evaluations.map((evaluation, index) => (
                    <div key={evaluation.id} className="p-4 rounded-lg bg-muted border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          평가자 {index + 1}: {evaluation.reviewer?.name || evaluation.reviewer?.email || '알 수 없음'}
                        </span>
                        <span className="text-xl font-bold text-green-600">
                          {evaluation.score}점
                        </span>
                      </div>
                      {evaluation.comment && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-sm font-semibold mb-1">평가 코멘트</p>
                          <p className="text-sm text-muted-foreground">{evaluation.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 제출 완료 안내 */}
        {isSubmitted && !hasEvaluation && (
          <Card className="mb-6 border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Send className="w-5 h-5" />
                제출 완료
              </CardTitle>
              <CardDescription>
                실습이 제출되었습니다. 평가자의 평가를 기다려주세요.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* AI Panel */}
        <div className="grid grid-cols-2 gap-6 mb-6">
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

            {/* Prompt Input */}
            <div className="flex-1 flex flex-col">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="여기에 프롬프트를 입력하세요..."
                className="flex-1 w-full p-4 rounded-lg prompt-input border resize-none text-base focus:outline-none"
                disabled={isSubmitted}
              />
            </div>

            {/* Model Selector & Action Buttons */}
            <div className="flex items-center gap-3 mt-4">
              {/* Model Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  disabled={isSubmitted}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors min-w-[140px] disabled:opacity-50"
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
                          setModelId(model.id)
                          setIsModelDropdownOpen(false)
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-muted transition-colors ${
                          modelId === model.id ? 'bg-muted' : ''
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
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating || isSubmitted}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold
                  transition-all duration-200
                  ${!prompt.trim() || isGenerating || isSubmitted
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:opacity-90 shadow-soft"
                  }
                `}
              >
                {isGenerating ? (
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
                onClick={() => {
                  setPrompt('')
                  setResult('')
                }}
                disabled={isSubmitted}
                className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
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
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4 text-primary" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      복사
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Response Display */}
            <div className="flex-1 min-h-0 rounded-lg result-display overflow-auto">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="font-medium">AI가 응답을 생성하고 있습니다...</p>
                  <p className="text-sm">잠시만 기다려주세요</p>
                </div>
              ) : result ? (
                <div className="p-6">
                  <MarkdownRenderer content={result} />
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
        </div>

        {/* 액션 버튼 */}
        {!isSubmitted && (
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSave}
              disabled={isSaving || !prompt || !result}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? '저장 중...' : '저장'}
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={handleSubmitPractice}
              disabled={isSubmitting || !prompt || !result}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? '제출 중...' : '제출'}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
