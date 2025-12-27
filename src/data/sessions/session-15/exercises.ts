import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '시나리오 구체화 (기본)',
    instruction: '막연한 아이디어를 구체적인 AI 활용 시나리오로 발전시킵니다',
    dummyDataId: 's15-dd08',
    promptId: 's15-p02',
    hint: '실제로 자주 하는 업무 중에서 선택하세요. 너무 복잡한 업무는 피하세요',
  },
  {
    step: 2,
    title: '시나리오 검토 및 개선 (심화)',
    instruction: '작성한 시나리오를 검토받고 실행 가능성을 점검합니다',
    promptId: 's15-p01',
    hint: 'step 1에서 작성한 시나리오를 붙여넣고 검토를 요청하세요. 체크리스트(s15-dd09)를 활용하세요',
  },
  {
    step: 3,
    title: '관련 차시 연결 (응용)',
    instruction: '내 시나리오와 관련된 지난 차시(6-14차시)를 찾아 복습합니다',
    promptId: 's15-p04',
    hint: '완성된 시나리오를 붙여넣고 관련 차시를 찾아보세요. 제안된 차시를 실제로 복습하세요',
  },
];
