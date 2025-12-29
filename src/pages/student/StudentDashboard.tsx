import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { submissionApi, type Submission } from '@/lib/api'
import { getAllSessions } from '@/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, CheckCircle2, FileEdit, Save, ArrowLeft } from 'lucide-react'
import { MediConsolLogo } from '@/components/MediConsolLogo'

type SessionStatus = 'not_started' | 'saved' | 'submitted' | 'evaluated'

interface SessionWithStatus {
  id: number
  title: string
  subtitle?: string
  description: string
  status: SessionStatus
  submission?: Submission
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sessions, setSessions] = useState<SessionWithStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { submissions } = await submissionApi.getMySubmissions()
        const allSessions = getAllSessions()

        // 차시별 제출물 매핑
        const submissionMap = new Map<number, Submission>()
        submissions.forEach((sub) => {
          submissionMap.set(sub.sessionId, sub)
        })

        // 차시별 상태 계산
        const sessionsWithStatus: SessionWithStatus[] = allSessions.map((session) => {
          const submission = submissionMap.get(session.id)

          let status: SessionStatus = 'not_started'
          if (submission) {
            if (submission.evaluations && submission.evaluations.length > 0) {
              status = 'evaluated'
            } else if (submission.status === 'submitted') {
              status = 'submitted'
            } else if (submission.status === 'saved') {
              status = 'saved'
            }
          }

          return {
            id: session.id,
            title: session.title,
            subtitle: session.subtitle,
            description: session.description,
            status,
            submission,
          }
        })

        setSessions(sessionsWithStatus)
      } catch (error) {
        console.error('Failed to fetch submissions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'not_started':
        return (
          <Badge variant="secondary" className="gap-1">
            <BookOpen className="w-3 h-3" />
            미실습
          </Badge>
        )
      case 'saved':
        return (
          <Badge variant="outline" className="gap-1 border-blue-500 text-blue-600">
            <Save className="w-3 h-3" />
            저장됨
          </Badge>
        )
      case 'submitted':
        return (
          <Badge variant="outline" className="gap-1 border-purple-500 text-purple-600">
            <FileEdit className="w-3 h-3" />
            제출완료
          </Badge>
        )
      case 'evaluated':
        return (
          <Badge variant="default" className="gap-1 bg-green-600">
            <CheckCircle2 className="w-3 h-3" />
            평가완료
          </Badge>
        )
    }
  }

  const getStatusSummary = () => {
    const summary = {
      not_started: 0,
      saved: 0,
      submitted: 0,
      evaluated: 0,
    }

    sessions.forEach((session) => {
      summary[session.status]++
    })

    return summary
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const summary = getStatusSummary()

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
                  학생 대시보드
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user?.name || user?.email}님의 실습 현황
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              전체 차시 보기
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                전체 차시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                평가 완료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summary.evaluated}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                제출 완료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{summary.submitted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                저장됨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summary.saved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Session List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {session.id}차시. {session.title}
                    </CardTitle>
                    {session.subtitle && (
                      <CardDescription className="mt-1">{session.subtitle}</CardDescription>
                    )}
                  </div>
                  {getStatusBadge(session.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {session.description}
                </p>

                {/* Evaluation Score */}
                {session.submission?.evaluations && session.submission.evaluations.length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        평균 점수 ({session.submission.evaluations.length}명 평가)
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {(
                          session.submission.evaluations.reduce((sum, ev) => sum + ev.score, 0) /
                          session.submission.evaluations.length
                        ).toFixed(1)}
                        점
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-green-700 dark:text-green-300">
                      {session.submission.evaluations.map((ev) => (
                        <div key={ev.id} className="flex items-center justify-between py-1">
                          <span>{ev.reviewer?.name || ev.reviewer?.email || '평가자'}</span>
                          <span className="font-medium">{ev.score}점</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {session.status === 'not_started' && (
                    <Button
                      className="w-full"
                      onClick={() => navigate(`/student/practice/${session.id}`)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      실습하기
                    </Button>
                  )}
                  {session.status === 'saved' && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate(`/student/practice/${session.id}`)}
                    >
                      <FileEdit className="w-4 h-4 mr-2" />
                      이어서 하기
                    </Button>
                  )}
                  {(session.status === 'submitted' || session.status === 'evaluated') && (
                    <Button
                      className="w-full"
                      variant="secondary"
                      onClick={() => navigate(`/student/practice/${session.id}`)}
                    >
                      결과 보기
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
