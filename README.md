# AI Class Studio

> 의료기관 종사자를 위한 AI 실무 교육 플랫폼
> **강사용 + 학생용 통합 Monorepo**

## 📋 프로젝트 정보

- **개발**: MediConSol (이노솔루션)
- **웹사이트**: [mediconsol.co.kr](https://mediconsol.co.kr)
- **배포 URL**:
  - 프로덕션: [inno.mediconsol.com](https://inno.mediconsol.com)
  - Vercel: [aiclassstudio.vercel.app](https://aiclassstudio.vercel.app)

## 🎯 시스템 구성

이 레포지토리는 **Monorepo**로 구성되어 있습니다:

1. **프론트엔드** (`/src`) - Vercel 배포
   - 강사용 정적 웹앱 (기존)
   - 학생/평가자 인터페이스 (신규)

2. **백엔드** (`/backend`) - Railway 배포
   - Express.js API 서버
   - PostgreSQL 데이터베이스
   - JWT 인증

## 🏗️ 기술 스택

### 프론트엔드
- React 18 + TypeScript
- Vite (번들러)
- Tailwind CSS + shadcn/ui
- React Router v6
- Axios (HTTP 클라이언트)
- PWA (Progressive Web App)

### 백엔드 (신규)
- Node.js 20 + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT + bcrypt

## 🚀 개발 환경 설정

### 프론트엔드

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일 편집 (AI API 키, Railway URL 추가)

# 개발 서버 실행 (http://localhost:7900)
npm run dev

# 프로덕션 빌드
npm run build
```

### 백엔드

자세한 내용은 [backend/README.md](backend/README.md) 참조

```bash
cd backend

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일 편집 (DATABASE_URL, JWT_SECRET)

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 테스트 계정 생성
npx prisma db seed

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

## 📁 프로젝트 구조

```
ai-class-studio-main/
│
├── backend/              # 🆕 백엔드 API (Railway)
│   ├── src/              # Express 앱
│   ├── prisma/           # DB 스키마 & 마이그레이션
│   └── package.json
│
├── src/                  # ✅ 프론트엔드 (Vercel)
│   ├── components/
│   │   ├── ui/           # shadcn/ui (40+ 컴포넌트)
│   │   ├── student/      # 🆕 학생 전용 컴포넌트
│   │   └── reviewer/     # 🆕 평가자 전용 컴포넌트
│   ├── pages/
│   │   ├── student/      # 🆕 학생 페이지
│   │   ├── reviewer/     # 🆕 평가자 페이지
│   │   ├── Index.tsx     # 강사용 홈
│   │   └── Session.tsx   # 강사용 세션
│   ├── data/
│   │   └── sessions/     # 20차시 데이터
│   ├── hooks/
│   ├── lib/
│   └── services/
│
├── public/               # 정적 리소스
├── docs/                 # 문서
│   └── student/          # 🆕 학생/평가자 시스템 기획
│
├── package.json          # 프론트엔드 패키지
├── vercel.json           # 🆕 Vercel 배포 설정
└── .gitignore
```

## 교육 과정 구성

- **Part 1 (1-5차시)**: 이론 - AI 이해와 기초
- **Part 2 (6-12차시)**: 실습 - 간호 실무 AI 활용
- **Part 3 (13-15차시)**: 실습 - 행정·트랙 확장
- **Part 4 (16-20차시)**: 과제 - 병원 적용 프로젝트

## PWA (Progressive Web App)

이 애플리케이션은 PWA로 구성되어 앱처럼 설치 및 사용할 수 있습니다.

### 주요 기능

- 📱 **홈 화면에 추가**: 앱처럼 설치 가능
- 🖥️ **전체화면 모드**: URL 바 숨김으로 화면 최대 활용
- 📴 **오프라인 지원**: 캐싱을 통한 오프라인 사용
- 🔄 **자동 업데이트**: 새 버전 자동 감지 및 업데이트

### 설치 방법

**iOS (iPhone/iPad)**
1. Safari로 사이트 접속
2. 공유 버튼 → "홈 화면에 추가"

**Android**
1. Chrome으로 사이트 접속
2. 메뉴 → "홈 화면에 추가"

**데스크톱**
1. Chrome/Edge로 사이트 접속
2. 주소창 우측 설치 아이콘 클릭

자세한 내용은 [PWA 설정 가이드](docs/pwa-setup.md)를 참조하세요.

---

Copyright (c) MediConSol. All rights reserved.
