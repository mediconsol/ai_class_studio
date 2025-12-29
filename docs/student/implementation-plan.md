# 학생/평가자 시스템 구현 계획서

> **프로젝트**: AI Class Studio - 학생 실습 플레이그라운드 및 평가 시스템
> **작성일**: 2025-12-29
> **접근 방식**: 현재 프로젝트 확장 (옵션 1)

---

## 📊 1. 현황 분석

### 1.1 현재 시스템
- **타입**: React SPA (정적 웹앱)
- **프레임워크**: React 18 + TypeScript + Vite
- **배포**: Vercel
- **도메인**:
  - 프로덕션: `inno.mediconsol.com`
  - Vercel 기본: `aiclassstudio.vercel.app`
- **주요 기능**: 20차시 강의 슬라이드 + AI 실습 (강사용)
- **AI 호출**: 클라이언트 직접 호출 (Google/OpenAI/Anthropic)
- **인증**: 간단한 localStorage 기반

### 1.2 현재 아키텍처 장점
✅ **재사용 가능한 고품질 컴포넌트**
- `AIPanel`: AI 프롬프트/응답 UI (학생 플레이그라운드 base)
- `SlideViewer`: 차시별 슬라이드
- `TabNavigation`: 탭 전환 UI
- 40+ shadcn/ui 컴포넌트 라이브러리

✅ **차시 기반 데이터 구조**
- 20개 session 폴더 구조 (`src/data/sessions/session-XX/`)
- 프롬프트, 더미데이터, 실습가이드 이미 정의됨

✅ **AI 서비스 추상화**
- `src/services/ai.ts`에 3개 제공자 통합
- 환경변수 관리 (`VITE_*_API_KEY`)

---

## 🎯 2. 목표 시스템

### 2.1 신규 사용자 역할

| 역할 | 권한 | 주요 기능 |
|------|------|-----------|
| **강사(Instructor)** | 기존 | 강의 진행, 슬라이드 열람, AI 데모 |
| **학생(Student)** | 신규 | 실습, 저장, 제출, 평가 결과 조회 |
| **평가자(Reviewer)** | 신규 | 제출물 열람, 점수/코멘트 입력 |

### 2.2 핵심 요구사항
1. **학생 실습 플레이그라운드**
   - 강의용 UI 100% 동일 (기존 AIPanel 재사용)
   - 프롬프트 + AI 응답 저장
   - 차시별 과제 제출 (1개만 선택)

2. **학생 마이페이지**
   - 저장된 실습 목록
   - 제출 이력 및 상태
   - 평가 결과 확인

3. **평가자 관리 화면**
   - 제출물 목록 (차시별, 학생별 필터)
   - 제출물 상세 보기 (읽기 전용)
   - 점수/코멘트 입력

4. **인증 시스템**
   - 이노솔루션 발급 이메일/패스워드
   - 역할 기반 접근 제어 (RBAC)

---

## 🏗️ 3. 기술 스택

### 3.1 프론트엔드 (변경 없음)
```
React 18 + TypeScript
Vite (번들러)
shadcn/ui + Tailwind CSS
React Router v6
TanStack Query (서버 상태 관리)
Axios (HTTP 클라이언트)
```

### 3.2 백엔드 (신규 - Railway 배포)
```
Node.js 20 + TypeScript
Express.js (API 서버)
PostgreSQL (Railway 제공)
Prisma ORM (타입 안전 DB 접근)
JWT (간단한 토큰 인증)
bcrypt (비밀번호 해싱)
```

**Railway 선택 이유**:
- **간단한 배포**: GitHub 연동으로 자동 배포
- **무료 티어**: $5 크레딧/월 (소규모 충분)
- **통합 관리**: PostgreSQL + API 서버 한 곳에서 관리
- **직접 제어**: 복잡한 BaaS 없이 필요한 로직만 구현
- **Vercel 호환**: CORS 설정만으로 프론트엔드 연동

