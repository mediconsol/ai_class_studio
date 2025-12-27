import { DummyData } from '../../types';

export const dummyData: DummyData[] = [
  {
    id: 's14-dd01',
    title: '심사 조정 사례',
    description: '입원 일수 조정 관련 심사',
    category: 'admin',
    format: 'text',
    isRaw: true,
    content: `심사 유형: 입원 일수 조정
환자: 70대, 폐렴
청구 일수: 14일
조정 일수: 10일
조정 사유: 일반적 폐렴 입원 기준 초과
실제 상황: 기저질환 있는 고령 환자, 경구 항생제 전환 지연`,
  },
];
