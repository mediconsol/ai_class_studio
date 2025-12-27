import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { quizzes } from './quizzes';

export const session03: Session = {
  id: 3,
  type: 'theory',
  title: '의료 문서 자동화의 시작',
  subtitle: 'AI로 문서 작업 효율화하기',
  duration: 60,
  objective: '문서 자동화의 기본 패턴과 적용 방법 이해',
  keyMessage: '반복되는 문서 작업, AI가 대신할 수 있다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  quizzes,
};
