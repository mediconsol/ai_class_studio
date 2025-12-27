# 20차시 교육 플랫폼 구현 계획

## 개요

의료기관 AI 실무 교육을 위한 20차시 교육 플랫폼을 구현합니다.
- **이론 차시** (1-5): 슬라이드 + 강사 멘트
- **실습 차시** (6-15): 슬라이드 + 예제데이터 + AI 실습
- **과제 차시** (16-20): 슬라이드 + 과제 워크시트

---

## Phase 1: 데이터 구조 리팩토링 ✅ 완료

### 1.1 타입 정의 (`src/data/types.ts`) ✅

- [x] SessionType 정의 (`theory` | `practice` | `assignment`)
- [x] Slide 타입 확장 (phase, screenContent, script)
- [x] DummyData 타입 정의
- [x] Exercise 타입 정의 (실습 단계)
- [x] Worksheet 타입 정의 (과제용)
- [x] Session 타입 통합 (타입별 선택적 필드)

### 1.2 폴더 구조 생성 ✅

```
src/data/
├── index.ts           ✅
├── types.ts           ✅
├── course.ts          ✅
├── sessions/
│   ├── index.ts       ✅
│   ├── session-01/    ✅
│   ├── session-02/    ✅
│   ├── ...
│   └── session-20/    ✅
└── shared/
    ├── commonPrompts.ts    ✅
    └── commonDummyData.ts  ✅
```

- [x] `src/data/types.ts` 생성
- [x] `src/data/course.ts` 생성 (과정 메타데이터)
- [x] `src/data/sessions/` 폴더 구조 생성
- [x] `src/data/shared/` 폴더 생성
- [x] `src/data/index.ts` 통합 export

### 1.3 샘플 세션 데이터 작성 ✅

- [x] 1차시 (이론) 데이터 작성 - `강의구현_샘플.md` 기반
- [x] 6차시 (실습) 데이터 작성
- [x] 16차시 (과제) 데이터 작성

---

## Phase 2: 컴포넌트 업데이트 ✅ 완료

### 2.1 SlideViewer 확장 ✅

- [x] 강사 멘트 표시/숨김 토글 추가
- [x] Phase 표시 (도입/이해/실습/정리)
- [x] 화면 문구와 강사 멘트 분리 레이아웃

### 2.2 AIPanel 확장 ✅

- [x] 예제데이터 선택/삽입 기능
- [x] 프롬프트 템플릿에 예제데이터 자동 삽입
- [x] 실습 단계(Exercise) 진행 표시
- [x] 3열 레이아웃 (실습 모드)

### 2.3 새 컴포넌트 생성 ✅

- [x] `DummyDataPanel.tsx` - 예제데이터 선택/미리보기
- [x] `ExerciseGuide.tsx` - 실습 단계 가이드
- [x] `WorksheetPanel.tsx` - 과제 워크시트 (16-20차시용)
- [x] `MediConsolLogo.tsx` - 브랜드 로고 컴포넌트

### 2.4 Session 페이지 분기 ✅

- [x] 차시 유형별 레이아웃 분기
  - TheoryLayout (이론)
  - PracticeLayout (실습)
  - AssignmentLayout (과제)
- [x] 탭 구성 변경
  - 이론: 슬라이드 / 자료
  - 실습: 슬라이드 / AI 실습 / 자료
  - 과제: 슬라이드 / 과제 / 자료

---

## Phase 3: 콘텐츠 입력 ✅ 완료

### 3.1 이론 차시 (1-5) ✅

- [x] 1차시: AI 시대의 의료와 우리의 역할
- [x] 2차시: 프롬프트 엔지니어링 기초
- [x] 3차시: 의료 문서와 AI 활용 전략
- [x] 4차시: 개인정보 보호와 AI 윤리
- [x] 5차시: 병원 도입 관점에서 본 AI

### 3.2 실습 차시 (6-15) ✅

