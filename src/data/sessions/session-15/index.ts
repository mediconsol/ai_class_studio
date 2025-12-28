import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session15PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';

export const session15: Session = {
  id: 15,
  type: 'practice',
  title: '내 업무에 맞는 AI 활용 시나리오 완성',
  subtitle: '6-14차시 총정리 및 개인 시나리오 설계',
  duration: 60,
  objective: '실제 업무에 바로 적용할 수 있는 AI 활용 시나리오 완성',
  keyMessage: '더 배우는 게 아니라 어디에 쓸지 정하는 시간이다.',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session15PracticeGuide,
  promptGuide,
  quizzes,
};
