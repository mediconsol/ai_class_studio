import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { tokenStorage } from '@/lib/api'
import type { User } from '@/lib/api'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: User['role'][]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()

  // 로딩 중에는 빈 화면 또는 로딩 스피너 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // 강사용 기존 토큰 체크
  const instructorToken = tokenStorage.get()
  const isInstructor = instructorToken === 'authenticated'

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated && !isInstructor) {
    return <Navigate to="/login" replace />
  }

  // 역할 검사 (allowedRoles가 지정된 경우)
  // 강사는 모든 페이지 접근 가능
  if (allowedRoles && !isInstructor && user && !allowedRoles.includes(user.role)) {
    // 권한이 없는 경우 홈으로 리다이렉트
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
