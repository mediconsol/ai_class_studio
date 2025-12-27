import { DummyData } from '../../types';

export const dummyData: DummyData[] = [
  {
    id: 's08-dd01',
    title: '24시간 환자 관찰 기록',
    description: '폐렴 환자의 24시간 관찰 기록',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `[환자: 김OO, 80대 남, 폐렴]

06:00 - BP 120/80, HR 88, BT 38.2도, SpO2 94%
      - 수면 중 기침 자주 함
      - 객담 배출 어려움

08:00 - 항생제 IV 투여
      - 아침 식사 30% 섭취

10:00 - BT 38.5도로 상승
      - 해열제 투여
      - 가습기 적용

12:00 - BP 125/82, HR 92, BT 37.8도
      - 점심 식사 50% 섭취
      - 객담 약간 배출됨

14:00 - 항생제 IV 투여
      - 산소 2L 적용

16:00 - BT 37.5도, SpO2 96%
      - 기침 빈도 감소
      - 환자 컨디션 호전 호소

18:00 - 저녁 식사 60% 섭취
      - 자가 객담 배출 가능`,
  },
];
