import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's15-scenario',
    title: '시나리오 설계 도우미',
    description: '개인 AI 활용 시나리오 설계 지원',
    category: 'general',
    prompt: `나는 의료기관에서 일하는 직원입니다. 다음 업무에 AI를 활용하고 싶습니다.

업무: {{task}}

이 업무에 AI를 활용하는 시나리오를 설계해주세요.
1. 현재 업무 방식
2. AI 활용 방식
3. 필요한 프롬프트 예시
4. 예상 효과`,
  },
];