**Supabase 대신 Railway를 선택한 이유**:
- ✅ 로그인 로직이 간단함 (이메일/패스워드만)
- ✅ 테이블 3개로 복잡도 낮음
- ✅ 직접 작성한 API 엔드포인트가 명시적
- ✅ Row Level Security 등 오버엔지니어링 불필요
- ✅ 유지보수 시 백엔드 로직 파악 쉬움

### 3.3 배포 환경
```
Frontend: Vercel
├── 프론트엔드: Static Site (변경 없음)
├── 환경변수: Vercel Dashboard 설정
│   ├── VITE_GOOGLE_AI_KEY (기존)
│   ├── VITE_OPENAI_API_KEY (기존)
│   ├── VITE_ANTHROPIC_API_KEY (기존)
│   └── VITE_API_URL (신규 - Railway API 엔드포인트)
└── 도메인:
    ├── inno.mediconsol.com (프로덕션)
    └── aiclassstudio.vercel.app (스테이징)

Backend: Railway
├── API 서버: Node.js + Express
├── Database: PostgreSQL (자동 프로비저닝)
├── 환경변수: Railway Dashboard 설정
│   ├── DATABASE_URL (자동 생성)
│   ├── JWT_SECRET
│   └── NODE_ENV
└── URL: https://api-<project>.railway.app
```

### 3.4 프로젝트 폴더 구조 (Monorepo)

**핵심 원칙**: 기존 강사용 서비스에 영향 없이 backend/ 폴더만 추가

```
ai-class-studio-main/                 # Git 루트 (Monorepo)
│
├── backend/                          # 🆕 신규 (Railway 배포)
│   ├── src/
│   │   ├── index.ts                  # Express 앱 엔트리
│   │   ├── routes/                   # API 라우트
│   │   │   ├── auth.routes.ts
│   │   │   ├── submissions.routes.ts
│   │   │   ├── evaluations.routes.ts
│   │   │   └── reviewer.routes.ts
│   │   ├── controllers/              # 비즈니스 로직
│   │   │   ├── auth.controller.ts
│   │   │   ├── submissions.controller.ts
│   │   │   ├── evaluations.controller.ts
│   │   │   └── reviewer.controller.ts
│   │   ├── middlewares/              # 인증/권한 체크
│   │   │   ├── auth.middleware.ts
│   │   │   └── role.middleware.ts
│   │   ├── services/                 # 재사용 가능 서비스
│   │   │   └── auth.service.ts
│   │   └── utils/
│   │       ├── prisma.ts
│   │       └── errors.ts
│   ├── prisma/
│   │   ├── schema.prisma             # DB 스키마 정의
│   │   ├── seed.ts                   # 테스트 계정 생성
│   │   └── migrations/
│   ├── package.json                  # 백엔드 전용 의존성
│   ├── tsconfig.json
│   ├── .env                          # 백엔드 환경변수
│   └── README.md                     # 백엔드 문서
│
├── src/                              # ✅ 기존 프론트엔드 (Vercel 배포)
│   ├── components/
│   │   ├── ui/                       # ✅ 기존 (shadcn/ui 40+ 컴포넌트)
│   │   ├── student/                  # 🆕 신규 (학생 전용)
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── StudentPracticePanel.tsx
│   │   │   ├── MyPageList.tsx
│   │   │   ├── SubmissionCard.tsx
│   │   │   └── EvaluationDetail.tsx
│   │   ├── reviewer/                 # 🆕 신규 (평가자 전용)
│   │   │   ├── ReviewerDashboard.tsx
│   │   │   ├── SubmissionTable.tsx
│   │   │   ├── EvaluationForm.tsx
│   │   │   └── SubmissionViewer.tsx
│   │   ├── AIPanel.tsx               # ✅ 기존 (재사용)
│   │   ├── SlideViewer.tsx           # ✅ 기존
│   │   ├── LectureHeader.tsx         # ✅ 기존
│   │   ├── Login.tsx                 # 🔄 수정 (Railway API 연동)
│   │   ├── ProtectedRoute.tsx        # 🆕 신규
│   │   └── ...                       # ✅ 기존 컴포넌트들
│   ├── pages/
│   │   ├── student/                  # 🆕 신규
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── StudentPractice.tsx
│   │   │   └── StudentMyPage.tsx
│   │   ├── reviewer/                 # 🆕 신규
│   │   │   ├── ReviewerDashboard.tsx
│   │   │   └── ReviewerEvaluation.tsx
│   │   ├── Index.tsx                 # ✅ 기존 (강사용 홈)
│   │   ├── Session.tsx               # ✅ 기존 (강사용 세션)
│   │   └── NotFound.tsx              # ✅ 기존
│   ├── hooks/
│   │   ├── useAuth.ts                # 🆕 신규 (JWT 인증)
│   │   ├── use-toast.ts              # ✅ 기존
│   │   └── use-mobile.tsx            # ✅ 기존
│   ├── lib/
│   │   ├── api.ts                    # 🆕 신규 (Axios 클라이언트)
│   │   └── utils.ts                  # ✅ 기존
│   ├── services/
│   │   └── ai.ts                     # ✅ 기존 (AI API 직접 호출)
│   ├── data/                         # ✅ 기존 (차시별 데이터)
│   │   ├── sessions/
│   │   │   ├── session-01/
│   │   │   ├── session-02/
│   │   │   └── ... (session-20까지)
│   │   └── index.ts
│   ├── types/                        # ✅ 기존
│   ├── App.tsx                       # 🔄 수정 (학생/평가자 라우트 추가)
│   └── main.tsx                      # ✅ 기존
│
├── public/                           # ✅ 기존 (정적 리소스)
│   ├── slides/                       # ✅ 기존 (차시별 슬라이드 이미지)
│   └── ...
│
├── docs/                             # ✅ 기존 + 🆕 신규 student/ 폴더
│   ├── student/                      # 🆕
│   │   ├── implementation-plan.md
│   │   ├── todo-list.md
│   │   └── prd_student_v1.0.md/
│   └── ...
│
├── package.json                      # ✅ 기존 (프론트엔드 패키지)
├── vite.config.ts                    # ✅ 기존 (수정 없음)
├── vercel.json                       # 🆕 신규 (백엔드 변경 시 재배포 방지)
├── .env                              # 🔄 수정 (VITE_API_URL 추가)
├── .env.example                      # 🔄 수정
├── .gitignore                        # 🔄 수정 (backend/ 제외)
└── README.md                         # 🔄 업데이트
```

