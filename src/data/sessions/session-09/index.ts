import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { nursingPracticeGuide } from '../../shared/commonPracticeGuides';

export const session09: Session = {
  id: 9,
  type: 'practice',
  title: '환자안전 보고서에 AI 활용',
  subtitle: '환자안전 사건 보고서 작성 실습',
  duration: 60,
  objective: '환자안전 사건을 체계적으로 보고서로 정리',
  keyMessage: '사건을 구조화하면 원인이 보인다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: nursingPracticeGuide,
  quizzes,
};
