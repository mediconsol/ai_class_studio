# Railway 백엔드 환경변수 설정 가이드

## 🎯 Railway Raw Editor용 환경변수

Railway 백엔드 서비스 → Variables → Raw Editor에 아래 내용을 **복사 → 붙여넣기**하세요.

---

## 📋 복사할 내용 (Raw Editor)

```plaintext
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=CHANGE_THIS_TO_RANDOM_SECRET_KEY_32_CHARS_OR_MORE
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://inno.mediconsol.com,https://aiclassstudio.vercel.app
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_KEY_HERE
OPENAI_API_KEY=YOUR_OPENAI_KEY_HERE
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
AI_REQUEST_TIMEOUT=30000
AI_MAX_RETRIES=3
LOG_LEVEL=info
```

---

## 🔧 설정 전 준비사항

### 1. JWT_SECRET 생성

터미널에서 실행:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

출력 예시: `mK8vL3nP9qR2sT5uW7xY0zA1bC4dE6fG8h9jK0lM2n==`

이 값을 `JWT_SECRET=` 뒤에 붙여넣으세요.

### 2. AI API 키 확인

현재 프론트엔드 `.env` 파일의 API 키들을 복사:

```bash
# 프론트엔드 .env 파일에서 확인
cat .env
```

- `VITE_ANTHROPIC_API_KEY` → `ANTHROPIC_API_KEY`
- `VITE_OPENAI_API_KEY` → `OPENAI_API_KEY`
- `VITE_GOOGLE_API_KEY` → `GOOGLE_API_KEY`

**중요:** `VITE_` 접두사는 제거하고 키 값만 사용하세요.

---

## ✅ 실제 값으로 채운 예시

```plaintext
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=mK8vL3nP9qR2sT5uW7xY0zA1bC4dE6fG8h9jK0lM2n==
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://inno.mediconsol.com,https://aiclassstudio.vercel.app
ANTHROPIC_API_KEY=sk-ant-api03-abc123def456ghi789...
OPENAI_API_KEY=sk-proj-abc123def456ghi789...
GOOGLE_API_KEY=AIzaSyAbc123Def456Ghi789...
AI_REQUEST_TIMEOUT=30000
AI_MAX_RETRIES=3
LOG_LEVEL=info
```

---

## 📝 각 환경변수 설명

| 변수명 | 설명 | 필수 여부 |
|--------|------|-----------|
| `DATABASE_URL` | PostgreSQL 연결 URL (서비스 참조) | ✅ 필수 |
| `JWT_SECRET` | JWT 토큰 서명용 시크릿 키 | ✅ 필수 |
| `NODE_ENV` | Node.js 실행 환경 | ✅ 필수 |
| `PORT` | 서버 포트 (Railway 자동 설정) | ⚪ 선택 |
| `CORS_ORIGIN` | CORS 허용 도메인 목록 | ✅ 필수 |
| `ANTHROPIC_API_KEY` | Claude API 키 | ✅ 필수 |
| `OPENAI_API_KEY` | OpenAI GPT API 키 | ✅ 필수 |
| `GOOGLE_API_KEY` | Google Gemini API 키 | ✅ 필수 |
| `AI_REQUEST_TIMEOUT` | AI 요청 타임아웃 (ms) | ⚪ 선택 |
| `AI_MAX_RETRIES` | AI 요청 최대 재시도 횟수 | ⚪ 선택 |
| `LOG_LEVEL` | 로그 레벨 (info 권장) | ⚪ 선택 |

---

## 🛠️ Railway 설정 단계별 가이드

### Step 1: Railway 백엔드 서비스 생성

1. Railway 프로젝트 접속
2. "New" → "GitHub Repo" 클릭
3. `mediconsol/ai_class_studio` 선택
4. 배포 완료 대기

### Step 2: Root Directory 설정

1. 백엔드 서비스 클릭
2. Settings → "Root Directory" 찾기
3. `/backend` 입력
4. 저장

### Step 3: 환경변수 설정

1. Variables 탭 클릭
2. **"Raw Editor"** 버튼 클릭
3. 위에서 준비한 환경변수 **전체 복사**
4. Raw Editor에 **붙여넣기**
5. "Update Variables" 클릭

