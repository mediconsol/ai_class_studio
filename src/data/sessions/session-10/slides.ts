import { Slide } from '../../types';

export const slides: Slide[] = [
  {
    id: 1,
    phase: 'intro',
    title: '10차시. 감염관리 업무에 AI 활용',
    screenContent: '감염관리 지침을 교육자료로 변환하기',
    script: '안녕하세요. 10차시를 시작하겠습니다. 오늘은 감염관리 업무에 AI를 활용하는 실습입니다.',
  },
  {
    id: 2,
    phase: 'understand',
    title: 'AI가 도울 수 있는 지점',
    screenContent: ['지침 요약', '교육자료 변환', '체크리스트 생성'],
    script: '감염관리 업무에서 AI가 도울 수 있는 부분입니다.',
  },
  {
    id: 3,
    phase: 'practice',
    title: '실습 - 지침을 교육자료로',
    screenContent: '감염관리 지침을 신규 간호사 교육용으로 변환합니다',
    script: '예제데이터의 지침을 교육자료로 변환해봅니다.',
  },
  {
    id: 4,
    phase: 'summary',
    title: '오늘 배운 것',
    screenContent: ['지침을 교육자료로 변환할 수 있다', '체크리스트를 자동 생성할 수 있다'],
    script: '오늘 10차시에서 배운 것을 정리합니다. 지침은 그대로, 형태만 바꾼다.',
  },
];
