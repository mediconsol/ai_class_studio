import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '민원 응대 문구 작성 (기본)',
    instruction: '대기시간 민원 상황에 대한 표준 응대 문구를 작성합니다',
    dummyDataId: 's13-dd01',
    promptId: 's13-p01',
    hint: '공감 → 상황 설명 → 대안 → 마무리 구조가 포함되었는지 확인하세요',
  },
  {
    step: 2,
    title: '안내문 자동 생성 (심화)',
    instruction: '진료비 수납 안내문을 작성합니다',
    promptId: 's13-p02',
    hint: 'A4 1장 이내, 항목별 정리, 환자가 읽기 쉽게 작성되었는지 확인하세요',
  },
  {
    step: 3,
    title: 'FAQ 정리 (응용)',
    instruction: '원무과에서 자주 받는 질문 10가지와 표준 답변을 작성합니다',
    promptId: 's13-p03',
    hint: '질문은 실제 상황 기반, 답변은 3줄 이내로 간결하게 작성되었는지 확인하세요',
  },
  {
    step: 4,
    title: '톤 비교 (추가)',
    instruction: '응대 문구를 간결한 버전과 상세한 버전으로 비교 작성합니다',
    promptId: 's13-p04',
    hint: '각 버전의 사용 상황이 명확히 설명되었는지 확인하세요',
  },
];
