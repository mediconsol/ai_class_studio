import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '기본 실습 - 다중 환자 인수인계 요약',
    instruction: `3명 환자의 간호 메모를 인수인계용으로 요약합니다.

1. 예제데이터 "3명 환자 인수인계 메모"를 선택합니다
2. 프롬프트 "다중 환자 인수인계 요약"을 선택합니다
3. AI 실행 후 결과를 확인합니다`,
    dummyDataId: 's07-dd01',
    promptId: 's07-handoff',
    hint: '각 환자별로 형식이 일관되게 나왔는지 확인하세요',
  },
  {
    step: 2,
    title: '심화 실습 - 표 형식 인수인계',
    instruction: `같은 내용을 표 형식으로 정리합니다.

1. 동일한 예제데이터를 사용합니다
2. 프롬프트 "인수인계 표 형식"을 선택합니다
3. 표 형식 결과를 확인합니다`,
    dummyDataId: 's07-dd01',
    promptId: 's07-table',
    hint: '표 형식은 여러 환자를 한눈에 비교할 때 유용합니다',
  },
];
