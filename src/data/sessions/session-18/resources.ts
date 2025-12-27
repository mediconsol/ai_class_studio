import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's18-r01',
    title: '최종 결과물 양식 템플릿',
    description: 'AI 업무 개선 최종 결과물 작성 양식 (수강생 제출용)',
    type: 'template',
    tags: ['과제', '결과물', '양식'],
  },
  {
    id: 's18-r02',
    title: '결과물 다듬기 체크리스트',
    description: '결과물 완성도 점검 체크리스트',
    type: 'template',
    tags: ['과제', '체크리스트'],
  },
  {
    id: 's18-r03',
    title: '결과물 예시 - 인수인계 요약 템플릿',
    description: '교대 인수인계 요약 템플릿 완성 예시',
    type: 'document',
    tags: ['예시', '간호', '인수인계'],
  },
  {
    id: 's18-r04',
    title: '결과물 예시 - 민원 응대 문구집',
    description: '민원 응대 표준 문구집 완성 예시',
    type: 'document',
    tags: ['예시', '행정', '민원'],
  },
  {
    id: 's18-r05',
    title: '결과물 예시 - 적정성평가 대응 템플릿',
    description: '적정성평가 대응 문서 구조화 템플릿 완성 예시',
    type: 'document',
    tags: ['예시', 'QI', '적정성평가'],
  },
  {
    id: 's18-r06',
    title: 'AI 초안 → 수정 → 완성 예시',
    description: 'AI 생성 초안을 현업에 맞게 다듬는 과정 예시',
    type: 'document',
    tags: ['예시', '시연'],
  },
];
