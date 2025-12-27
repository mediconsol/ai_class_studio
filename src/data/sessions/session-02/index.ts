import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { quizzes } from './quizzes';

export const session02: Session = {
  id: 2,
  type: 'theory',
  title: '생성형 AI를 업무 도우미로 쓰는 법',
  subtitle: '프롬프트 사고방식 익히기',
  duration: 60,
  objective: 'AI에게 일을 잘 시키는 프롬프트 작성법 이해',
  keyMessage: '명확하게 말해야 명확한 결과가 나온다',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  quizzes,
};
