import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '교육자료 변환 (기본)',
    instruction: 'SOP를 신규 간호사용 교육자료로 변환합니다',
    dummyDataId: 's12-dd01',
    promptId: 's12-p01',
    hint: '왜 중요한지 설명과 자주 하는 실수가 포함되었는지 확인하세요',
  },
  {
    step: 2,
    title: '자가 체크리스트 (심화)',
    instruction: '교육자료를 바탕으로 신규 간호사용 자가 체크리스트를 만듭니다',
    promptId: 's12-p02',
    hint: '수행 전/중/후로 구분되고, 프리셉터 확인란이 포함되었는지 확인하세요',
  },
  {
    step: 3,
    title: '교육 확인 퀴즈 (응용)',
    instruction: '교육자료를 바탕으로 교육 이해도 확인용 퀴즈를 생성합니다',
    promptId: 's12-p03',
    hint: 'O/X, 객관식, 단답형이 섞여 있고, 실제 업무 상황 문제로 구성되었는지 확인하세요',
  },
  {
    step: 4,
    title: '포켓 요약 카드 (추가)',
    instruction: '핵심 내용을 휴대용 포켓 카드로 제작합니다',
    promptId: 's12-p04',
    hint: '명함 크기로 앞뒤 양면 구성, 최대한 간결하게 작성되었는지 확인하세요',
  },
];
