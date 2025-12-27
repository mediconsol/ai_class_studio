import { Slide } from '../../types';

export const slides: Slide[] = [
  {
    id: 1,
    phase: 'intro',
    title: '9차시. 환자안전 보고서에 AI 활용',
    screenContent: '환자안전 사건 보고서 작성에 AI 활용하기',
    script: '안녕하세요. 9차시를 시작하겠습니다. 오늘은 환자안전 보고서 작성에 AI를 활용하는 실습입니다.',
  },
  {
    id: 2,
    phase: 'understand',
    title: 'AI가 도울 수 있는 지점',
    screenContent: ['사건 경위 정리', '근본원인 분석 구조화', '개선안 초안 작성'],
    script: 'AI가 환자안전 보고서에서 도울 수 있는 부분입니다.',
  },
  {
    id: 3,
    phase: 'practice',
    title: '실습 - 보고서 초안 작성',
    screenContent: '환자안전 사건 시나리오를 보고서 형식으로 정리합니다',
    script: '예제데이터의 사건 시나리오를 보고서 형식으로 정리해봅니다.',
  },
  {
    id: 4,
    phase: 'summary',
    title: '오늘 배운 것',
    screenContent: ['사건 경위를 구조화할 수 있다', '근본원인 분석 틀을 활용할 수 있다'],
    script: '오늘 9차시에서 배운 것을 정리합니다. 다음 10차시에서는 감염관리를 다룹니다.',
  },
];
