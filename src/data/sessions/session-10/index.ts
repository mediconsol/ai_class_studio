import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { nursingPracticeGuide } from '../../shared/commonPracticeGuides';

export const session10: Session = {
  id: 10,
  type: 'practice',
  title: '감염관리 업무에 AI 활용',
  subtitle: '감염관리 지침을 교육자료로 변환하는 실습',
  duration: 60,
  objective: '감염관리 지침을 교육자료로 효과적으로 변환',
  keyMessage: '지침은 그대로, 형태만 바꾼다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: nursingPracticeGuide,
  quizzes,
};
