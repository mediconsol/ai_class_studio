import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session07PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';

export const session07: Session = {
  id: 7,
  type: 'practice',
  title: '인수인계·교대근무에 AI 활용',
  subtitle: '여러 환자 기록을 인수인계용으로 요약하는 실습',
  duration: 60,
  objective: '여러 환자의 간호 기록을 AI를 활용하여 인수인계용으로 효율적으로 요약',
  keyMessage: '모든 정보가 아니라, 다음 근무자가 바로 행동할 수 있는 정보',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session07PracticeGuide,
  promptGuide,
  quizzes,
};
