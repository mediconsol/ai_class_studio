import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { worksheets } from './worksheets';

export const session20: Session = {
  // 메타 정보
  id: 20,
  type: 'assignment',
  title: '결과 공유 및 과정 마무리',
  subtitle: '과제 결과 공유, 상호 학습, 개인별 AI 활용 계획 확정',
  duration: 60,
  objective: '과제 결과 공유, 상호 학습, 개인별 AI 활용 계획 확정',
  keyMessage: '교육의 끝이 아니라 활용의 시작이다. 오늘 만든 것이 내일의 변화가 된다.',
  prerequisites: [16, 17, 18, 19],
  deliverables: '개인별 AI 활용 계획서',

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 과제 차시 전용
  worksheets,
};
