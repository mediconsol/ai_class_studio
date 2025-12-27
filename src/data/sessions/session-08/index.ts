import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { nursingPracticeGuide } from '../../shared/commonPracticeGuides';

export const session08: Session = {
  id: 8,
  type: 'practice',
  title: '환자상태 요약·관찰 기록에 AI 활용',
  subtitle: '시간에 따른 환자 상태 변화를 구조화하여 정리',
  duration: 60,
  objective: '환자의 시간별 상태 변화를 AI를 활용하여 체계적으로 정리',
  keyMessage: '시간 흐름에 따른 변화, AI로 한눈에',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: nursingPracticeGuide,
  quizzes,
};
