import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: '상태 흐름 요약 (기본)',
    instruction: '4일간의 관찰 기록을 바탕으로 환자의 전반적인 상태 변화 흐름을 요약합니다',
    dummyDataId: 's08-dd01',
    promptId: 's08-p01',
    hint: '"초기 상태 / 경과 요약 / 현재 상태 / 주의 깊게 볼 점"이 명확히 구분되었는지 확인하세요. 변화의 흐름이 화살표나 시간순으로 표현되어 있는지 검토하세요',
  },
  {
    step: 2,
    title: '요약 시트 형식 변환 (심화)',
    instruction: '같은 내용을 요약 시트 형식으로 변환합니다',
    dummyDataId: 's08-dd01',
    promptId: 's08-p02',
    hint: '요약 시트 형식은 회진이나 회의에서 사용하기 편리합니다. 한 장에 전체 변화가 들어 있는지 확인하세요',
  },
  {
    step: 3,
    title: '항목별 추이 분석 (응용)',
    instruction: '항목별 변화 추이를 표로 정리합니다. 필요에 따라 7일간 기록이나 악화-호전 패턴을 분석해보세요',
    dummyDataId: 's08-dd02',
    promptId: 's08-p03',
    hint: 'step 1, 2에서 배운 기본을 활용한 후, 필요에 따라 s08-p04(개선/악화 구분), s08-p05(주간 리포트), s08-p06(퇴원 요약), s08-p07(회의용 요약)을 사용해보세요',
  },
];
