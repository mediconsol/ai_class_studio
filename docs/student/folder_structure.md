# 프로젝트 폴더 구조

> **Monorepo**: 프론트엔드(Vercel) + 백엔드(Railway) 통합 레포

## 📁 전체 구조

```
ai-class-studio-main/                 # Git 루트
│
├── backend/                          # 🆕 백엔드 (Railway 배포, 포트: 3000)
│   ├── src/
│   │   ├── index.ts                  # Express 앱 엔트리
│   │   ├── routes/                   # API 라우트
│   │   ├── controllers/              # 비즈니스 로직
│   │   ├── middlewares/              # 인증/권한 체크
│   │   ├── services/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── package.json
│
├── src/                              # ✅ 프론트엔드 (Vercel 배포, 포트: 7900)
│   ├── components/
│   │   ├── ui/                       # ✅ 기존 shadcn/ui
│   │   ├── student/                  # 🆕 학생 전용
│   │   ├── reviewer/                 # 🆕 평가자 전용
│   │   └── ... (기존)
│   ├── pages/
│   │   ├── student/                  # 🆕
│   │   ├── reviewer/                 # 🆕
│   │   └── ... (기존)
│   └── hooks/
│       ├── useAuth.ts                # 🆕 JWT 인증
│       └── ...
│
└── package.json                      # 프론트엔드 패키지
```

## 🔌 포트 설정

### 로컬 개발
- **프론트엔드**: http://localhost:7900 (Vite)
- **백엔드**: http://localhost:3000 (Express)

### CORS 설정
```typescript
// backend/src/index.ts
const allowedOrigins = [
  'http://localhost:7900',              // 로컬
  'https://inno.mediconsol.com',        // 프로덕션
  'https://aiclassstudio.vercel.app',   // Vercel
]
```

## 📝 환경변수

### 프론트엔드 (.env)
```
VITE_API_URL=http://localhost:3000
```

### 백엔드 (backend/.env)
```
PORT=3000
CORS_ORIGIN=http://localhost:7900
DATABASE_URL=postgresql://...
JWT_SECRET=...
```
