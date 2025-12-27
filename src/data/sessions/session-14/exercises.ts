import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '평가 대응 문서 작성 (기본)',
    instruction: '낙상 예방 관리 체계에 대한 대응 문서를 작성합니다',
    dummyDataId: 's14-dd01',
    promptId: 's14-p01',
    hint: '공감 → 상황 설명 → 대안 → 마무리 구조가 포함되었는지 확인하세요',
  },
  {
    step: 2,
    title: '근거 자료 상세화 (심화)',
    instruction: '근거 자료를 표 형식으로 상세하게 정리합니다',
    promptId: 's14-p02',
    hint: '자료명, 내용 설명, 보관 위치, 담당자가 명확히 정리되었는지 확인하세요',
  },
  {
    step: 3,
    title: '여러 항목 일괄 구조화 (응용)',
    instruction: '여러 평가 항목을 같은 형식으로 일괄 정리합니다',
    promptId: 's14-p03',
    hint: '모든 항목이 일관된 형식으로 정리되었는지 확인하세요',
  },
  {
    step: 4,
    title: '자기평가 보고서 작성 (추가)',
    instruction: '평가 항목들을 바탕으로 자기평가 보고서 초안을 작성합니다',
    promptId: 's14-p04',
    hint: '사실 중심으로 작성되고 과장 표현이 없는지 확인하세요',
  },
];
