import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { nursingPracticeGuide } from '../../shared/commonPracticeGuides';

export const session12: Session = {
  id: 12,
  type: 'practice',
  title: '신규 간호인력 교육에 AI 활용',
  subtitle: '신규 교육자료 제작 실습',
  duration: 60,
  objective: '신규 간호사 교육자료를 효과적으로 제작',
  keyMessage: '교육 효과를 높이는 AI 활용',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: nursingPracticeGuide,
  quizzes,
};
