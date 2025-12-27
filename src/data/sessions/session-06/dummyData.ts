import { DummyData } from '../../types';

export const dummyData: DummyData[] = [
  {
    id: 's06-dd01',
    title: '간호 메모 - 기본',
    description: '80대 남성 환자 기본 간호 메모 (수면, 통증, 활력징후)',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `환자: 김OO (80대, 남)
밤에 잠 거의 못 잠
허리 통증 계속 호소함
혈압 160/95
식사량 절반 이하
보행 시 불안정`,
  },
  {
    id: 's06-dd02',
    title: '간호 메모 - 심화',
    description: '70대 여성 환자 복합 증상 간호 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `환자: 이OO (70대, 여)
아침에 어지러움 호소
식사 중 오심 표현
혈당 210
낙상 위험 있어 보임
보호자 불안해함`,
  },
  {
    id: 's06-dd03',
    title: '간호 메모 - 고급',
    description: '60대 남성 환자 수술 후 상태 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `환자: 박OO (60대, 남)
수술 후 2일차
통증 NRS 6점
배액량 줄어듦
기침 시 복부 불편감 호소
조기이상 1회 시행
식사 미음으로 시작
오늘 드레싱 교체 예정`,
  },
];