**배포 분리 전략**:
1. **Vercel** (프론트엔드)
   - 루트 디렉토리 빌드
   - `vercel.json`에서 `backend/` 변경 시 재배포 방지
   - 환경변수: `VITE_API_URL` (Railway URL)

2. **Railway** (백엔드)
   - Root Directory: `backend/`
   - Build Command: `npm run build`
   - Start Command: `npm run start`

**영향 최소화**:
- ✅ 기존 강사용 서비스 코드 변경 없음
- ✅ 기존 배포 프로세스 유지
- ✅ Git 커밋 시 backend/ 변경만 Railway 재배포
- ✅ 프론트엔드 변경만 Vercel 재배포

---

## 🗄️ 4. 데이터베이스 설계

### 4.1 ERD 개요
```
users (사용자 계정)
  └── id (UUID, PK)
      ├── email (UNIQUE)
      ├── password_hash
      ├── role (instructor/student/reviewer)
      ├── name
      └── created_at

submissions (학생 실습 제출물)
  └── id (UUID, PK)
      ├── user_id (FK → users.id)
      ├── session_id (1~20)
      ├── prompt (TEXT)
      ├── result (TEXT)
      ├── model_id (사용한 AI 모델)
      ├── status (saved/submitted)
      ├── created_at
      └── updated_at

evaluations (평가 결과)
  └── id (UUID, PK)
      ├── submission_id (FK → submissions.id, UNIQUE)
      ├── reviewer_id (FK → users.id)
      ├── score (0~100)
      ├── comment (TEXT)
      └── created_at
```

