import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '보고서 초안 작성',
    instruction: '낙상 사고 메모를 바탕으로 환자안전 보고서 초안을 작성합니다',
    dummyDataId: 's09-dd01',
    promptId: 's09-p01',
    hint: '사실 중심으로 작성되었는지, 원인 추정이나 책임 표현이 없는지 확인하세요',
  },
  {
    step: 2,
    title: '표현 점검',
    instruction: '작성한 보고서에 위험한 표현이 있는지 점검합니다',
    promptId: 's09-p02',
    hint: '원인 추정 표현("~때문에"), 책임 암시 표현("~미흡") 등을 찾아 수정합니다',
  },
  {
    step: 3,
    title: '다른 사고 유형 적용',
    instruction: '투약 지연 사고에 동일한 방법을 적용하여 보고서를 작성합니다',
    dummyDataId: 's09-dd02',
    promptId: 's09-p01',
    hint: '사고 유형이 달라도 같은 원칙이 적용됩니다',
  },
];
