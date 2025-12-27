import { Session, PracticeGuide } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';

// 실무 활용 가이드 & 확장 힌트
const practiceGuide: PracticeGuide = {
  usageGuide: {
    title: '실무 활용 가이드',
    dos: [
      '이미 작성한 간호 메모를 그대로 입력',
      'AI 결과를 검토 후 간호사가 최종 확인·수정',
      'EMR에 복사·붙여넣기하여 사용',
    ],
    donts: [
      '간호사의 전문적 판단',
      '간호진단, 중재 계획, 평가',
    ],
    keyMessage: "AI는 '기록을 대신 쓰는 존재'가 아니라 '정리와 문장화를 도와주는 보조 도구'입니다.",
  },
  extendedHints: {
    title: '확장 활용 힌트',
    hints: [
      'SOAP 중 S(주관적 자료) 또는 O(객관적 자료) 정리용으로 활용',
      '인수인계용 요약 자료의 기초 데이터로 재사용 가능',
      '신규 간호사 기록 교육용 예시로 활용 가능',
    ],
  },
};

export const session06: Session = {
  // 메타 정보
  id: 6,
  type: 'practice',
  title: '간호기록 보조에 AI 활용',
  subtitle: 'AI가 간호 판단을 대신하지 않고, 기록 문장화만 보조함을 체험',
  duration: 60,
  objective: 'AI가 간호 판단을 대신하지 않고, 기록 문장화만 보조함을 체험',
  keyMessage: '판단은 간호사가, 문장화는 AI가',
  tools: ['ChatGPT', 'Claude'],

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 실습 차시 전용
  dummyData,
  exercises,
  practiceGuide,
  quizzes,
};