- [x] 6차시: 프롬프트 작성 기초 실습
- [x] 7차시: 인수인계·교대근무에 AI 활용
- [x] 8차시: 환자상태 요약·관찰 기록에 AI 활용
- [x] 9차시: 환자안전 보고서에 AI 활용
- [x] 10차시: 감염관리 문서에 AI 활용
- [x] 11차시: SOP·가이드라인에 AI 활용
- [x] 12차시: 신규인력 교육에 AI 활용
- [x] 13차시: 민원·VOC 대응에 AI 활용
- [x] 14차시: 심사청구·적정성평가에 AI 활용
- [x] 15차시: AI 활용 시나리오 설계

### 3.3 과제 차시 (16-20) ✅

- [x] 16차시: 과제 정의서 작성 (23슬라이드, 4프롬프트, 2워크시트, 7리소스)
- [x] 17차시: AI 활용 업무 개선안 설계 (26슬라이드, 4프롬프트, 2워크시트, 5리소스)
- [x] 18차시: 결과물 완성 (26슬라이드, 5프롬프트, 2워크시트, 6리소스)
- [x] 19차시: 적용 & 확산 계획 (27슬라이드, 4프롬프트, 2워크시트, 6리소스)
- [x] 20차시: 결과 공유 & 마무리 (23슬라이드, 3프롬프트, 2워크시트, 7리소스)

#### 과제 차시 파일 분리 구조
각 과제 차시(16-20)는 다음과 같은 파일 구조로 분리됨:
```
session-XX/
├── index.ts      # Session export (메타정보 + 콘텐츠 통합)
├── slides.ts     # Slide[] - 전체 슬라이드 (23-27개)
├── prompts.ts    # PromptTemplate[] - AI 프롬프트 (3-5개)
├── worksheets.ts # Worksheet[] - 과제 양식 (2개)
└── resources.ts  # Resource[] - 참고자료 (5-7개)
```

---

## Phase 4: 브랜딩 & 설정 ✅ 완료

### 4.1 MediConSol 브랜딩 ✅

- [x] 로고 컴포넌트 생성 (`MediConsolLogo.tsx`)
- [x] 파비콘 생성 (SVG, ICO) - 브랜드 컬러 적용
- [x] index.html 메타데이터 업데이트
- [x] README.md 재작성
- [x] package.json 업데이트 (이름, 버전, 작성자)
- [x] Lovable 관련 설정 제거
- [x] Footer에 mediconsol.co.kr 링크 추가

### 4.2 UI 개선 ✅

- [x] Part 분류 수정 (Index.tsx - course.ts와 일치)
- [x] 헤더 로고 교체
- [x] AIPanel 로고 교체

---

## Phase 5: 고도화 ✅ 부분 완료

### 5.1 프레젠터 모드 ✅

- [x] 전체화면 슬라이드 (F키 또는 버튼)
- [x] 강사용 스크립트 별도 표시 (네비게이션 아래)
- [x] 키보드 단축키 (←/→ 이동, Space 다음, F 전체화면, S 멘트, ESC 종료)
- [x] 타이머 표시 (헤더에 배치, 차시별 진행시간 추적)
- [x] 전체화면 시 단축키 힌트 표시

### 5.2 UX 개선 ✅ 부분 완료