### 4.2 Prisma Schema 정의

#### 4.2.1 schema.prisma
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  instructor
  student
  reviewer
}

enum SubmissionStatus {
  saved
  submitted
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String   @map("password_hash")
  role          UserRole
  name          String?
  createdAt     DateTime @default(now()) @map("created_at")

  submissions   Submission[]
  evaluations   Evaluation[]

  @@map("users")
}

model Submission {
  id         String           @id @default(uuid())
  userId     String           @map("user_id")
  sessionId  Int              @map("session_id")
  prompt     String
  result     String
  modelId    String           @map("model_id")
  status     SubmissionStatus
  createdAt  DateTime         @default(now()) @map("created_at")
  updatedAt  DateTime         @updatedAt @map("updated_at")

  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  evaluation Evaluation?

  @@index([userId, sessionId])
  @@index([status])
  @@map("submissions")
}

model Evaluation {
  id           String   @id @default(uuid())
  submissionId String   @unique @map("submission_id")
  reviewerId   String   @map("reviewer_id")
  score        Int
  comment      String?
  createdAt    DateTime @default(now()) @map("created_at")

  submission   Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  reviewer     User       @relation(fields: [reviewerId], references: [id])

  @@index([submissionId])
  @@index([reviewerId])
  @@map("evaluations")
}
```

**주요 설계 포인트**:
- `passwordHash`: bcrypt로 해싱된 비밀번호 저장
- `UserRole` enum: 타입 안전성 확보
- **차시별 1개 제출 제약**: 애플리케이션 레벨에서 체크 (DB 제약 대신)
- Prisma Cascade: 사용자 삭제 시 관련 데이터 자동 삭제
- snake_case 매핑: DB는 snake_case, TypeScript는 camelCase

### 4.3 데이터베이스 마이그레이션

```bash
# Prisma CLI 설치
npm install -D prisma
npm install @prisma/client

# Prisma 초기화
npx prisma init

# schema.prisma 작성 후 마이그레이션 생성
npx prisma migrate dev --name init

# Prisma Client 생성
npx prisma generate
```

---

## 🛣️ 5. 라우팅 구조

### 5.1 URL 설계

```
# 기존 (강사용)
/                        → 홈 (20차시 목록)
/session/:id             → 차시 상세 (슬라이드/AI/리소스 탭)

# 신규 (학생용)
/student                 → 학생 대시보드 (차시별 상태)
/student/practice/:id    → 실습 플레이그라운드
/student/mypage          → 마이페이지 (저장/제출 관리)
/student/evaluation/:id  → 평가 결과 상세

# 신규 (평가자용)
/reviewer                → 평가자 대시보드 (제출물 목록)
/reviewer/submission/:id → 제출물 평가 화면

# 공통
/login                   → 로그인 (역할별 리다이렉트)
/auth/callback           → Supabase OAuth 콜백
```

### 5.2 라우터 구조
```typescript
// src/App.tsx
<Routes>
  {/* 공통 */}
  <Route path="/login" element={<Login />} />

  {/* 강사용 (기존) */}
  <Route path="/" element={<Index />} />
  <Route path="/session/:id" element={<Session />} />

  {/* 학생용 (신규) - ProtectedRoute로 감싸기 */}
  <Route path="/student" element={
    <ProtectedRoute role="student">
      <StudentDashboard />
    </ProtectedRoute>
  } />
  <Route path="/student/practice/:id" element={
    <ProtectedRoute role="student">
      <StudentPractice />
    </ProtectedRoute>
  } />
  <Route path="/student/mypage" element={
    <ProtectedRoute role="student">
      <StudentMyPage />
    </ProtectedRoute>
  } />

  {/* 평가자용 (신규) */}
  <Route path="/reviewer" element={
    <ProtectedRoute role="reviewer">
      <ReviewerDashboard />
    </ProtectedRoute>
  } />
  <Route path="/reviewer/submission/:id" element={
    <ProtectedRoute role="reviewer">
      <ReviewerEvaluation />
    </ProtectedRoute>
  } />
