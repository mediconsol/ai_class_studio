import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session06PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';

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
  practiceGuide: session06PracticeGuide,
  promptGuide,
  quizzes,
};