- [x] 헤더 간소화 (차시+제목 한줄, 아이콘 축소)
- [x] 콘텐츠 너비 통일 (max-w-[1400px])
- [x] 왼쪽 접이식 사이드바 (세션 정보, 학습목표, 슬라이드 구성)
- [x] 슬라이드 모달 (사이드바에서 클릭 시 모달로 미리보기)
- [x] 실무 가이드 모달 (실습탭 우측 하단 버튼, max-w-3xl 너비)
- [x] 공통 실무 가이드 (nursingPracticeGuide, adminPracticeGuide)
- [x] AI 시연 탭 (이론 차시 1-5에 추가, demo 카테고리 프롬프트)
- [x] 실습 레이아웃 개선 (3단 flex: 280px 고정 + 1:1 균등 분배)
- [x] 슬라이드 TOC 패널 (왼쪽 목차, 단계별 색상, 전체화면시 숨김)
- [x] 예제데이터 선택 상태 강조 (체크 아이콘, 강조 테두리)
- [x] 프롬프트 템플릿 선택 상태 강조 (primary 색상)
- [x] 공통 Footer 컴포넌트 (저작권 정보)
- [x] 실습 단계 모달 (ExerciseGuidePanel - 왼쪽 패널에서 분리, 플로팅 버튼)
- [x] 예제데이터 레이아웃 개선 (카테고리를 제목 위로 배치, 280px 너비 최적화)
- [ ] 실습 진행률 표시
- [ ] 다크모드 개선

### 5.4 퀴즈 기능 (1-15차시) ✅

- [x] Quiz 타입 정의 (QuizType, QuizOption, Quiz)
- [x] QuizPanel 컴포넌트 (OX + 4지선다 혼합)
- [x] 문제별 정답 확인 및 해설 표시
- [x] 최종 점수 및 문제별 결과 요약
- [x] 각 차시별 10문항 작성 (맥락에 맞는 퀴즈)
- [x] TabNavigation에 퀴즈 탭 추가 (1-15차시)

#### 차시별 퀴즈 주제
| 차시 | 퀴즈 주제 |
|------|-----------|
| 1차시 | AI의 역할과 한계, 판단 vs 정리 |
| 2차시 | 프롬프트 구조, 역할/형식/주의사항 |
| 3차시 | 문서 자동화 패턴, 변환/요약/확장 |
| 4차시 | 윤리와 보안, 개인정보 보호, 책임 |
| 5차시 | 조직 관점 도입, 단계적 접근 |
| 6차시 | 간호기록 보조, SOAP 정리, 판단 vs 문장화 |
| 7차시 | 인수인계 요약, 여러 환자 정리 |
| 8차시 | 환자상태 요약, 관찰 기록 정리 |
| 9차시 | 환자안전 보고서, 사건 구조화 |
| 10차시 | 감염관리 지침, 교육자료 변환 |
| 11차시 | SOP 체크리스트화, 절차 변환 |
| 12차시 | 신규 교육자료, 퀴즈 생성 |
| 13차시 | 민원 응대 문구, 톤 변환 |
| 14차시 | 심사 소명서, 근거 구조화 |
| 15차시 | 시나리오 설계, 업무 적용 |

### 5.3 AI 연동 ✅

- [x] 실제 AI API 연동 (Gemini, GPT, Claude)
- [x] 환경변수 설정 (.env)
- [x] 모델 선택기 UI (9개 모델 지원)
- [x] 마크다운 렌더링 응답 (MarkdownRenderer 컴포넌트)
- [x] remark-gfm 플러그인 (테이블, 취소선, 체크리스트 지원)
- [x] 공통 시스템 프롬프트 (마크다운 스타일 지침 포함)
- [x] 응답 영역 스크롤 개선 (min-h-0, overflow-auto)
- [x] 응답 모달 (크게 보기 - 90vw x 85vh, 복사 버튼 포함)
- [x] AI 모델 최신 버전 업데이트 (Gemini 2.0, GPT-4 Turbo, o1 시리즈, Claude Opus 4)
- [x] 기본 모델을 Claude 3.5 Haiku로 변경
- [ ] API 키 설정 화면 (런타임 변경)
- [ ] 응답 히스토리 저장

