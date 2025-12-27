# AI Class Studio

의료기관 종사자를 위한 AI 실무 교육 플랫폼

## 프로젝트 정보

- **개발**: MediConSol
- **웹사이트**: [mediconsol.co.kr](https://mediconsol.co.kr)

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- PWA (Progressive Web App)

## 개발 환경 설정

Node.js와 npm이 필요합니다.

```sh
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
├── data/          # 세션 데이터 (20차시)
│   └── sessions/  # 각 차시별 콘텐츠
├── hooks/         # React 커스텀 훅
├── lib/           # 유틸리티
└── pages/         # 페이지 컴포넌트
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
