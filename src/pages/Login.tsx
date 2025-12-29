import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MediConsolLogo } from '@/components/MediConsolLogo'
import { AlertCircle, Users, GraduationCap } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // 강사용 로그인 상태
  const [instructorUsername, setInstructorUsername] = useState('')
  const [instructorPassword, setInstructorPassword] = useState('')
  const [instructorError, setInstructorError] = useState('')

  // 학생/평가자 로그인 상태
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [studentError, setStudentError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 강사용 로그인 (기존 방식)
  const handleInstructorLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setInstructorError('')

    if (instructorUsername === 'inno' && instructorPassword === 'innoai2026') {
      localStorage.setItem('auth_token', 'authenticated')
      window.location.href = '/'
    } else {
      setInstructorError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  // 학생/평가자 로그인 (Railway 백엔드)
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStudentError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setStudentError(err instanceof Error ? err.message : '로그인에 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MediConsolLogo size="xl" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            AI Class Studio
          </h1>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">이노솔루션</p>
            <p>"2026년 의료기관 AI 직무 융합훈련"</p>
            <p>실습용 강의솔루션</p>
          </div>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 강사용 로그인 */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">교강사 로그인</CardTitle>
              </div>
              <CardDescription>
                교강사 전용 비공개 로그인
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Notice */}
              <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>비공개 사이트 안내</strong>
                  <br />
                  교강사용 비공개 사이트이며 부여받은 아이디와 패스워드로만 접속하실 수 있습니다.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleInstructorLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor-username">아이디</Label>
                  <Input
                    id="instructor-username"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={instructorUsername}
                    onChange={(e) => {
                      setInstructorUsername(e.target.value)
                      setInstructorError('')
                    }}
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-password">비밀번호</Label>
                  <Input
                    id="instructor-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={instructorPassword}
                    onChange={(e) => {
                      setInstructorPassword(e.target.value)
                      setInstructorError('')
                    }}
                    className="h-11"
                    required
                  />
                </div>

                {instructorError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{instructorError}</p>
                  </div>
                )}

                <Button type="submit" className="w-full h-11 text-base font-semibold">
                  강사 로그인
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 학생/평가자 로그인 */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl">학생 / 평가자 로그인</CardTitle>
              </div>
              <CardDescription>
                학생 및 평가자 계정으로 로그인
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student1@test.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setStudentError('')
                    }}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setStudentError('')
                    }}
                    required
                    disabled={isLoading}
                    className="h-11"
                  />
                </div>

                {studentError && (
                  <Alert variant="destructive">
                    <AlertDescription>{studentError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? '로그인 중...' : '학생/평가자 로그인'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg text-sm space-y-2">
                <p className="font-semibold">테스트 계정:</p>
                <div className="space-y-1 text-muted-foreground">
                  <p>학생: student1@test.com / test1234</p>
                  <p>평가자: reviewer1@test.com / test1234</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            MediConSol × 이노솔루션
          </p>
        </div>
      </div>
    </div>
  )
}