#### 지원 AI 모델
| 제공자 | 모델명 | 모델 ID | 등급 |
|--------|--------|---------|------|
| Google | Gemini 2.0 Flash | gemini-2.0-flash-exp | 무료 (기본) |
| OpenAI | GPT-4o mini | gpt-4o-mini | 기본 |
| OpenAI | GPT-4o | gpt-4o | 프리미엄 |
| OpenAI | GPT-4 Turbo | gpt-4-turbo | 프리미엄 |
| OpenAI | o1-mini | o1-mini | 기본 (추론) |
| OpenAI | o1 | o1 | 프리미엄 (추론) |
| Anthropic | Claude 3.5 Haiku ⭐ | claude-3-5-haiku-latest | 기본 (기본 모델) |
| Anthropic | Claude 3.5 Sonnet | claude-3-5-sonnet-latest | 프리미엄 |
| Anthropic | Claude Opus 4 | claude-opus-4-latest | 프리미엄 |

#### 마크다운 렌더링 스타일
| 요소 | 스타일 |
|------|--------|
| h1, h2 | 하단 보더 + 여백 |
| h3 | 왼쪽 컬러바 + 볼드 |
| 테이블 | 라운드 보더 + 호버 효과 |
| 인용 | 왼쪽 보더 + 배경색 |
| 코드블록 | 언어 표시 헤더 + 배경 |
| 인라인코드 | 배경 + 프라이머리 색상 |

---

## Phase 6: 홈페이지 개선 ✅ 완료

### 6.1 Index 페이지 탭 시스템 ✅

- [x] 과정정보 탭 (기본 탭)
  - 교육소개 (AI 융합 훈련, 과정 핵심 포인트, 차시별 학습 구조)
  - 학습목표 (5개 주요 목표)
  - AI 윤리 및 보안 반영 내용 (3가지 원칙)
  - 학습대상 (간호사, 행정직원, 의료진, 관리자)
  - 강사소개 (채원덕 SME - 프로필 사진, 연락처, 전문분야, 경력)
- [x] 학습목차 (학습자용) 탭
  - Part별 구분된 테이블 형식
  - 차시, 학습주제, 구분(이론/실습/과제) 표시
  - 클릭 불가 (학습자용 정보 제공 목적)
- [x] 평가 및 수료기준 탭
  - 평가기준 (출결/학습/참여도/종합 평가)
  - 평가 방식 예시 (시험/과제/실습)
  - 수료기준 (출석률 80% + 성적 60점)
- [x] 검수용 탭 (관리자 전용)
  - 오렌지 색상 테마 (탭 트리거, 버튼, 배지)
  - 🔧 이모지로 관리자 도구 표시
  - 각 차시로 이동 가능한 링크 버튼
  - 경고 배너 (임시 관리자 전용 탭 안내)

### 6.2 강사 프로필 정보 ✅

- [x] 프로필 사진 (원형, 테두리)
- [x] 기본 정보 (이름, 소속, 역할, 연락처)
- [x] 전문분야 (4개 영역)
- [x] 주요 경력 (3개 섹션, 색상 구분)
  - 메디콘솔 대표 (2023~현재) - 블루
  - 병원경영 컨설팅 (2016~2023) - 그린
  - IT 솔루션 및 전략기획 (1999~2015) - 앰버

---

## 구현 현황 요약

| Phase | 항목 | 상태 |
|-------|------|------|
| Phase 1 | 데이터 구조 리팩토링 | ✅ 완료 |
| Phase 2 | 컴포넌트 업데이트 | ✅ 완료 |
| Phase 3 | 콘텐츠 입력 (20차시) | ✅ 완료 |
| Phase 4 | 브랜딩 & 설정 | ✅ 완료 |
| Phase 5.1 | 프레젠터 모드 | ✅ 완료 |
| Phase 5.2 | UX 개선 | ✅ 부분 완료 |
| Phase 5.3 | AI 연동 | ✅ 완료 |
| Phase 5.4 | 퀴즈 기능 (1-15차시) | ✅ 완료 |
| Phase 6 | 홈페이지 개선 | ✅ 완료 |

---

## 생성된 파일 목록

