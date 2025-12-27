import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { worksheets } from './worksheets';

export const session16: Session = {
  // 메타 정보
  id: 16,
  type: 'assignment',
  title: '병원 적용용 AI 업무 개선 과제 선정',
  subtitle: '15차시 시나리오를 공식 과제로 발전, 과제 정의서 작성',
  duration: 60,
  objective: '15차시 시나리오를 공식 과제로 발전시키고, 과제 정의서를 작성한다',
  keyMessage: '좋은 과제는 이미 반은 끝난 과제다. 작게, 명확하게 정의하라.',
  prerequisites: [15],
  deliverables: 'AI 업무 개선 과제 정의서 1종',

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 과제 차시 전용
  worksheets,
};
