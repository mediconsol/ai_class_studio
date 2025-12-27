import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session10PracticeGuide } from './practiceGuide';

export const session10: Session = {
  id: 10,
  type: 'practice',
  title: '감염관리 업무에 AI 활용',
  subtitle: '감염관리 지침을 교육자료로 변환하는 실습',
  duration: 60,
  objective: '감염관리 지침을 교육자료로 효과적으로 변환',
  keyMessage: '지침은 있다. 문제는 전달이다. AI로 전달력을 높인다.',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session10PracticeGuide,
  quizzes,
};
