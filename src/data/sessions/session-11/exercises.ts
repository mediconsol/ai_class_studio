import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: 'SOP 구조화 (기본)',
    instruction: '활력징후 측정 업무 설명을 공식 SOP 형태로 정리합니다',
    dummyDataId: 's11-dd01',
    promptId: 's11-p01',
    hint: '모호한 표현("보통", "많이", "좋다")이 명확한 표현으로 바뀌었는지 확인하세요',
  },
  {
    step: 2,
    title: '현장 친화형 개선 (심화)',
    instruction: '작성한 SOP를 신규 간호사가 이해하기 쉽게 개선합니다',
    promptId: 's11-p02',
    hint: '각 단계에 구체적인 방법이나 예시가 추가되었는지 확인하세요',
  },
  {
    step: 3,
    title: '퀵 가이드 제작 (응용)',
    instruction: 'SOP를 현장용 간략 체크리스트로 변환합니다',
    promptId: 's11-p03',
    hint: '포켓 카드나 벽 부착용으로 사용할 수 있을 정도로 간결한지 확인하세요',
  },
  {
    step: 4,
    title: '다른 업무 적용 (추가)',
    instruction: '체위 변경 업무에도 같은 방식을 적용해봅니다',
    dummyDataId: 's11-dd02',
    promptId: 's11-p01',
    hint: '"보통 2시간마다", "환자 상태에 따라" 같은 모호한 표현이 구체화되었는지 확인하세요',
  },
];
