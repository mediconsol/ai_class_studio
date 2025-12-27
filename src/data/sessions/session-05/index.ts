import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { quizzes } from './quizzes';

export const session05: Session = {
  id: 5,
  type: 'theory',
  title: '병원에 AI를 도입한다는 것',
  subtitle: '조직 관점에서 AI 활용 바라보기',
  duration: 60,
  objective: '조직 차원의 AI 도입 방향과 성공 요인 이해',
  keyMessage: '작은 것부터, 한 업무씩, 사람 중심으로',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  quizzes,
};
