import { DummyData } from '../../types';

export const dummyData: DummyData[] = [
  {
    id: 's15-dd01',
    title: '시나리오 설계 예시',
    description: '인수인계 시나리오 설계 예시',
    category: 'general',
    format: 'text',
    isRaw: true,
    content: `업무: 인수인계
현재: 수기로 메모 → 구두 전달
AI 활용: 메모 입력 → AI 요약 → 검토 후 전달
프롬프트: 인수인계용 요약
효과: 시간 50% 단축, 누락 방지`,
  },
];
