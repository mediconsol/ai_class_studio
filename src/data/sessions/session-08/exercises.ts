import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '기본 실습 - 시간순 정리',
    instruction: `24시간 관찰 기록을 시간순으로 정리합니다.

1. 예제데이터 "24시간 환자 관찰 기록"을 선택합니다
2. 프롬프트 "환자상태 시간순 정리"를 선택합니다
3. AI 실행 후 결과를 확인합니다`,
    dummyDataId: 's08-dd01',
    promptId: 's08-timeline',
    hint: '시간대별로 주요 변화가 정리되었는지 확인하세요',
  },
  {
    step: 2,
    title: '심화 실습 - 추이 분석',
    instruction: `상태 변화 추이를 분석합니다.

1. 동일한 예제데이터를 사용합니다
2. 프롬프트 "상태 변화 추이 요약"을 선택합니다
3. 호전/악화 여부가 명확히 나타나는지 확인합니다`,
    dummyDataId: 's08-dd01',
    promptId: 's08-trend',
    hint: '전체적인 상태 변화 방향이 명확한지 확인하세요',
  },
];