### Step 4: PostgreSQL 서비스 연결

1. 백엔드 서비스 Settings
2. "Connect" → PostgreSQL 서비스 선택
3. `${{Postgres.DATABASE_URL}}` 자동 참조 확인

### Step 5: 재배포

환경변수 변경 후 자동으로 재배포됩니다.
Deployments 탭에서 진행 상황 확인하세요.

---

## 🔍 배포 후 확인

### 1. Health Check
```bash
curl https://your-backend.railway.app/health
```

예상 응답:
```json
{
  "status": "ok",
  "timestamp": "2025-12-29T14:00:00.000Z"
}
```

### 2. 로그인 테스트
```bash
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@test.com","password":"test1234"}'
```

예상 응답:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "student1@test.com",
    "role": "student",
    "name": "테스트학생1"
  }
}
```

### 3. 환경변수 확인 (Railway 대시보드)

Variables 탭에서 다음 변수들이 설정되었는지 확인:
- ✅ DATABASE_URL (값: `${{Postgres.DATABASE_URL}}`)
- ✅ JWT_SECRET (값: 랜덤 문자열)
- ✅ ANTHROPIC_API_KEY (값: `sk-ant-api03-...`)
- ✅ OPENAI_API_KEY (값: `sk-...`)
- ✅ GOOGLE_API_KEY (값: `AIza...`)

---

## ⚠️ 보안 주의사항

### 1. API 키 노출 방지
- ✅ **백엔드**에만 API 키 설정 (안전)
- ❌ **프론트엔드** 환경변수에 `VITE_` 접두사로 API 키 노출 (위험)

### 2. 프론트엔드 리팩토링 필요
현재 프론트엔드가 직접 AI API를 호출하고 있다면, 향후 백엔드를 통해 호출하도록 변경해야 합니다:

**현재 (보안 취약):**
```typescript
// 프론트엔드에서 직접 호출 (API 키 노출)
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY // ❌ 노출됨
  }
})
```

**개선 (보안 강화):**
```typescript
// 백엔드 API를 통해 호출 (API 키 안전)
const response = await fetch('https://your-backend.railway.app/api/ai/chat', {
  headers: {
    'Authorization': `Bearer ${token}` // ✅ JWT만 전송
  },
  body: JSON.stringify({ prompt: '...' })
})
```

이 리팩토링은 Week 2에서 진행 예정입니다.

### 3. JWT_SECRET 관리
- 절대 Git에 커밋하지 마세요
- 프로덕션과 개발 환경에서 다른 값 사용
- 최소 32자 이상의 강력한 랜덤 문자열 사용

---

## 🚨 트러블슈팅

### 문제 1: DATABASE_URL 연결 실패

**증상:** Prisma 연결 에러
```
PrismaClientInitializationError: Can't reach database server
```

**해결:**
1. PostgreSQL 서비스가 실행 중인지 확인
2. `DATABASE_URL=${{Postgres.DATABASE_URL}}` 정확히 입력되었는지 확인
3. Railway에서 두 서비스가 연결되었는지 확인

### 문제 2: JWT 인증 실패

**증상:** "Invalid token" 에러

**해결:**
1. `JWT_SECRET`이 설정되었는지 확인
2. 프론트엔드와 백엔드가 같은 시크릿 사용하는지 확인 (현재는 백엔드만 사용)

### 문제 3: CORS 에러

**증상:**
```
Access to fetch at 'https://...' from origin 'https://inno.mediconsol.com' has been blocked by CORS
```

**해결:**
1. `CORS_ORIGIN`에 프론트엔드 도메인이 포함되어 있는지 확인
2. 쉼표 사이에 공백이 없는지 확인
3. `https://` 프로토콜이 정확한지 확인

### 문제 4: AI API 호출 실패

**증상:** AI 응답 에러

**해결:**
1. API 키가 정확한지 확인
2. API 키에 충분한 크레딧이 있는지 확인
3. Railway Logs에서 에러 메시지 확인

---

## 📚 참고 자료

- [Railway 환경변수 가이드](https://docs.railway.app/develop/variables)
- [Prisma 프로덕션 배포](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-railway)
- [Express 보안 베스트 프랙티스](https://expressjs.com/en/advanced/best-practice-security.html)
