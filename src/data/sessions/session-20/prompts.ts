import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's20-p01',
    title: 'AI 활용 계획 검토',
    description: '개인별 AI 활용 계획의 현실성 검토',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 AI 활용 계획을 검토해주세요.

■ 나의 계획
(개인별 AI 활용 계획서 붙여넣기)

■ 검토 요청
1. 계획이 현실적인지
2. 빠진 부분이 있는지
3. 더 효과적인 방법이 있는지
4. 1개월 후 목표가 적절한지

■ 조건
- 의료기관 현실 고려
- 구체적인 피드백

조건:
- 제공된 계획서만 검토
- 추측하지 말 것`,
    temperature: 0.25,
  },
  {
    id: 's20-p02',
    title: '확장 아이디어 요청',
    description: '결과물을 다른 업무로 확장할 아이디어 요청',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내가 만든 AI 결과물을 다른 업무에 확장할 아이디어를 주세요.

■ 현재 결과물
(18차시 결과물 간단히 설명)

■ 나의 업무 영역
(주요 업무 목록)

■ 요청
- 비슷한 패턴의 다른 업무 3가지
- 각 업무에 어떻게 적용할 수 있는지
- 적용 시 주의점

■ 조건
- 의료기관 실무 기준
- 현실적인 아이디어

조건:
- 제공된 결과물과 업무 영역만 기반으로 제안
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
  {
    id: 's20-p03',
    title: 'AI 활용 원칙 정리',
    description: '의료기관에서 AI 활용 시 지켜야 할 원칙 정리',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `의료기관에서 AI를 활용할 때 지켜야 할 원칼을 정리해주세요.

■ 나의 업무
(주요 업무 설명)

■ 요청
- 반드시 지켜야 할 원칙 5가지
- 각 원칙의 이유
- 위반 시 발생할 수 있는 문제

■ 조건
- 현실적이고 지킬 수 있는 원칙
- 의료기관 특성 고려

조건:
- 일반적인 의료기관 AI 활용 원칙만 제시
- 특정 상황이나 정책 만들지 말 것`,
    temperature: 0.25,
  },
];
