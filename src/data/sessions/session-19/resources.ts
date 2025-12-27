import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's19-r01',
    title: '현업 적용 체크리스트 양식',
    description: '결과물 안전 적용을 위한 6개 항목 점검표',
    type: 'template',
    tags: ['과제', '체크리스트', '적용'],
  },
  {
    id: 's19-r02',
    title: '확산 전략서 양식',
    description: 'AI 결과물 확산을 위한 단계별 계획서',
    type: 'template',
    tags: ['과제', '확산', '전략'],
  },
  {
    id: 's19-r03',
    title: '적용 & 확산 예시 - 병동 간호사',
    description: '인수인계 템플릿 적용 체크리스트 및 확산 전략 예시',
    type: 'document',
    tags: ['예시', '간호', '인수인계'],
  },
  {
    id: 's19-r04',
    title: '적용 & 확산 예시 - 원무과 직원',
    description: '민원 응대 문구집 적용 체크리스트 및 확산 전략 예시',
    type: 'document',
    tags: ['예시', '행정', '민원'],
  },
  {
    id: 's19-r05',
    title: '적용 & 확산 예시 - QI 담당자',
    description: '적정성평가 대응 템플릿 적용 체크리스트 및 확산 전략 예시',
    type: 'document',
    tags: ['예시', 'QI', '적정성평가'],
  },
  {
    id: 's19-r06',
    title: '동료 공유 메시지 예시',
    description: '결과물을 동료에게 부담 없이 권유하는 메시지 예시',
    type: 'document',
    tags: ['예시', '확산', '공유'],
  },
];
