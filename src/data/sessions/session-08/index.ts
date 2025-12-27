import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session08PracticeGuide } from './practiceGuide';

export const session08: Session = {
  id: 8,
  type: 'practice',
  title: '환자상태 요약·관찰 기록에 AI 활용',
  subtitle: '장기 입원 환자의 며칠~몇 주간 상태 변화를 한눈에 요약',
  duration: 60,
  objective: '장기 입원 환자의 며칠~몇 주간 상태 변화를 한눈에 요약',
  keyMessage: '기록은 쌓이고, 흐름은 안 보인다 → AI로 흐름을 만든다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session08PracticeGuide,
  quizzes,
};