</Routes>
```

---

## 🔐 6. 백엔드 API 엔드포인트

### 6.1 API 구조

**Base URL**: `https://api-<project>.railway.app` (Railway 자동 생성)

#### 인증 (Auth)
```
POST   /api/auth/login          # 로그인 (JWT 발급)
GET    /api/auth/me             # 현재 사용자 정보
POST   /api/auth/logout         # 로그아웃 (선택)
```

#### 제출물 (Submissions)
```
GET    /api/submissions         # 내 제출물 목록
POST   /api/submissions         # 제출물 저장/제출
GET    /api/submissions/:id     # 제출물 상세
PUT    /api/submissions/:id     # 제출물 수정
DELETE /api/submissions/:id     # 제출물 삭제
```

#### 평가 (Evaluations)
```
GET    /api/evaluations         # 내 평가 목록
POST   /api/evaluations         # 평가 생성
GET    /api/evaluations/:id     # 평가 상세
PUT    /api/evaluations/:id     # 평가 수정
```

#### 평가자 전용
```
GET    /api/reviewer/submissions          # 모든 제출물 목록
GET    /api/reviewer/submissions/:id      # 제출물 상세
```

### 6.2 백엔드 프로젝트 구조

```
backend/
├── src/
│   ├── index.ts                 # Express 앱 엔트리
│   ├── routes/
│   │   ├── auth.routes.ts       # 인증 라우트
│   │   ├── submissions.routes.ts
│   │   ├── evaluations.routes.ts
│   │   └── reviewer.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── submissions.controller.ts
│   │   ├── evaluations.controller.ts
│   │   └── reviewer.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT 검증
│   │   └── role.middleware.ts   # 역할 체크
│   ├── services/
│   │   └── auth.service.ts      # bcrypt, JWT 로직
│   └── utils/
│       ├── prisma.ts            # Prisma Client
│       └── errors.ts            # 커스텀 에러
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
└── .env
```

#### 6.2.1 Express 앱 엔트리포인트 (`src/index.ts`)

```typescript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import submissionsRoutes from './routes/submissions.routes'
import evaluationsRoutes from './routes/evaluations.routes'
import reviewerRoutes from './routes/reviewer.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// CORS 설정 (프론트엔드 포트: 7900)
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:7900',              // 로컬 개발 (Vite)
  'https://inno.mediconsol.com',        // 프로덕션
  'https://aiclassstudio.vercel.app',   // Vercel
]

app.use(cors({
  origin: (origin, callback) => {
    // origin이 없는 경우 (예: Postman) 허용
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS 정책에 의해 차단되었습니다'))
    }
  },
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/submissions', submissionsRoutes)
app.use('/api/evaluations', evaluationsRoutes)
app.use('/api/reviewer', reviewerRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: '엔드포인트를 찾을 수 없습니다' })
})

// Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || '서버 오류가 발생했습니다'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`)
})
```

**주요 설정**:
- **CORS**: 프론트엔드 7900번 포트 허용
- **Health Check**: `/health` 엔드포인트 (Railway 헬스체크)
- **Environment Variables**: dotenv로 `.env` 로드
- **Error Handling**: 전역 에러 핸들러

### 6.3 인증 로직 (JWT)

#### 6.3.1 로그인 API
```typescript
// src/controllers/auth.controller.ts
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma'

export async function login(req, res) {
  const { email, password } = req.body

  // 사용자 조회
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' })
  }

  // 비밀번호 검증
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' })
  }

  // JWT 토큰 생성
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  })
}
```

#### 6.3.2 인증 미들웨어
```typescript
// src/middlewares/auth.middleware.ts
import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded // { userId, role }
    next()
  } catch (error) {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' })
  }
}
```

#### 6.3.3 역할 체크 미들웨어
```typescript
// src/middlewares/role.middleware.ts
export function requireRole(...allowedRoles: string[]) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: '권한이 없습니다' })
    }
    next()
  }
}

