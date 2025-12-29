# 학생/평가자 시스템 TODO 리스트

> **프로젝트**: AI Class Studio - 학생 실습 플랫폼
> **시작일**: 2025-12-29
> **예상 완료**: 2025-01-26 (4주)

---

## 📋 작업 범례

- ✅ 완료
- 🚧 진행중
- ⏳ 대기중
- ❌ 블로킹

---

## 🗓️ Week 1: 백엔드 기반 구축 (2025-12-30 ~ 2026-01-05)

### Day 1: Railway 프로젝트 설정

#### ⏳ 1.1 Railway 계정 및 프로젝트 생성
- [ ] Railway 계정 생성/로그인 (https://railway.app)
- [ ] GitHub 계정 연동
- [ ] 새 프로젝트 생성
  - Project name: `ai-class-studio-backend`
- [ ] PostgreSQL 데이터베이스 추가
  - New → Database → PostgreSQL
  - 자동으로 `DATABASE_URL` 환경변수 생성됨
- [ ] 환경변수 설정
  - `NODE_ENV=production`
  - `JWT_SECRET=<강력한_랜덤_문자열>` (예: openssl rand -base64 32)

#### ⏳ 1.2 백엔드 프로젝트 초기 설정
- [ ] 프로젝트 루트에 `backend/` 디렉토리 생성
  ```bash
  mkdir backend
  cd backend
  ```
- [ ] npm 초기화 및 패키지 설치
  ```bash
  npm init -y
  npm install express cors dotenv
  npm install prisma @prisma/client
  npm install jsonwebtoken bcrypt
  npm install -D typescript @types/node @types/express @types/bcrypt @types/jsonwebtoken
  npm install -D tsx nodemon
  ```
- [ ] `package.json` scripts 추가
  ```json
  {
    "scripts": {
      "dev": "nodemon --exec tsx src/index.ts",
      "build": "tsc",
      "start": "node dist/index.js",
      "prisma:migrate": "prisma migrate deploy",
      "prisma:generate": "prisma generate"
    }
  }
  ```
- [ ] `tsconfig.json` 생성
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }
  ```

### Day 2: Prisma 및 데이터베이스 설정

#### ⏳ 1.3 Prisma 초기화
- [ ] Prisma 초기화
  ```bash
  npx prisma init
  ```
- [ ] `.env` 파일 생성 (로컬 개발용)
  ```
  DATABASE_URL="postgresql://user:password@localhost:5432/aiclass"
  JWT_SECRET="your-secret-key"
  ```
- [ ] `prisma/schema.prisma` 작성
  ```prisma
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

#### ⏳ 1.4 마이그레이션 및 Seed 데이터
- [ ] 마이그레이션 생성 및 실행
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] `prisma/seed.ts` 생성 (테스트 계정)
  ```typescript
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
    console.log('Seed 데이터 생성 완료')
  }

  main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
  ```
- [ ] `package.json`에 prisma seed 설정 추가
  ```json
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
  ```
- [ ] Seed 실행
  ```bash
  npx prisma db seed
  ```

### Day 3: Express API 구현 (인증)

#### ⏳ 1.5 프로젝트 구조 생성
- [ ] `backend/src/` 디렉토리 구조 생성
  ```bash
  mkdir -p src/{routes,controllers,middlewares,services,utils}
  ```

#### ⏳ 1.6 Prisma Client 설정
- [ ] `src/utils/prisma.ts` 생성
  ```typescript
  import { PrismaClient } from '@prisma/client'

  export const prisma = new PrismaClient()
  ```

#### ⏳ 1.7 인증 컨트롤러 구현
- [ ] `src/controllers/auth.controller.ts` 생성
  ```typescript
  import bcrypt from 'bcrypt'
  import jwt from 'jsonwebtoken'
  import { Request, Response } from 'express'
  import { prisma } from '../utils/prisma'

  export async function login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' })
      }

      const isValid = await bcrypt.compare(password, user.passwordHash)
      if (!isValid) {
        return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' })
      }

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
    } catch (error) {
      res.status(500).json({ error: '서버 오류' })
    }
  }

  export async function getMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, role: true, name: true }
      })

      if (!user) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다' })
      }

      res.json({ user })
    } catch (error) {
      res.status(500).json({ error: '서버 오류' })
    }
  }
  ```

