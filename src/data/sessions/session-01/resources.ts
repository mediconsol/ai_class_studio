import { Resource } from '../../types';

export const resources: Resource[] = [
  {
    id: 's01-r01',
    title: '의료기관 AI 도입 가이드',
    description: '의료기관에서 AI를 도입할 때 고려해야 할 기본 원칙과 사례',
    type: 'pdf',
    tags: ['입문', 'AI 기초', '가이드'],
  },
  {
    id: 's01-r02',
    title: 'AI 적용 가능 업무 체크리스트',
    description: '내 업무가 AI 적용에 적합한지 스스로 점검할 수 있는 체크리스트',
    type: 'template',
    tags: ['체크리스트', '자가진단'],
  },
  {
    id: 's01-r03',
    title: '1차시 핵심 요약',
    description: '"판단은 사람이, 정리는 AI가" - 1차시 핵심 메시지 정리',
    type: 'document',
    tags: ['요약', '복습'],
  },
];