// 사용 예시
router.get('/reviewer/submissions',
  authMiddleware,
  requireRole('reviewer'),
  getReviewerSubmissions
)
```

---

## 🔐 7. 프론트엔드 인증 구현

### 7.1 API 클라이언트 설정

```typescript
// src/lib/api.ts (신규)
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터: JWT 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터: 401 에러 시 로그아웃
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### 7.2 useAuth 훅
```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react'
import api from '@/lib/api'

interface User {
  id: string
  email: string
  role: 'instructor' | 'student' | 'reviewer'
  name: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const { data } = await api.get('/api/auth/me')
        setUser(data.user)
      } catch (error) {
        localStorage.removeItem('auth_token')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('auth_token', data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  return {
    user,
    userRole: user?.role,
    isLoading,
    login,
    logout
  }
}
```

### 7.3 ProtectedRoute 컴포넌트
```typescript
// src/components/ProtectedRoute.tsx (신규)
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface Props {
  role: 'instructor' | 'student' | 'reviewer'
  children: React.ReactNode
}

export function ProtectedRoute({ role, children }: Props) {
  const { user, userRole, isLoading } = useAuth()

  if (isLoading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" />
  if (userRole !== role) return <Navigate to="/" />

  return <>{children}</>
}
```

---

## 🧩 8. 핵심 컴포넌트 재사용 전략

### 8.1 기존 컴포넌트 재사용

| 기존 컴포넌트 | 학생 시스템 활용 |
|--------------|------------------|
| `AIPanel` | 학생 플레이그라운드의 base 컴포넌트 |
| `SlideViewer` | 차시별 참고 슬라이드 (읽기 전용) |
| `TabNavigation` | 플레이그라운드 탭 전환 |
| `SessionSelector` | 차시 선택 드롭다운 |
| shadcn/ui 컴포넌트 | 모든 UI에 활용 |

### 8.2 신규 컴포넌트 (학생용)

```
src/components/student/
├── StudentDashboard.tsx      # 차시별 상태 대시보드
├── StudentPracticePanel.tsx  # AIPanel 확장 (저장/제출 버튼)
├── MyPageList.tsx            # 저장/제출 목록
├── SubmissionCard.tsx        # 제출물 카드
└── EvaluationDetail.tsx      # 평가 결과 상세
```

### 8.3 신규 컴포넌트 (평가자용)

```
src/components/reviewer/
├── ReviewerDashboard.tsx     # 제출물 목록 + 필터
├── SubmissionTable.tsx       # 제출물 테이블
├── EvaluationForm.tsx        # 평가 입력 폼
└── SubmissionViewer.tsx      # 제출물 읽기 전용 뷰어
```

### 8.4 StudentPracticePanel 예시 (AIPanel 확장)

```typescript
// src/components/student/StudentPracticePanel.tsx
import { useState } from 'react'
import AIPanel from '@/components/AIPanel'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface Props {
  sessionId: number
  // AIPanel props 전달
}

export function StudentPracticePanel({ sessionId }: Props) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [modelId, setModelId] = useState('claude-haiku')

  const handleSave = async () => {
    try {
      await api.post('/api/submissions', {
        sessionId,
        prompt,
        result,
        modelId,
        status: 'saved'
      })
      toast({ title: '저장 완료' })
    } catch (error) {
      toast({ title: '저장 실패', variant: 'destructive' })
    }
  }

  const handleSubmit = async () => {
    try {
      // 기존 제출물 확인
      const { data: existing } = await api.get(`/api/submissions?sessionId=${sessionId}&status=submitted`)

      if (existing.length > 0) {
        toast({ title: '이미 제출한 차시입니다', variant: 'destructive' })
        return
      }

      await api.post('/api/submissions', {
        sessionId,
        prompt,
        result,
        modelId,
        status: 'submitted'
      })

      toast({ title: '제출 완료' })
    } catch (error) {
      toast({ title: '제출 실패', variant: 'destructive' })
    }
  }

  return (
    <div>
      <AIPanel
        // props 전달
        onPromptChange={setPrompt}
        onResultChange={setResult}
        onModelChange={setModelId}
      />
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave} variant="outline">저장</Button>
        <Button onClick={handleSubmit}>제출</Button>
      </div>
    </div>
  )
}
```