#### ⏳ 1.8 인증 미들웨어 구현
- [ ] `src/middlewares/auth.middleware.ts` 생성
  ```typescript
  import jwt from 'jsonwebtoken'
  import { Request, Response, NextFunction } from 'express'

  export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: '인증이 필요합니다' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
      ;(req as any).user = decoded
      next()
    } catch (error) {
      return res.status(401).json({ error: '유효하지 않은 토큰입니다' })
    }
  }
  ```
- [ ] `src/middlewares/role.middleware.ts` 생성
  ```typescript
  import { Request, Response, NextFunction } from 'express'

  export function requireRole(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRole = (req as any).user?.role

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: '권한이 없습니다' })
      }

      next()
    }
  }
  ```

#### ⏳ 1.9 인증 라우트 구현
- [ ] `src/routes/auth.routes.ts` 생성
  ```typescript
  import express from 'express'
  import { login, getMe } from '../controllers/auth.controller'
  import { authMiddleware } from '../middlewares/auth.middleware'

  const router = express.Router()

  router.post('/login', login)
  router.get('/me', authMiddleware, getMe)

  export default router
  ```

### Day 4-5: Express 앱 완성 및 배포

#### ⏳ 1.10 Express 앱 엔트리포인트
- [ ] `src/index.ts` 생성
  ```typescript
  import express from 'express'
  import cors from 'cors'
  import dotenv from 'dotenv'
  import authRoutes from './routes/auth.routes'

  dotenv.config()

  const app = express()
  const PORT = process.env.PORT || 3000

  // CORS 설정 (프론트엔드 7900번 포트 허용)
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:7900',
    'https://inno.mediconsol.com',
    'https://aiclassstudio.vercel.app',
  ]

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('CORS 차단'))
      }
    },
    credentials: true,
  }))

  app.use(express.json())

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  // API Routes
  app.use('/api/auth', authRoutes)

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
  ```

#### ⏳ 1.11 Submissions & Evaluations API 구현
- [ ] `src/controllers/submissions.controller.ts` 생성
  - `getMySubmissions`: 내 제출물 목록
  - `createSubmission`: 제출물 저장/제출
  - `getSubmissionById`: 제출물 상세
  - `updateSubmission`: 제출물 수정
  - `deleteSubmission`: 제출물 삭제
- [ ] `src/routes/submissions.routes.ts` 생성
- [ ] `src/controllers/evaluations.controller.ts` 생성
  - `getMyEvaluations`: 내 평가 목록
  - `createEvaluation`: 평가 생성 (평가자 전용)
  - `updateEvaluation`: 평가 수정 (평가자 전용)
- [ ] `src/routes/evaluations.routes.ts` 생성

#### ⏳ 1.12 Reviewer API 구현
- [ ] `src/controllers/reviewer.controller.ts` 생성
  - `getAllSubmissions`: 모든 제출물 목록 (평가자 전용)
  - `getSubmissionById`: 제출물 상세 (평가자 전용)
- [ ] `src/routes/reviewer.routes.ts` 생성
- [ ] `src/index.ts`에 라우트 추가

#### ⏳ 1.13 로컬 테스트
- [ ] `backend/` 디렉토리에서 `npm run dev` 실행
- [ ] Postman/Thunder Client로 API 테스트
  - `POST /api/auth/login` (로그인)
  - `GET /api/auth/me` (현재 사용자)
  - `GET /health` (헬스체크)
- [ ] 프론트엔드 7900 포트에서 CORS 정상 동작 확인

#### ⏳ 1.14 Railway 배포
- [ ] Railway 프로젝트에 GitHub 레포 연동
- [ ] Root Directory: `backend/` 설정
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm run start`
- [ ] 환경변수 설정 (Railway Dashboard)
  - `DATABASE_URL` (자동 생성됨)
  - `JWT_SECRET` (openssl rand -base64 32로 생성)
  - `NODE_ENV=production`
  - `CORS_ORIGIN=https://inno.mediconsol.com,https://aiclassstudio.vercel.app`
