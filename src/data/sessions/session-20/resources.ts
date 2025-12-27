import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's20-r01',
    title: '개인별 AI 활용 계획서 양식',
    description: '교육 이후 AI 활용 계획 정리 양식',
    type: 'template',
    tags: ['과제', '계획서', '마무리'],
  },
  {
    id: 's20-r02',
    title: '전체 산출물 체크리스트',
    description: '과정 전체 산출물 완성 여부 확인용 체크리스트',
    type: 'template',
    tags: ['체크리스트', '수료'],
  },
  {
    id: 's20-r03',
    title: 'AI 활용 계획서 예시 - 병동 간호사',
    description: '병동 간호사 개인별 AI 활용 계획서 예시',
    type: 'document',
    tags: ['예시', '간호'],
  },
  {
    id: 's20-r04',
    title: 'AI 활용 계획서 예시 - 원무과 직원',
    description: '원무과 직원 개인별 AI 활용 계획서 예시',
    type: 'document',
    tags: ['예시', '행정'],
  },
  {
    id: 's20-r05',
    title: 'AI 활용 계획서 예시 - QI 담당자',
    description: 'QI 담당자 개인별 AI 활용 계획서 예시',
    type: 'document',
    tags: ['예시', 'QI'],
  },
  {
    id: 's20-r06',
    title: '과정 전체 핵심 메시지 요약',
    description: '20차시 전체 과정 핵심 메시지 정리',
    type: 'document',
    tags: ['요약', '마무리'],
  },
  {
    id: 's20-r07',
    title: '수료 후 권장 일정',
    description: '교육 수료 후 1개월 권장 활동 일정',
    type: 'document',
    tags: ['권장', '수료 후'],
  },
];
