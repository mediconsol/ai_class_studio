import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's06-r01',
    title: 'SOAP 기록 가이드',
    description: 'SOAP 형식 간호기록 작성 가이드 및 예시',
    type: 'pdf',
    tags: ['간호', 'SOAP', '가이드'],
  },
  {
    id: 's06-r02',
    title: '간호기록 프롬프트 모음',
    description: '간호기록 작성에 활용할 수 있는 프롬프트 템플릿',
    type: 'template',
    tags: ['프롬프트', '템플릿', '간호'],
  },
  {
    id: 's06-r03',
    title: '실습 예제데이터 추가 세트',
    description: '추가 연습용 간호 메모 예제데이터',
    type: 'document',
    tags: ['예제데이터', '실습'],
  },
];
