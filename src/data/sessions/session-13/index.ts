import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { adminPracticeGuide } from '../../shared/commonPracticeGuides';

export const session13: Session = {
  id: 13,
  type: 'practice',
  title: '민원 대응 업무에 AI 활용',
  subtitle: '민원 응대 표준 문구 생성 실습',
  duration: 60,
  objective: '민원 상황에 맞는 응대 문구를 효과적으로 생성',
  keyMessage: '결정은 사람이, 표현은 AI가',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: adminPracticeGuide,
  quizzes,
};
