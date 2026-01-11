import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session12PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';
import { practiceScenarios } from './practiceScenarios';

export const session12: Session = {
  id: 12,
  type: 'practice',
  title: '신규 간호인력 교육에 AI 활용',
  subtitle: '신규 교육자료 제작 실습',
  duration: 60,
  objective: '신규 간호사 교육자료를 효과적으로 제작',
  keyMessage: '교육 부담의 핵심은 "가르치는 일"이 아니라 "자료 준비"다. AI로 준비 시간을 줄인다.',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session12PracticeGuide,
  promptGuide,
  quizzes,
  practiceScenarios,
};
