import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { submissionApi, evaluationApi, type Submission, type Evaluation } from '@/lib/api'
import { getSession } from '@/data'
import { AI_MODELS } from '@/services/ai'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { ArrowLeft, Send, CheckCircle2, AlertCircle, User, Calendar, Bot } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ReviewerEvaluate() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [submission, setSubmission] = useState<Submission | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 평가 폼 상태
  const [score, setScore] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 제출물 및 기존 평가 조회
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      setIsLoading(true)
      try {
        const { submission: data } = await submissionApi.getById(id)
        setSubmission(data)

        // 기존 평가가 있으면 폼에 채우기
        if (data.evaluation) {
          setScore(data.evaluation.score.toString())
          setComment(data.evaluation.comment || '')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '제출물 조회 실패'
        toast({
          title: '제출물 조회 실패',
          description: errorMessage,
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, toast])

  // 평가 제출
  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!submission) return

    // 점수 유효성 검사
    const scoreNum = parseInt(score, 10)
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      toast({
        title: '유효하지 않은 점수',
        description: '점수는 0에서 100 사이여야 합니다.',
        variant: 'destructive',
      })
      return
    }

    // 확인 대화상자
    const isUpdate = !!submission.evaluation
    const confirmMessage = isUpdate
      ? '평가를 수정하시겠습니까?'
      : '평가를 제출하시겠습니까?'

    if (!confirm(confirmMessage)) return

    setIsSubmitting(true)
    try {
      const { evaluation } = await evaluationApi.createOrUpdate(submission.id, {
        score: scoreNum,
        comment: comment.trim() || undefined,
      })

      // 제출물 상태 업데이트
      setSubmission(prev =>
        prev
          ? {
              ...prev,
              evaluation,
            }
          : null
      )

      toast({
        title: isUpdate ? '평가가 수정되었습니다' : '평가가 제출되었습니다',
        description: `점수: ${scoreNum}점`,
      })

      // 2초 후 대시보드로 이동
      setTimeout(() => {
        navigate('/reviewer')
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '평가 제출 실패'
      toast({
        title: '평가 제출 실패',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">제출물 조회 중...</p>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">제출물을 찾을 수 없습니다</h2>
          <Button onClick={() => navigate('/reviewer')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            대시보드로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  const session = getSession(submission.sessionId)
  const selectedModel = AI_MODELS.find(m => m.id === submission.modelId)

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/reviewer')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          대시보드로 돌아가기
        </Button>
        <h1 className="text-3xl font-display font-bold mb-2">실습 평가</h1>
        <p className="text-muted-foreground">학생의 실습 제출물을 평가합니다.</p>
      </div>

      {/* 기존 평가 알림 */}
      {submission.evaluation && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950/20">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            이미 평가된 제출물입니다. 점수와 코멘트를 수정하여 재평가할 수 있습니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 제출물 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>제출물 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">학생:</span>
              <span className="font-medium">
                {submission.user?.name || submission.user?.email || '알 수 없음'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">제출일:</span>
              <span className="font-medium">{formatDate(submission.updatedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">차시:</span>
            <span className="font-medium">
              {submission.sessionId}차시. {session?.title || '알 수 없음'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">사용 모델:</span>
            <Badge variant="outline">{selectedModel?.name || submission.modelId}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 프롬프트 및 AI 응답 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 프롬프트 */}
        <Card>
          <CardHeader>
            <CardTitle>학생의 프롬프트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap break-words">
              {submission.prompt}
            </div>
          </CardContent>
        </Card>

        {/* AI 응답 */}
        <Card>
          <CardHeader>
            <CardTitle>AI 응답 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg max-h-[400px] overflow-y-auto">
              <MarkdownRenderer content={submission.result} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 평가 폼 */}
      <Card>
        <CardHeader>
          <CardTitle>평가 작성</CardTitle>
          <CardDescription>
            학생의 실습에 대한 점수와 코멘트를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitEvaluation} className="space-y-6">
            {/* 점수 입력 */}
            <div className="space-y-2">
              <Label htmlFor="score">
                점수 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                placeholder="0-100 사이의 점수를 입력하세요"
                value={score}
                onChange={e => setScore(e.target.value)}
                required
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground">0점에서 100점 사이로 입력하세요.</p>
            </div>

            {/* 코멘트 입력 */}
            <div className="space-y-2">
              <Label htmlFor="comment">평가 코멘트 (선택)</Label>
              <Textarea
                id="comment"
                placeholder="학생에게 전달할 평가 코멘트를 입력하세요..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                잘한 점과 개선할 점을 구체적으로 작성해주세요.
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/reviewer')}>
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting || !score.trim()}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {submission.evaluation ? '수정 중...' : '제출 중...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {submission.evaluation ? '평가 수정' : '평가 제출'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
