import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session09PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';

export const session09: Session = {
  id: 9,
  type: 'practice',
  title: '환자안전 보고 업무에 AI 활용',
  subtitle: '환자안전 사고보고서 초안을 사실 중심으로 작성',
  duration: 60,
  objective: '환자안전 사고보고서 초안을 사실 중심으로 작성',
  keyMessage: 'AI는 원인을 판단하지 않는다. 사실만 정리한다.',
  tools: ['Claude', 'ChatGPT'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session09PracticeGuide,
  promptGuide,
  quizzes,
};
