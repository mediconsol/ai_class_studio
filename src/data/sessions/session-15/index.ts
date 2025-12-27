import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { adminPracticeGuide } from '../../shared/commonPracticeGuides';

export const session15: Session = {
  id: 15,
  type: 'practice',
  title: 'AI 활용 시나리오 설계',
  subtitle: '개인 업무에 맞는 AI 활용 시나리오 만들기',
  duration: 60,
  objective: '개인 업무에 최적화된 AI 활용 시나리오를 설계',
  keyMessage: '내 업무에 맞는 AI 활용법 찾기',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: adminPracticeGuide,
  quizzes,
};
