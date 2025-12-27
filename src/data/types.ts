// ============================================
// 차시 유형 (Session Types)
// ============================================

export type SessionType = 'theory' | 'practice' | 'assignment';

export type SessionPhase = 'intro' | 'understand' | 'practice' | 'summary';
// intro: 도입 (5분)
// understand: 이해/개념 (10-20분)
// practice: 실습/시연 (20-30분)
// summary: 정리 (5-10분)

// ============================================
// 슬라이드 (Slides)
// ============================================

export interface Slide {
  id: number;
  phase: SessionPhase;
  title: string;

  // 화면에 표시되는 문구
  screenContent: string | string[];  // 문자열 또는 bullet points

  // 강사 멘트 (프레젠터용)
  script?: string;

  // 슬라이드에 표시할 코드/데이터 블록
  codeBlock?: {
    language?: string;
    content: string;
  };

  // 이미지 URL (선택)
  imageUrl?: string;
}

// ============================================
// 프롬프트 템플릿 (Prompt Templates)
// ============================================

export type PromptCategory = 'nursing' | 'admin' | 'general' | 'demo' | 'safety' | 'infection';

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: PromptCategory;

  // 프롬프트에 삽입할 예제데이터 ID (선택)
  suggestedDummyDataIds?: string[];
}

// ============================================
// 예제데이터 (Dummy Data) - 실습용
// ============================================

export type DummyDataCategory = 'nursing' | 'admin' | 'patient' | 'document' | 'safety' | 'infection';

export interface DummyData {
  id: string;
  title: string;
  description: string;
  category: DummyDataCategory;

  // 실제 데이터 내용
  content: string;

  // 데이터 형식 힌트
  format?: 'text' | 'json' | 'table' | 'list';

  // "일부러 어설픈 데이터" 표시 (교육용)
  isRaw?: boolean;
}

// ============================================
// 실습 단계 (Exercises) - 실습 차시용
// ============================================

export interface Exercise {
  step: number;
  title: string;
  instruction: string;

  // 이 단계에서 사용할 예제데이터
  dummyDataId?: string;

  // 이 단계에서 사용할 프롬프트
  promptId?: string;

  // 예상 결과 또는 힌트
  expectedOutput?: string;
  hint?: string;
}

// ============================================
// 과제 워크시트 (Worksheets) - 과제 차시용
// ============================================

export type WorksheetFieldType = 'text' | 'textarea' | 'select' | 'checklist';

export interface WorksheetField {
  id: string;
  label: string;
  type: WorksheetFieldType;
  placeholder?: string;
  options?: string[];  // select, checklist용
  required?: boolean;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  fields: WorksheetField[];
}

// ============================================
// 실무 가이드 (Practice Guide) - 실습 차시용
// ============================================

export interface PracticeGuide {
  // 실무 활용 가이드
  usageGuide: {
    title: string;
    dos: string[];      // 이렇게 활용하세요
    donts: string[];    // 이것은 대체하지 않습니다
    keyMessage?: string;
  };

  // 확장 활용 힌트
  extendedHints: {
    title: string;
    hints: string[];
  };
}

// ============================================
// 퀴즈 (Quiz) - 1~5차시용
// ============================================

export type QuizType = 'ox' | 'multiple';

export interface QuizOption {
  id: string;
  text: string;
}

export interface Quiz {
  id: string;
  type: QuizType;
  question: string;
  // OX 퀴즈: correctAnswer는 'O' 또는 'X'
  // 4지선다: correctAnswer는 option id (예: 'a', 'b', 'c', 'd')
  correctAnswer: string;
  // 4지선다용 선택지
  options?: QuizOption[];
  // 해설
  explanation: string;
}

// ============================================
// 자료 (Resources)
// ============================================

export type ResourceType = 'pdf' | 'template' | 'link' | 'video' | 'document';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  tags: string[];
}

// ============================================
// 세션 (Session) - 차시
// ============================================

export interface SessionMeta {
  id: number;
  type: SessionType;
  title: string;
  subtitle?: string;

  // 권장 시간 (분)
  duration: number;

  // 학습 목표
  objective: string;

  // 핵심 메시지
  keyMessage: string;

  // 실습 도구 (실습 차시용)
  tools?: string[];

  // 선수 학습 (차시 번호)
  prerequisites?: number[];

  // 산출물 설명 (과제 차시용)
  deliverables?: string;
}

export interface Session extends SessionMeta {
  slides: Slide[];
  prompts: PromptTemplate[];
  resources: Resource[];

  // 이론 차시 전용 (1~5차시)
  quizzes?: Quiz[];

  // 실습 차시 전용
  dummyData?: DummyData[];
  exercises?: Exercise[];
  practiceGuide?: PracticeGuide;

  // 과제 차시 전용
  worksheets?: Worksheet[];
}

// ============================================
// 과정 (Course) - 전체 교육 과정
// ============================================

export interface CourseMeta {
  title: string;
  description: string;
  totalSessions: number;

  // 파트 구분
  parts: CoursePart[];
}

export interface CoursePart {
  id: number;
  title: string;
  sessionRange: [number, number];  // [시작, 끝]
  type: SessionType;
}

export interface Course extends CourseMeta {
  sessions: Session[];
}

// ============================================
// 헬퍼 타입
// ============================================

// 세션 목록용 (상세 데이터 없이)
export type SessionSummary = SessionMeta;

// 슬라이드 네비게이션용
export interface SlideNavigation {
  currentIndex: number;
  totalSlides: number;
  currentPhase: SessionPhase;
  phases: {
    phase: SessionPhase;
    startIndex: number;
    endIndex: number;
  }[];
}