- [ ] 배포 성공 확인 및 URL 복사
- [ ] Vercel 환경변수에 `VITE_API_URL` 추가 (Railway URL)

---

## 🗓️ Week 2: 프론트엔드 인증 및 학생 기능 (2026-01-06 ~ 2026-01-12)

### Day 1: 학생 대시보드

#### ⏳ 2.1 StudentDashboard 페이지
- [ ] `src/pages/student/StudentDashboard.tsx` 생성
  - 차시별 제출 상태 조회 (1~20차시)
  - 상태 표시: 미실습 / 저장됨 / 제출완료 / 평가완료
  - 실습하기 버튼 → `/student/practice/:id`
- [ ] 차시별 상태 집계 로직
  ```typescript
  const fetchSessionStatus = async (userId: string) => {
    const { data } = await supabase
      .from('submissions')
      .select('session_id, status, evaluations(score)')
      .eq('user_id', userId)

    // 1~20차시 상태 매핑
    return sessionStatusMap
  }
  ```
- [ ] UI 구현 (카드 그리드 레이아웃)

#### ⏳ 2.2 라우팅 추가
- [ ] `src/App.tsx`에 학생 라우트 추가
  ```typescript
  <Route path="/student" element={
    <ProtectedRoute role="student">
      <StudentDashboard />
    </ProtectedRoute>
  } />
  ```

### Day 2-3: 학생 플레이그라운드

#### ⏳ 2.3 StudentPractice 페이지
- [ ] `src/pages/student/StudentPractice.tsx` 생성
  - URL 파라미터로 `sessionId` 받기
  - 차시 데이터 로드 (`getSession(sessionId)`)
  - AI 프롬프트/응답 상태 관리

#### ⏳ 2.4 StudentPracticePanel 컴포넌트
- [ ] `src/components/student/StudentPracticePanel.tsx` 생성
  - 기존 `AIPanel` 재사용
  - **저장** 버튼 추가
    ```typescript
    const handleSave = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('submissions').insert({
        user_id: user!.id,
        session_id: sessionId,
        prompt,
        result,
        model_id: selectedModelId,
        status: 'saved'
      })
      toast({ title: '저장 완료' })
    }
    ```
  - **제출** 버튼 추가
    - 기존 제출 확인 (중복 방지)
    - 확인 다이얼로그
    ```typescript
    const handleSubmit = async () => {
      // 기존 제출 확인
      const { data: existing } = await supabase
        .from('submissions')
        .select('id')
        .eq('user_id', user!.id)
        .eq('session_id', sessionId)
        .eq('status', 'submitted')
        .single()

      if (existing) {
        toast({ title: '이미 제출한 차시입니다', variant: 'destructive' })
        return
      }

      // 제출
      await supabase.from('submissions').insert({
        user_id: user!.id,
        session_id: sessionId,
        prompt,
        result,
        model_id: selectedModelId,
        status: 'submitted'
      })

      toast({ title: '제출 완료' })
      navigate('/student/mypage')
    }
    ```

### Day 4-5: 학생 마이페이지

#### ⏳ 2.5 StudentMyPage 페이지
- [ ] `src/pages/student/StudentMyPage.tsx` 생성
  - 탭 구조: 저장된 실습 / 제출 이력 / 평가 결과
  - 저장된 실습 목록
    ```typescript
    const { data: savedSubmissions } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'saved')
      .order('created_at', { ascending: false })
    ```
  - 제출 이력
    ```typescript
    const { data: submittedSubmissions } = await supabase
      .from('submissions')
      .select('*, evaluations(*)')
      .eq('user_id', userId)
      .eq('status', 'submitted')
      .order('created_at', { ascending: false })
    ```

#### ⏳ 2.6 SubmissionCard 컴포넌트
- [ ] `src/components/student/SubmissionCard.tsx` 생성
  - 차시 정보, 생성일, 상태 표시
  - 미리보기 버튼 (모달)
  - 저장된 실습 → 제출하기 버튼

#### ⏳ 2.7 EvaluationDetail 컴포넌트
- [ ] `src/components/student/EvaluationDetail.tsx` 생성
  - 프롬프트/결과 읽기 전용
  - 점수 표시
  - 평가 코멘트

