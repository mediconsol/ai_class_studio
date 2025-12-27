import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { worksheets } from './worksheets';

export const session19: Session = {
  // 메타 정보
  id: 19,
  type: 'assignment',
  title: '현업 적용 시 주의사항과 확산 전략',
  subtitle: '결과물을 안전하게 적용하고 확산하는 계획 수립',
  duration: 60,
  objective: '18차시 결과물을 안전하게 적용하고 확산하는 계획 수립',
  keyMessage: '잘 만드는 것보다 잘 쓰는 것이 더 어렵다. 기준 없이 쓰면 위험하고, 혼자만 쓰면 사라진다.',
  prerequisites: [16, 17, 18],
  deliverables: '현업 적용 체크리스트 + 확산 전략서',

  // 콘텐츠
  slides,
  prompts,
  resources,

  // 과제 차시 전용
  worksheets,
};
