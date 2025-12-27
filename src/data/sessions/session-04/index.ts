import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { quizzes } from './quizzes';

export const session04: Session = {
  id: 4,
  type: 'theory',
  title: 'AI 활용의 윤리와 보안',
  subtitle: '안전하게 AI를 사용하는 법',
  duration: 60,
  objective: '개인정보 보호와 책임 있는 AI 사용법 이해',
  keyMessage: '개인정보 입력 금지, 결과물 반드시 검토, 책임은 사용자에게',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  quizzes,
};