---

## 🗓️ Week 3: 평가자 기능 구현 (2026-01-13 ~ 2026-01-19)

### Day 1-2: 평가자 대시보드

#### ⏳ 3.1 ReviewerDashboard 페이지
- [ ] `src/pages/reviewer/ReviewerDashboard.tsx` 생성
  - 제출물 목록 테이블
  - 필터: 차시별, 평가 상태별
  - 정렬: 제출일 기준

#### ⏳ 3.2 SubmissionTable 컴포넌트
- [ ] `src/components/reviewer/SubmissionTable.tsx` 생성
  - 컬럼: 학생명, 차시, 제출일, 평가 상태, 액션
  - 제출물 조회 쿼리
    ```typescript
    const { data: submissions } = await supabase
      .from('submissions')
      .select(`
        *,
        profiles!user_id(name, email),
        evaluations(score, created_at)
      `)
      .eq('status', 'submitted')
      .order('created_at', { ascending: false })
    ```
  - 차시 필터 드롭다운
  - 평가 상태 필터 (미평가 / 평가완료)

#### ⏳ 3.3 라우팅 추가
- [ ] `src/App.tsx`에 평가자 라우트 추가
  ```typescript
  <Route path="/reviewer" element={
    <ProtectedRoute role="reviewer">
      <ReviewerDashboard />
    </ProtectedRoute>
  } />
  ```

### Day 3-4: 제출물 평가 화면

#### ⏳ 3.4 ReviewerEvaluation 페이지
- [ ] `src/pages/reviewer/ReviewerEvaluation.tsx` 생성
  - URL 파라미터로 `submissionId` 받기
  - 제출물 데이터 로드
    ```typescript
    const { data: submission } = await supabase
      .from('submissions')
      .select(`
        *,
        profiles!user_id(name, email),
        evaluations(*)
      `)
      .eq('id', submissionId)
      .single()
    ```

#### ⏳ 3.5 SubmissionViewer 컴포넌트
- [ ] `src/components/reviewer/SubmissionViewer.tsx` 생성
  - 프롬프트 영역 (읽기 전용)
  - AI 결과 영역 (읽기 전용)
  - 사용한 모델 정보 표시
  - 기존 `AIPanel` 구조 재사용 (편집 비활성화)

#### ⏳ 3.6 EvaluationForm 컴포넌트
- [ ] `src/components/reviewer/EvaluationForm.tsx` 생성
  - 점수 입력 (0~100, Number Input)
  - 평가 코멘트 (Textarea)
  - React Hook Form + Zod 검증
    ```typescript
    const schema = z.object({
      score: z.number().min(0).max(100),
      comment: z.string().optional()
    })
    ```
  - 평가 완료 버튼
    ```typescript
    const handleSubmit = async (data) => {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.from('evaluations').insert({
        submission_id: submissionId,
        reviewer_id: user!.id,
        score: data.score,
        comment: data.comment
      })

      toast({ title: '평가 완료' })
      navigate('/reviewer')
    }
    ```
  - 이미 평가된 제출물은 수정 모드

### Day 5: 평가 히스토리

#### ⏳ 3.7 평가 히스토리 기능
- [ ] 평가자 대시보드에 "내가 평가한 목록" 탭 추가
- [ ] 평가 통계 (총 평가 수, 평균 점수)

---

## 🗓️ Week 4: 테스트 및 배포 (2026-01-20 ~ 2026-01-26)

### Day 1-2: E2E 시나리오 테스트

#### ⏳ 4.1 학생 플로우 테스트
- [ ] 로그인 (student1@test.com)
- [ ] 대시보드에서 차시 선택
- [ ] 플레이그라운드에서 AI 실행
- [ ] 저장 → 마이페이지에서 확인
- [ ] 제출 → 상태 변경 확인
- [ ] 중복 제출 방지 테스트

#### ⏳ 4.2 평가자 플로우 테스트
- [ ] 로그인 (reviewer1@test.com)
- [ ] 제출물 목록 확인
- [ ] 필터 기능 테스트
- [ ] 제출물 상세 → 평가 입력
- [ ] 평가 완료 → 학생 마이페이지에서 결과 확인

