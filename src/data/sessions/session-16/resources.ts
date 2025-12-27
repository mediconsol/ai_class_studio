import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's16-r01',
    title: '과제 정의서 양식',
    description: 'AI 업무 개선 과제 정의서 작성 양식 (빈 양식)',
    type: 'template',
    tags: ['과제', '양식', '정의서'],
  },
  {
    id: 's16-r02',
    title: '과제 정의서 예시 모음',
    description: '다양한 직종별 과제 정의서 작성 예시',
    type: 'pdf',
    tags: ['과제', '예시', '참고'],
  },
  {
    id: 's16-r03',
    title: '좋은 과제의 조건 체크리스트',
    description: '과제 자가 점검용 5가지 조건 체크리스트',
    type: 'template',
    tags: ['과제', '체크리스트', '점검'],
  },
];
