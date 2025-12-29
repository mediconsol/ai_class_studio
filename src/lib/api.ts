/**
 * Backend API Client
 * Railway 백엔드 서버와 통신하는 API 클라이언트
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface ApiError {
  error: string
  message?: string
}

interface User {
  id: string
  email: string
  role: 'student' | 'reviewer' | 'instructor'
  name: string | null
}

interface LoginResponse {
  token: string
  user: User
}

interface Submission {
  id: string
  userId: string
  sessionId: number
  prompt: string
  result: string
  modelId: string
  status: 'saved' | 'submitted'
  createdAt: string
  updatedAt: string
  evaluations?: Evaluation[] // 1:N 관계 (여러 평가자가 평가 가능)
  user?: User // 평가자가 조회할 때 포함됨
}

interface Evaluation {
  id: string
  submissionId: string
  reviewerId: string
  score: number
  comment: string | null
  createdAt: string
  updatedAt: string
  reviewer?: User // 평가자 정보 (조회 시 포함)
}

/**
 * API 요청 헬퍼 함수
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    const error = data as ApiError
    throw new Error(error.message || error.error || 'API 요청 실패')
  }

  return data as T
}

/**
 * 인증 API
 */
export const authApi = {
  /**
   * 로그인
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  /**
   * 현재 사용자 정보 조회
   */
  async me(): Promise<{ user: User }> {
    return apiRequest<{ user: User }>('/api/auth/me')
  },
}

/**
 * 제출물 API
 */
export const submissionApi = {
  /**
   * 제출물 생성/수정 (Upsert)
   */
  async createOrUpdate(data: {
    sessionId: number
    prompt: string
    result: string
    modelId: string
    status: 'saved' | 'submitted'
  }): Promise<{ submission: Submission }> {
    return apiRequest<{ submission: Submission }>('/api/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * 내 제출물 목록 조회
   */
  async getMySubmissions(): Promise<{ submissions: Submission[] }> {
    return apiRequest<{ submissions: Submission[] }>('/api/submissions')
  },

  /**
   * 제출물 상세 조회
   */
  async getById(id: string): Promise<{ submission: Submission }> {
    return apiRequest<{ submission: Submission }>(`/api/submissions/${id}`)
  },

  /**
   * 모든 제출물 조회 (평가자 전용)
   * 백엔드에서 역할에 따라 자동으로 필터링
   * - 학생: 자신의 제출물만
   * - 평가자: 제출된(submitted) 모든 제출물
   */
  async getAllForReviewer(): Promise<{ submissions: Submission[] }> {
    return apiRequest<{ submissions: Submission[] }>('/api/submissions')
  },
}

/**
 * 평가 API
 */
export const evaluationApi = {
  /**
   * 평가 생성/수정 (평가자 전용)
   */
  async createOrUpdate(
    submissionId: string,
    data: {
      score: number
      comment?: string
    }
  ): Promise<{ evaluation: Evaluation }> {
    return apiRequest<{ evaluation: Evaluation }>('/api/evaluations', {
      method: 'POST',
      body: JSON.stringify({ submissionId, ...data }),
    })
  },

  /**
   * 제출물별 평가 목록 조회
   * 여러 평가자가 평가한 경우 배열로 반환
   */
  async getBySubmissionId(submissionId: string): Promise<{ evaluations: Evaluation[] }> {
    return apiRequest<{ evaluations: Evaluation[] }>(
      `/api/evaluations/${submissionId}`
    )
  },
}

/**
 * 토큰 관리
 */
export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem('auth_token')
  },

  set(token: string): void {
    localStorage.setItem('auth_token', token)
  },

  remove(): void {
    localStorage.removeItem('auth_token')
  },
}

export type { User, Submission, Evaluation, LoginResponse }
