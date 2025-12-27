import { Slide } from '../../types';

export const slides: Slide[] = [
  {
    id: 1,
    phase: 'intro',
    title: '11차시. 간호 SOP·업무매뉴얼에 AI 활용',
    screenContent: 'SOP를 교육용 자료로 변환하기',
    script: '안녕하세요. 11차시를 시작하겠습니다. 오늘은 SOP와 업무매뉴얼에 AI를 활용하는 실습입니다.',
  },
  {
    id: 2,
    phase: 'understand',
    title: 'AI가 도울 수 있는 지점',
    screenContent: ['SOP 요약', '체크리스트 생성', '퀴즈 생성'],
    script: 'SOP 업무에서 AI가 도울 수 있는 부분입니다.',
  },
  {
    id: 3,
    phase: 'practice',
    title: '실습 - SOP 체크리스트화',
    screenContent: 'SOP를 실무 체크리스트로 변환합니다',
    script: '예제데이터의 SOP를 체크리스트로 변환해봅니다.',
  },
  {
    id: 4,
    phase: 'summary',
    title: '오늘 배운 것',
    screenContent: ['SOP를 체크리스트로 변환할 수 있다', '교육용 퀴즈를 생성할 수 있다'],
    script: '오늘 11차시에서 배운 것을 정리합니다.',
  },
];
