import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { worksheets } from './worksheets';

export const session18: Session = {
  // 메타 정보
  id: 18,
  type: 'assignment',
  title: '업무 개선 결과물 정리',
  subtitle: '17차시 설계서를 바탕으로 실제 사용 가능한 결과물 완성',
  duration: 60,
  objective: '실무에서 바로 사용할 수 있는 AI 업무 개선 결과물을 완성한다',
  keyMessage: '설명 문서가 아니라 사용 문서를 만들어라. 바로 쓸 수 있어야 진짜 결과물이다.',
  prerequisites: [17],
  deliverables: 'AI 업무 개선 최종 결과물 1종 이상',

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 과제 차시 전용
  worksheets,
};
