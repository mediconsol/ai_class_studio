# 🚀 Railway 백엔드 배포 - 빠른 시작 가이드

## 📋 단계별 설정 (5분)

### Step 1: Railway 백엔드 서비스 생성

1. **Railway 프로젝트** 접속 (PostgreSQL이 있는 프로젝트)
2. **"New"** → **"GitHub Repo"** 클릭
3. `mediconsol/ai_class_studio` 저장소 선택
4. 배포 시작 (잠시 대기)

### Step 2: Root Directory 설정

1. 새로 생성된 **백엔드 서비스** 클릭
2. **Settings** 탭
3. **"Root Directory"** 찾기
4. `/backend` 입력 후 저장

### Step 3: 환경변수 설정 (가장 중요!)

1. **Variables** 탭 클릭
2. **"Raw Editor"** 버튼 클릭
3. 아래 파일 내용 **전체 복사**:

   ```
   backend/RAILWAY_ENV.txt
   ```

4. Raw Editor에 **붙여넣기**
5. **"Update Variables"** 클릭

### Step 4: PostgreSQL 연결

1. 백엔드 서비스 **Settings**
2. **"Connect"** → **PostgreSQL 서비스** 선택
3. 연결 완료!

### Step 5: 재배포 확인

환경변수 저장 후 자동으로 재배포됩니다.

**Deployments** 탭에서 진행 상황 확인:
- ✅ Building...
- ✅ Deploying...
- ✅ Success!

---

## 🎯 환경변수 파일 위치

**복사할 파일:**
```
backend/RAILWAY_ENV.txt
```

이 파일에는 다음이 포함되어 있습니다:
- ✅ DATABASE_URL (PostgreSQL 연결)
- ✅ JWT_SECRET (새로 생성됨)
- ✅ AI API Keys (Anthropic, OpenAI, Google)
- ✅ CORS 설정
- ✅ 기타 설정

---

## ✅ 배포 완료 확인

### 1. Railway 도메인 확인

배포 완료 후 Settings → Domains에서 도메인 확인:
```
https://your-app.up.railway.app
```

### 2. Health Check

터미널에서 실행:
```bash
curl https://your-app.up.railway.app/health
```

예상 응답:
```json
{
  "status": "ok",
  "timestamp": "2025-12-29T14:00:00.000Z"
}
```

### 3. 로그인 테스트

```bash
curl -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@test.com","password":"test1234"}'
```

성공 시 JWT 토큰과 사용자 정보가 반환됩니다!

---

## 🔑 데이터베이스 시드 (최초 1회)

테스트 계정을 생성하려면:

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 프로젝트 연결
railway link

# 시드 실행
railway run npm run prisma:seed
```

**생성되는 테스트 계정:**
- `student1@test.com` / `test1234`
- `student2@test.com` / `test1234`
- `reviewer1@test.com` / `test1234`
- `instructor1@test.com` / `test1234`

---

## 📊 API 엔드포인트 목록

배포 완료 후 사용 가능:

### 인증
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보

### 제출물 (학생)
- `POST /api/submissions` - 제출물 생성/업데이트
- `GET /api/submissions` - 제출물 목록
- `GET /api/submissions/:id` - 제출물 상세

### 평가 (평가자)
- `POST /api/evaluations` - 평가 생성/업데이트
- `GET /api/evaluations/:submissionId` - 평가 조회

---

## 🚨 문제 해결

### DATABASE_URL 연결 안 됨
→ PostgreSQL 서비스와 연결되었는지 확인

### CORS 에러
→ `CORS_ORIGIN`에 프론트엔드 도메인 포함 확인

### 빌드 실패
→ Railway Logs 탭에서 에러 확인

---

## 📚 상세 문서

더 자세한 내용은 다음 문서 참고:
- `docs/student/railway-deployment.md` - 전체 배포 가이드
- `docs/student/railway-env-variables.md` - 환경변수 상세 설명
