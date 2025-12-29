import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { submissionApi, type Submission } from '@/lib/api'
import { getAllSessions } from '@/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertCircle, CheckCircle2, ClipboardList, FileEdit, Filter } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ReviewerDashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 필터 상태
  const [sessionFilter, setSessionFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const allSessions = getAllSessions()

  // 제출물 목록 조회
  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true)
      try {
        const { submissions: data } = await submissionApi.getAllForReviewer()
        // 제출된 것만 표시 (saved 상태는 제외)
        const submittedOnly = data.filter(sub => sub.status === 'submitted')
        setSubmissions(submittedOnly)
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

    fetchSubmissions()
  }, [toast])

  // 필터링된 제출물
  const filteredSubmissions = submissions.filter(sub => {
    // 세션 필터
    if (sessionFilter !== 'all' && sub.sessionId !== parseInt(sessionFilter, 10)) {
      return false
    }

    // 평가 상태 필터
    if (statusFilter === 'evaluated' && !sub.evaluation) {
      return false
    }
    if (statusFilter === 'not_evaluated' && sub.evaluation) {
      return false
    }

    return true
  })

  // 통계 계산
  const stats = {
    total: submissions.length,
    evaluated: submissions.filter(sub => sub.evaluation).length,
    notEvaluated: submissions.filter(sub => !sub.evaluation).length,
  }

  // 세션 이름 가져오기
  const getSessionTitle = (sessionId: number) => {
    const session = allSessions.find(s => s.id === sessionId)
    return session ? `${session.id}차시. ${session.title}` : `${sessionId}차시`
  }

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

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">평가자 대시보드</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            메인으로
          </Button>
        </div>
        <p className="text-muted-foreground">학생들의 실습 제출물을 평가하고 관리합니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체 제출물</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">평가 완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.evaluated}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">평가 대기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.notEvaluated}</div>
          </CardContent>
        </Card>
      </div>

      {/* 필터 */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle>필터</CardTitle>
          </div>
          <CardDescription>차시와 평가 상태로 제출물을 필터링합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {/* 세션 필터 */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">차시 선택</label>
              <Select value={sessionFilter} onValueChange={setSessionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="전체 차시" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 차시</SelectItem>
                  {allSessions.map(session => (
                    <SelectItem key={session.id} value={session.id.toString()}>
                      {session.id}차시. {session.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 상태 필터 */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">평가 상태</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="전체 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="not_evaluated">평가 대기</SelectItem>
                  <SelectItem value="evaluated">평가 완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 제출물 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>제출물 목록</CardTitle>
          <CardDescription>
            총 {filteredSubmissions.length}개의 제출물
            {sessionFilter !== 'all' && ` (${getSessionTitle(parseInt(sessionFilter, 10))})`}
            {statusFilter !== 'all' &&
              ` (${statusFilter === 'evaluated' ? '평가 완료' : '평가 대기'})`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">표시할 제출물이 없습니다.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>학생</TableHead>
                  <TableHead>차시</TableHead>
                  <TableHead>제출 일시</TableHead>
                  <TableHead>평가 상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map(submission => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.user?.name || submission.user?.email || '알 수 없음'}
                    </TableCell>
                    <TableCell>{getSessionTitle(submission.sessionId)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(submission.updatedAt)}
                    </TableCell>
                    <TableCell>
                      {submission.evaluation ? (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          평가완료 ({submission.evaluation.score}점)
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-500 text-orange-600">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          평가 대기
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={submission.evaluation ? 'outline' : 'default'}
                        onClick={() => navigate(`/reviewer/evaluate/${submission.id}`)}
                      >
                        <FileEdit className="w-4 h-4 mr-1" />
                        {submission.evaluation ? '재평가' : '평가하기'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
