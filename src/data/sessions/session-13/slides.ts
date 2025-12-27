import { Slide } from '../../types';

export const slides: Slide[] = [
  {
    id: 1,
    phase: 'intro',
    title: '13차시. 민원 대응 업무에 AI 활용',
    screenContent: '민원 응대 표준 문구 생성하기',
    script: '안녕하세요. 13차시를 시작하겠습니다. 오늘은 민원 대응 업무에 AI를 활용하는 실습입니다.',
  },
  {
    id: 2,
    phase: 'understand',
    title: 'AI가 도울 수 있는 지점',
    screenContent: ['문구 생성', '톤 변환', '템플릿 제작'],
    script: '민원 대응에서 AI가 도울 수 있는 부분입니다. 판단은 사람이, 표현은 AI가.',
  },
  {
    id: 3,
    phase: 'practice',
    title: '실습 - 응대 문구 생성',
    screenContent: '민원 상황에 맞는 응대 문구를 생성합니다',
    script: '예제데이터의 민원 상황에 대한 응대 문구를 생성해봅니다.',
  },
  {
    id: 4,
    phase: 'summary',
    title: '오늘 배운 것',
    screenContent: ['구조화된 응대 문구를 생성할 수 있다', '톤 변환으로 상황별 대응이 가능하다'],
    script: '오늘 13차시에서 배운 것을 정리합니다. 결정은 사람이, 표현은 AI가.',
  },
];
