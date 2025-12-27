import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '기본 인수인계 요약 (기본)',
    instruction: '3명 환자의 간호 메모를 인수인계용으로 요약합니다',
    dummyDataId: 's07-dd01',
    promptId: 's07-p01',
    hint: '각 환자별로 "현재 상태 / 주의 사항 / 다음 할 일"이 명확히 구분되었는지 확인하세요. AI가 판단이나 진단을 추가하지 않았는지 검토하세요',
  },
  {
    step: 2,
    title: '표 형식 변환 (심화)',
    instruction: '같은 내용을 표 형식으로 변환하여 한눈에 비교합니다',
    dummyDataId: 's07-dd01',
    promptId: 's07-p02',
    hint: '표 형식은 여러 환자를 동시에 파악할 때 유용합니다. 인쇄하거나 팀원과 공유하기에도 좋습니다',
  },
  {
    step: 3,
    title: '우선순위 정렬 (응용)',
    instruction: '5명 이상의 환자를 우선순위 순으로 정렬하여 요약합니다. 필요에 따라 야간근무용 인수인계나 병원 양식 맞춤을 시도해보세요',
    dummyDataId: 's07-dd02',
    promptId: 's07-p03',
    hint: 'step 1, 2에서 배운 기본을 활용한 후, 필요에 따라 s07-p04(야간근무용), s07-p05(검토), s07-p06(병원 양식), s07-p07(간단 메모 확장)을 추가로 사용해보세요',
  },
];