### 데이터 구조
```
src/data/
├── index.ts
├── types.ts
├── course.ts
├── sessions/
│   ├── index.ts
│   ├── session-01/ ~ session-05/ (이론 - quizzes 포함)
│   ├── session-06/ ~ session-15/ (실습 - dummyData, exercises, quizzes 포함)
│   │   └── 각 차시: index.ts, slides.ts, prompts.ts, dummyData.ts, exercises.ts, quizzes.ts, resources.ts
│   └── session-16/ ~ session-20/ (과제 - 파일 분리 완료)
│       └── 각 차시: index.ts, slides.ts, prompts.ts, worksheets.ts, resources.ts
└── shared/
    ├── commonPrompts.ts
    └── commonDummyData.ts
```

### 컴포넌트
```
src/components/
├── MediConsolLogo.tsx        ← 신규 (브랜드 로고)
├── DummyDataPanel.tsx        ← 신규 (예제데이터 선택, 카테고리 위치 최적화)
├── ExerciseGuidePanel.tsx    ← 신규 (실습 단계 모달, 플로팅 버튼)
├── WorksheetPanel.tsx        ← 신규 (과제 워크시트)
├── SessionSidebar.tsx        ← 신규 (왼쪽 접이식 사이드바)
├── SlideModal.tsx            ← 신규 (슬라이드 모달 뷰어)
├── PracticeGuidePanel.tsx    ← 신규 (실무 가이드 모달)
├── MarkdownRenderer.tsx      ← 신규 (마크다운 렌더링 - remark-gfm)
├── QuizPanel.tsx             ← 신규 (퀴즈 패널 - OX/4지선다)
├── Footer.tsx                ← 신규 (공통 푸터)
├── SlideViewer.tsx           ← 수정 (프레젠터 모드, 단축키, TOC 패널)
├── AIPanel.tsx               ← 수정 (AI 연동, 모델 선택기, 3단 레이아웃, 기본 모델 변경)
├── TabNavigation.tsx         ← 수정 (퀴즈 탭 추가, sessionId 지원)
├── LectureHeader.tsx         ← 수정 (타이머 추가)
└── ...
```

### 서비스
```
src/services/
└── ai.ts                   ← 신규 (AI API 연동, 최신 모델 업데이트)
    ├── AI_MODELS           - 9개 모델 정의 (Gemini 2.0, GPT-4 Turbo, o1, Claude Opus 4)
    ├── SYSTEM_PROMPT       - 공통 시스템 프롬프트 (마크다운 지침)
    ├── callGemini()        - Google Gemini API
    ├── callOpenAI()        - OpenAI API
    ├── callAnthropic()     - Anthropic Claude API
    └── generateAIResponse()- 통합 호출 함수
```

### 공유 데이터
```
src/data/shared/
├── commonPrompts.ts
├── commonDummyData.ts
└── commonPracticeGuides.ts  ← 신규 (실무 가이드 공통 정의)
```

### 설정 파일
```
├── index.html           ← 수정 (MediConSol 메타데이터)
├── package.json         ← 수정 (ai-class-studio)
├── vite.config.ts       ← 수정 (lovable-tagger 제거)
├── README.md            ← 재작성
├── .env                 ← 신규 (AI API 키 - gitignore 됨)
├── .env.example         ← 신규 (API 키 템플릿)
└── public/
    ├── favicon.svg      ← 신규 (브랜드 컬러)
    └── favicon.ico      ← 수정 (브랜드 컬러)
```

---

## 참고 문서

- `/docs/prd.md` - 제품 요구사항
- `/docs/강의구현_샘플.md` - 1차시, 6차시, 16차시 상세 콘텐츠
- `/docs/sessions/session-XX.md` - 각 차시별 상세 콘텐츠 (슬라이드, 예제데이터, 프롬프트)

---

*마지막 업데이트: 2025-12-28 (UX 개선: 실습단계 모달화, 예제데이터 레이아웃 개선, AI 모델 최신화)*
*개발: MediConSol (mediconsol.co.kr)*
