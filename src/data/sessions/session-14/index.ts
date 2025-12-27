import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { adminPracticeGuide } from '../../shared/commonPracticeGuides';

export const session14: Session = {
  id: 14,
  type: 'practice',
  title: '심사청구·적정성평가에 AI 활용',
  subtitle: '평가 대응 문서 작성 실습',
  duration: 60,
  objective: '심사 소명서를 체계적으로 작성',
  keyMessage: '근거를 구조화하면 설득력이 높아진다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: adminPracticeGuide,
  quizzes,
};
