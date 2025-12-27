import { Slide } from '../../types';

export const slides: Slide[] = [
  {
    id: 1,
    phase: 'intro',
    title: '12차시. 신규 간호인력 교육에 AI 활용',
    screenContent: '신규 교육자료 제작에 AI 활용하기',
    script: '안녕하세요. 12차시를 시작하겠습니다. 오늘은 신규 간호인력 교육에 AI를 활용하는 실습입니다.',
  },
  {
    id: 2,
    phase: 'understand',
    title: 'AI가 도울 수 있는 지점',
    screenContent: ['교육자료 요약', '퀴즈 생성', '시뮬레이션 시나리오'],
    script: '신규 교육에서 AI가 도울 수 있는 부분입니다.',
  },
  {
    id: 3,
    phase: 'practice',
    title: '실습 - 교육 퀴즈 생성',
    screenContent: '교육 내용으로 이해도 확인 퀴즈를 생성합니다',
    script: '예제데이터의 교육 내용을 퀴즈로 변환해봅니다.',
  },
  {
    id: 4,
    phase: 'summary',
    title: '오늘 배운 것',
    screenContent: ['교육자료를 다양한 형태로 변환할 수 있다', '퀴즈와 시나리오를 자동 생성할 수 있다'],
    script: '오늘 12차시에서 배운 것을 정리합니다.',
  },
];
