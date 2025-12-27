import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { worksheets } from './worksheets';

export const session17: Session = {
  // 메타 정보
  id: 17,
  type: 'assignment',
  title: 'AI 활용 업무 개선안 설계',
  subtitle: '16차시 과제 정의서를 바탕으로 AI 적용 전/후 비교 설계',
  duration: 60,
  objective: 'AI 적용 전/후 비교 분석을 수행하고 개선안 설계서를 완성한다',
  keyMessage: '무엇이 달라지는지 설명할 수 있어야 진짜 개선이다.',
  prerequisites: [16],
  deliverables: 'AI 업무 개선 설계서 1종',

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 과제 차시 전용
  worksheets,
};