---

## 📦 9. 패키지 추가

### 9.1 프론트엔드 (기존 프로젝트)
```bash
npm install axios
```

### 9.2 백엔드 (신규 프로젝트)
```bash
# backend/ 디렉토리에서 실행
npm init -y
npm install express cors dotenv
npm install prisma @prisma/client
npm install jsonwebtoken bcrypt
npm install -D typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken
npm install -D tsx nodemon
```

---

## 🚀 10. 구현 단계 (4주 계획)

### Phase 1: 백엔드 기반 구축 (Week 1)
**목표**: Railway 프로젝트 생성 및 API 서버 구축

**Day 1-2: Railway 설정**
- [ ] Railway 계정 생성 및 프로젝트 생성
- [ ] GitHub 연동 (backend 폴더)
- [ ] PostgreSQL 추가
- [ ] 환경변수 설정 (JWT_SECRET, NODE_ENV)
- [ ] backend/ 디렉토리 생성 및 패키지 설치

**Day 3: 데이터베이스 설정**
- [ ] Prisma schema 작성
- [ ] `prisma migrate dev --name init` 실행
- [ ] 테스트 사용자 생성 스크립트 작성
  ```typescript
  // seed.ts
  import { PrismaClient } from '@prisma/client'
  import bcrypt from 'bcrypt'

  const prisma = new PrismaClient()

  async function main() {
    const hashedPassword = await bcrypt.hash('test1234', 10)

    await prisma.user.createMany({
      data: [
        { email: 'student1@test.com', passwordHash: hashedPassword, role: 'student', name: '학생1' },
        { email: 'student2@test.com', passwordHash: hashedPassword, role: 'student', name: '학생2' },
        { email: 'reviewer1@test.com', passwordHash: hashedPassword, role: 'reviewer', name: '평가자1' },
        { email: 'instructor1@test.com', passwordHash: hashedPassword, role: 'instructor', name: '강사1' }
      ]
    })
  }

  main()
  ```

**Day 4-5: API 구현**
- [ ] Express 앱 기본 구조 (`src/index.ts`)
- [ ] Auth API (`/api/auth/login`, `/api/auth/me`)
- [ ] Submissions API (CRUD)
- [ ] Evaluations API (CRUD)
- [ ] Reviewer API
- [ ] CORS 설정 (Vercel 도메인 허용)
- [ ] Railway 배포 테스트

### Phase 2: 프론트엔드 인증 및 학생 기능 (Week 2)
**목표**: 프론트엔드 API 연동 및 학생 플레이그라운드

**Day 1-2: 인증 기능**
- [ ] `src/lib/api.ts` API 클라이언트 생성
- [ ] `src/hooks/useAuth.ts` 인증 훅
- [ ] Login 페이지 Railway API 연동
- [ ] ProtectedRoute 컴포넌트
- [ ] Vercel 환경변수 추가 (`VITE_API_URL`)

**Day 3: 학생 대시보드**
- [ ] StudentDashboard 페이지 (`/student`)
- [ ] 차시별 제출 상태 API 호출
- [ ] 차시 카드 UI

**Day 4-5: 학생 플레이그라운드**
- [ ] StudentPractice 페이지 (`/student/practice/:id`)
- [ ] AIPanel 확장 (저장/제출 버튼)
- [ ] 저장 API 연동
- [ ] 제출 API 연동 (중복 제출 방지)
- [ ] 마이페이지 (`/student/mypage`)
  - 저장된 실습 목록
  - 제출 이력
  - 평가 결과 조회

### Phase 3: 평가자 기능 (Week 3)
**목표**: 평가자 관리 화면

**Day 1-2: 평가자 대시보드**
- [ ] ReviewerDashboard 페이지 (`/reviewer`)
- [ ] 제출물 목록 API 호출
- [ ] 차시별/학생별 필터
- [ ] 평가 상태 표시

