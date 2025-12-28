import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { quizzes } from './quizzes';
import { learningGuide } from './learningGuide';

export const session01: Session = {
  // 메타 정보
  id: 1,
  type: 'theory',
  title: '의료기관 업무를 AI로 바꾼다는 것',
  subtitle: 'AI에 대한 막연한 불안 제거, 업무 혁신 과정으로서의 인식',
  duration: 60,
  objective: 'AI에 대한 막연한 불안 제거, "업무 혁신 과정"이라는 인식 형성',
  keyMessage: '판단은 사람이, 정리는 AI가',

  // 콘텐츠
  slides,
  prompts,
  resources,
  quizzes,
  learningGuide,

  // 이론 차시이므로 실습/과제 관련 필드 없음
};
