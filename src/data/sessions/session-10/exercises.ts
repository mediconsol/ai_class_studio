import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '교육자료 생성',
    instruction: '감염관리 기본 지침을 신규 직원 교육용으로 변환합니다',
    dummyDataId: 's10-dd01',
    promptId: 's10-p01',
    hint: '원문 내용이 유지되었는지, 교육용 문체로 바뀌었는지 확인하세요',
  },
  {
    step: 2,
    title: '게시용 요약',
    instruction: '작성한 교육자료를 병동 게시용 5가지 핵심 수칙으로 요약합니다',
    promptId: 's10-p02',
    hint: '각 항목이 1줄 이내로 간결한지, 누구나 이해할 수 있는지 확인하세요',
  },
  {
    step: 3,
    title: '체크리스트 변환',
    instruction: '감염관리 지침을 일일 점검 체크리스트로 변환합니다',
    promptId: 's10-p03',
    hint: '예/아니오로 답할 수 있는 형태인지, 매일 확인 가능한 항목인지 확인하세요',
  },
  {
    step: 4,
    title: '대상별 버전 (보너스)',
    instruction: '같은 내용을 환자용/보호자용 안내문으로 다르게 작성합니다',
    promptId: 's10-p04',
    hint: '대상별로 톤과 내용이 적절히 다른지 확인하세요',
  },
];