**Day 3-4: 제출물 평가**
- [ ] ReviewerEvaluation 페이지 (`/reviewer/submission/:id`)
- [ ] 제출물 읽기 전용 뷰어
- [ ] 평가 입력 폼 (React Hook Form + Zod)
- [ ] 평가 API 연동

**Day 5: 평가 히스토리**
- [ ] 평가자 통계 (총 평가 수, 평균 점수)
- [ ] 내가 평가한 목록

### Phase 4: 테스트 및 배포 (Week 4)
**목표**: QA 및 프로덕션 배포

**Day 1-2: E2E 테스트**
- [ ] 학생 플로우: 로그인 → 실습 → 저장 → 제출 → 평가 확인
- [ ] 평가자 플로우: 로그인 → 제출물 조회 → 평가
- [ ] 권한 테스트 (학생이 평가자 라우트 접근 차단)

**Day 3: 에러 핸들링 및 UX**
- [ ] API 에러 메시지 개선
- [ ] Skeleton UI 추가
- [ ] 로딩 상태 표시
- [ ] 반응형 디자인 점검

**Day 4-5: 배포 및 문서화**
- [ ] Railway 프로덕션 배포 확인
- [ ] Vercel 프로덕션 배포
- [ ] 사용자 매뉴얼 작성 (학생용, 평가자용)
- [ ] 관리자 가이드 (사용자 생성 방법)

---

## 🔍 11. 주요 고려사항

### 11.1 보안
- ✅ JWT 토큰으로 인증 (7일 만료)
- ✅ API 레벨에서 권한 체크 (미들웨어)
- ✅ bcrypt로 비밀번호 해싱
- ✅ CORS 설정 (Vercel 도메인만 허용)
- ✅ 클라이언트 AI API 키는 Vercel 환경변수로 관리 (기존)
- ⚠️ JWT_SECRET 안전하게 관리 (Railway 환경변수)
- ⚠️ API Rate Limiting 필요시 Express middleware 추가

### 11.2 성능
- 학생 50명 기준, Railway 무료 티어 충분 ($5 크레딧/월)
- AI API 호출은 기존처럼 클라이언트 직접 호출 (서버 비용 절감)
- TanStack Query로 서버 상태 캐싱 및 자동 재검증
- Prisma 쿼리 최적화 (select, include)

### 11.3 확장성
- 추후 학생 수 증가 시 Railway 유료 플랜
- PostgreSQL 커넥션 풀링 (Prisma 기본 제공)
- AI API 호출량 증가 시 백엔드 프록시 추가 가능
- WebSocket 추가 시 Socket.io 연동 (평가 실시간 알림)

### 11.4 기존 강사 기능 영향
- ❌ **기존 코드 수정 최소화**
- ✅ 강사용 라우트(`/`, `/session/:id`)는 그대로 유지
- ✅ 기존 컴포넌트는 props만 확장 (하위 호환성)
- ✅ 강사는 로그인 없이 기존 방식 사용 가능 (옵션)

---

## 📚 12. 참고 문서

### Railway
- [Railway 공식 문서](https://docs.railway.app/)
- [Railway + Prisma 가이드](https://docs.railway.app/guides/prisma)
- [Railway 환경변수](https://docs.railway.app/develop/variables)

### 백엔드
- [Prisma 공식 문서](https://www.prisma.io/docs)
- [Express.js](https://expressjs.com/)
- [JWT 인증 가이드](https://jwt.io/introduction)

### 프론트엔드
- [Axios 문서](https://axios-http.com/docs/intro)
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Vercel 환경변수](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ 다음 단계

1. ✅ 이 문서 검토 및 피드백
2. → `todo-list.md` Railway 기반으로 업데이트
3. → Railway 프로젝트 생성 및 설정
4. → 백엔드 프로젝트 초기 설정
5. → Phase 1 구현 시작

---

**문서 버전**: v2.0 (Railway 기반)
**최종 수정**: 2025-12-29
