import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's17-r01',
    title: '개선 설계서 양식 템플릿',
    description: 'AI 업무 개선 설계서 작성 양식 (수강생 제출용)',
    type: 'template',
    tags: ['과제', '설계', '양식'],
  },
  {
    id: 's17-r02',
    title: '전/후 비교표 템플릿',
    description: 'AI 적용 전/후 비교 정리 양식',
    type: 'template',
    tags: ['과제', '비교표', '양식'],
  },
  {
    id: 's17-r03',
    title: '개선 설계서 예시 - 병동 간호사',
    description: '교대 인수인계 요약 템플릿 제작 설계 예시',
    type: 'document',
    tags: ['예시', '간호', '인수인계'],
  },
  {
    id: 's17-r04',
    title: '개선 설계서 예시 - 원무과 직원',
    description: '민원 응대 표준 문구집 제작 설계 예시',
    type: 'document',
    tags: ['예시', '행정', '민원'],
  },
  {
    id: 's17-r05',
    title: '개선 설계서 예시 - QI 담당자',
    description: '적정성평가 대응 문서 구조화 템플릿 설계 예시',
    type: 'document',
    tags: ['예시', 'QI', '적정성평가'],
  },
];
