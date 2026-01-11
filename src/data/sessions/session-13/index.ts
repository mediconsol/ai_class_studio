import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { session13PracticeGuide } from './practiceGuide';
import { promptGuide } from './promptGuide';
import { practiceScenarios } from './practiceScenarios';

export const session13: Session = {
  id: 13,
  type: 'practice',
  title: '의료행정·원무 업무에 AI 활용',
  subtitle: '민원 응대 표준 문구 생성 실습',
  duration: 60,
  objective: '민원 상황에 맞는 응대 문구를 효과적으로 생성',
  keyMessage: '민원의 핵심은 "설명"이다. 일관된 설명이 민원을 줄인다.',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: session13PracticeGuide,
  promptGuide,
  quizzes,
  practiceScenarios,
};