#### ⏳ 4.3 권한 테스트
- [ ] 학생이 평가자 라우트 접근 시 리다이렉트
- [ ] 평가자가 학생 플레이그라운드 접근 시 리다이렉트
- [ ] RLS 정책 검증 (다른 학생 제출물 조회 불가)

### Day 3: 에러 핸들링 및 UX 개선

#### ⏳ 4.4 에러 핸들링
- [ ] Supabase 에러 메시지 사용자 친화적으로 변환
- [ ] 네트워크 에러 처리
- [ ] AI API 에러 처리 (기존 로직 유지)
- [ ] 404 에러 페이지 (잘못된 submission ID)

#### ⏳ 4.5 로딩 상태 UX
- [ ] Skeleton UI 추가 (테이블, 카드)
- [ ] AI 응답 대기 중 로딩 표시 (기존 유지)
- [ ] 제출/평가 완료 시 성공 애니메이션

#### ⏳ 4.6 반응형 디자인 점검
- [ ] 모바일 뷰 테스트 (학생 대시보드, 플레이그라운드)
- [ ] 태블릿 뷰 테스트

### Day 4: 문서화 및 배포 준비

#### ⏳ 4.7 사용자 매뉴얼 작성
- [ ] `docs/student/user-guide-student.md` (학생용)
- [ ] `docs/student/user-guide-reviewer.md` (평가자용)
- [ ] 스크린샷 캡처 및 첨부

#### ⏳ 4.8 관리자 가이드
- [ ] `docs/student/admin-guide.md`
  - 사용자 계정 생성 방법
  - 역할 할당 방법
  - 데이터 백업 가이드

#### ⏳ 4.9 배포 전 체크리스트
- [ ] `.env.example` 최신화
- [ ] Vercel 환경변수 확인
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - 기존 AI API 키들
- [ ] Git commit & push
- [ ] Vercel 자동 배포 확인

### Day 5: 프로덕션 배포 및 최종 검증

#### ⏳ 4.10 프로덕션 배포
- [ ] Vercel 프로덕션 빌드
- [ ] 도메인 접근 테스트
  - `inno.mediconsol.com`
  - `aiclassstudio.vercel.app`
- [ ] HTTPS 확인

#### ⏳ 4.11 프로덕션 E2E 테스트
- [ ] 실제 계정으로 전체 플로우 테스트
- [ ] 성능 모니터링 (Vercel Analytics)
- [ ] Supabase 대시보드에서 쿼리 성능 확인

#### ⏳ 4.12 사용자 온보딩
- [ ] 테스트 사용자 계정 전달 (이노솔루션 담당자)
- [ ] 사용자 매뉴얼 공유
- [ ] 피드백 수집 채널 설정

---

## 🔄 추가 개선 사항 (백로그)

### 선택적 기능 (Phase 2)
- [ ] 학생 프로필 페이지 (이름, 이메일 수정)
- [ ] 평가자 코멘트 템플릿 기능
- [ ] 차시별 평균 점수 통계 (평가자용)
- [ ] 학생 진도율 시각화 (대시보드)
- [ ] AI 응답 히스토리 (학생이 여러 번 실행한 결과 저장)
- [ ] 실시간 알림 (평가 완료 시 Supabase Realtime)
- [ ] 다크 모드 지원 (기존 시스템과 통일)

### 성능 최적화
- [ ] TanStack Query로 서버 상태 캐싱
- [ ] 이미지 최적화 (차시 썸네일)
- [ ] 코드 스플리팅 (학생/평가자 라우트 lazy load)

### 보안 강화
- [ ] Vercel Edge Middleware로 Rate Limiting
- [ ] Supabase Database Webhook (제출물 백업)
- [ ] AI API 키 백엔드 프록시 (사용량 제어)

---

## 📞 이슈 트래킹

### 블로킹 이슈
- 없음

### 논의 필요
- [ ] 학생 계정 일괄 생성 방법 (CSV 업로드 vs 수동 생성)
- [ ] 평가 점수 가중치 (차시별 배점 다른지?)
- [ ] 제출 마감 기한 기능 필요 여부

---

**문서 버전**: v1.0
**최종 수정**: 2025-12-29
