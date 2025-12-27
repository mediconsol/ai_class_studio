import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session14PracticeGuide } from './practiceGuide';

export const session14: Session = {
  id: 14,
  type: 'practice',
  title: '심사청구·적정성평가 대응에 AI 활용',
  subtitle: '평가 대응 문서 구조화 실습',
  duration: 60,
  objective: '심사·평가 대응 문서를 효과적으로 구조화',
  keyMessage: '심사·평가의 핵심은 "근거 제시"다. AI는 근거를 정리하는 도구다.',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session14PracticeGuide,
  quizzes,
};
