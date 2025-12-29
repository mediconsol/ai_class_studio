# AI Class Studio - Backend API

> Express.js + Prisma + PostgreSQL 백엔드 서버 (Railway 배포)

## 🚀 로컬 개발

### 1. 환경변수 설정

`backend/.env` 파일 생성:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/aiclass"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
```

### 2. 패키지 설치

```bash
cd backend
npm install
```

### 3. 데이터베이스 마이그레이션

```bash
npx prisma migrate dev --name init
```

### 4. Seed 데이터 생성 (테스트 계정)

```bash
npx prisma db seed
```

테스트 계정:
- 학생1: `student1@test.com` / `test1234`
- 학생2: `student2@test.com` / `test1234`
- 평가자: `reviewer1@test.com` / `test1234`
- 강사: `instructor1@test.com` / `test1234`

### 5. 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

---

## 📦 배포 (Railway)

### Railway 프로젝트 설정

1. Railway 대시보드에서 GitHub 레포 연동
2. **Root Directory 설정**: `backend/`
3. **Build Command**: `npm run build`
4. **Start Command**: `npm run start`
5. 환경변수 설정:
   - `DATABASE_URL` (자동 생성됨 - PostgreSQL 추가 시)
   - `JWT_SECRET` (수동 입력)
   - `NODE_ENV=production`

### 배포 URL

Railway가 자동으로 생성: `https://<project>.railway.app`

이 URL을 프론트엔드 `.env`에 추가:
```
VITE_API_URL=https://<project>.railway.app
```

---

## 📚 API 엔드포인트

### 인증
- `POST /api/auth/login` - 로그인 (JWT 발급)
- `GET /api/auth/me` - 현재 사용자 정보

### 제출물 (학생)
- `GET /api/submissions` - 내 제출물 목록
- `POST /api/submissions` - 제출물 저장/제출
- `GET /api/submissions/:id` - 제출물 상세
- `PUT /api/submissions/:id` - 제출물 수정
- `DELETE /api/submissions/:id` - 제출물 삭제

### 평가 (학생)
- `GET /api/evaluations` - 내 평가 목록
- `GET /api/evaluations/:id` - 평가 상세

### 평가자 전용
- `GET /api/reviewer/submissions` - 모든 제출물 목록
- `GET /api/reviewer/submissions/:id` - 제출물 상세
- `POST /api/evaluations` - 평가 생성
- `PUT /api/evaluations/:id` - 평가 수정

---

## 🗄️ 데이터베이스 스키마

### User
- id (UUID)
- email (UNIQUE)
- passwordHash
- role (instructor | student | reviewer)
- name
- createdAt

### Submission
- id (UUID)
- userId (FK)
- sessionId (1~20)
- prompt
- result
- modelId
- status (saved | submitted)
- createdAt / updatedAt

### Evaluation
- id (UUID)
- submissionId (FK, UNIQUE)
- reviewerId (FK)
- score (0~100)
- comment
- createdAt

---

## 🔐 보안

- JWT 토큰 인증 (7일 만료)
- bcrypt 비밀번호 해싱 (salt rounds: 10)
- CORS 설정 (Vercel 도메인만 허용)
- API 미들웨어 레벨 권한 체크

---

## 🛠️ 기술 스택

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: PostgreSQL (Railway 제공)
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Language**: TypeScript

---

**배포 환경**: Railway
**프론트엔드**: `/` (Vercel)
