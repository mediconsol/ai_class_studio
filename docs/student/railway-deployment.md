# Railway 배포 가이드

## 1. Railway 프로젝트 생성 (완료)

- ✅ Railway PostgreSQL 데이터베이스 생성 완료
- ✅ 데이터베이스 연결 정보 확인

## 2. GitHub 연결 및 백엔드 서비스 추가

### 2.1 Railway 프로젝트에 GitHub 연결
1. Railway 대시보드 접속: https://railway.app
2. 기존 프로젝트 선택 (PostgreSQL이 있는 프로젝트)
3. "New" → "GitHub Repo" 클릭
4. `mediconsol/ai_class_studio` 저장소 선택
5. 배포 시작 (잠시 대기)
6. **Settings** → **Root Directory**: `backend` 입력 (슬래시 없이!)
7. 저장 후 자동 재배포 확인

### 2.2 환경변수 설정
Railway 프로젝트의 백엔드 서비스에서 다음 환경변수를 설정:

```bash
# 데이터베이스 (PostgreSQL 서비스와 연결 시 자동 설정됨)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT Secret (보안상 강력한 랜덤 문자열 사용)
JWT_SECRET=your-production-secret-key-change-this-to-random-string

# Node 환경
NODE_ENV=production

# CORS 허용 도메인 (프론트엔드 도메인)
CORS_ORIGIN=https://inno.mediconsol.com,https://aiclassstudio.vercel.app

# 포트 (Railway가 자동 설정하지만 명시 가능)
PORT=3000
```

### 2.3 빌드 및 배포 설정
Railway는 `nixpacks.toml` 파일을 자동으로 감지합니다:

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x"]

[phases.install]
cmds = [
  "npm ci",
  "npm run prisma:generate"
]

[phases.build]
cmds = [
  "npm run build"
]

[start]
cmd = "npm run prisma:migrate && npm start"
```

**주요 설정:**
- Setup: Node.js 20.x 사용
- Install: npm ci로 의존성 설치 → Prisma Client 생성
- Build: TypeScript 컴파일
- Start: Prisma 마이그레이션 실행 → 서버 시작

## 3. 배포 프로세스

### 3.1 자동 배포
- GitHub의 `main` 브랜치에 푸시하면 자동으로 배포됩니다
- Railway가 변경사항을 감지하고 빌드/배포를 시작합니다

### 3.2 배포 확인
1. Railway 대시보드에서 "Deployments" 탭 확인
2. 빌드 로그 확인:
   - ✅ npm install 성공
   - ✅ prisma generate 성공
   - ✅ TypeScript 빌드 성공
   - ✅ Prisma migrate 성공
   - ✅ 서버 시작 성공

3. 배포 완료 후 도메인 확인:
   - Railway가 제공하는 도메인: `https://your-app.railway.app`
   - 또는 커스텀 도메인 설정 가능

## 4. 배포 후 확인

### 4.1 Health Check
```bash
curl https://your-app.railway.app/health
```

예상 응답:
```json
{
  "status": "ok",
  "timestamp": "2025-12-29T13:00:00.000Z"
}
```

### 4.2 로그인 테스트
```bash
curl -X POST https://your-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@test.com","password":"test1234"}'
```

### 4.3 데이터베이스 시드 (최초 1회)
Railway 대시보드 또는 Railway CLI로 시드 실행:

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 프로젝트 연결
railway link

# 시드 실행
railway run npm run prisma:seed
```

## 5. 모니터링

### 5.1 Railway 대시보드
- Metrics: CPU, Memory, Network 사용량
- Logs: 실시간 로그 확인
- Deployments: 배포 이력

### 5.2 에러 로그 확인
Railway 대시보드의 "Logs" 탭에서 에러 확인:
- Prisma 연결 에러
- JWT 에러
- API 에러

## 6. 트러블슈팅

### 문제 1: Prisma 마이그레이션 실패
**원인:** DATABASE_URL이 올바르게 설정되지 않음

**해결:**
1. Railway에서 PostgreSQL 서비스와 백엔드 서비스 연결 확인
2. `DATABASE_URL=${{Postgres.DATABASE_URL}}` 설정 확인

### 문제 2: 빌드 실패
**원인:** Node.js 버전 불일치

**해결:**
Railway 설정에서 Node.js 버전 명시:
- 환경변수에 `NODE_VERSION=20.x` 추가

### 문제 3: CORS 에러
**원인:** CORS_ORIGIN이 올바르게 설정되지 않음

**해결:**
1. Railway 환경변수에 프론트엔드 도메인 추가
2. 쉼표로 구분하여 여러 도메인 허용

## 7. 커스텀 도메인 설정 (선택사항)

Railway에서 커스텀 도메인 추가:
1. Railway 프로젝트 → Settings → Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: `api.mediconsol.com`)
4. DNS 설정: CNAME 레코드 추가
   - Name: `api`
   - Value: Railway 제공 도메인

## 8. 현재 상태 (2025-12-29)

- ✅ GitHub 푸시 완료 (3개 커밋)
  - bedc6c1: Express 서버 및 인증 API
  - ae530f4: Submission API
  - 8fe1b58: Evaluation API

- ⏳ Railway 자동 배포 대기 중
  - GitHub webhook이 Railway에 변경사항 전달
  - Railway가 자동으로 빌드 및 배포 시작

- 📋 다음 단계
  1. Railway 대시보드에서 배포 상태 확인
  2. 환경변수 설정 (JWT_SECRET, CORS_ORIGIN)
  3. 데이터베이스 시드 실행
  4. API 엔드포인트 테스트

## 9. API 엔드포인트 목록

배포 완료 후 사용 가능한 엔드포인트:

### 인증
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보

### 제출물
- `POST /api/submissions` - 제출물 생성/업데이트 (학생)
- `GET /api/submissions` - 제출물 목록 조회
- `GET /api/submissions/:id` - 제출물 상세 조회

### 평가
- `POST /api/evaluations` - 평가 생성/업데이트 (평가자)
- `GET /api/evaluations/:submissionId` - 평가 조회

---

## 참고 자료

- Railway 공식 문서: https://docs.railway.app
- Prisma 배포 가이드: https://www.prisma.io/docs/guides/deployment
- Express 프로덕션 베스트 프랙티스: https://expressjs.com/en/advanced/best-practice-performance.html
