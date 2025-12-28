import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's16-define',
    title: '과제 정의 도우미',
    description: '과제 아이디어를 구체적인 정의서로 발전시킵니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `나는 의료기관에서 일하는 직원입니다.
다음 업무를 AI를 활용해 개선하고 싶습니다.

업무: {{task}}

이 업무에 대해 다음 항목들을 구체적으로 정리해 주세요:

1. 과제명 (간결하게, 10자 이내)
2. 현재 업무 설명 (어떤 상황에서, 어떻게 수행되는지)
3. 현재의 불편한 점 (시간/반복/누락/감정 등)
4. AI 적용 아이디어 (AI가 어떤 역할을 할 수 있는지)
5. 기대 효과 (시간/정확성/만족도 등 구체적 수치 포함)
6. 과제 범위 제안 (이번에 다룰 것 / 다루지 않을 것)

조건:
- 제공된 업무 정보만 기반으로 제안
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
  {
    id: 's16-check',
    title: '과제 적합성 검토',
    description: '작성한 과제가 좋은 과제의 조건을 충족하는지 검토합니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `다음은 내가 작성한 AI 업무 개선 과제입니다.

{{assignment}}

이 과제가 다음 조건을 충족하는지 검토해 주세요:

1. 실제 업무인가? (가상이 아닌 실제 수행 업무)
2. 혼자 해볼 수 있는가? (다른 부서 협조 없이)
3. 결과물이 남는가? (문서/템플릿/양식 등)
4. 바로 적용할 수 있는가? (교육 후 즉시 사용)
5. 범위가 명확한가? ("여기까지만"이 있는지)

각 항목에 대해 충족 여부와 개선 제안을 알려주세요.

조건:
- 제공된 과제 내용만 검토
- 추측하지 말 것`,
    temperature: 0.2,
  },
  {
    id: 's16-scope',
    title: '범위 조정 도우미',
    description: '과제 범위가 너무 크거나 모호할 때 조정합니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `다음 과제의 범위를 조정해 주세요.

현재 과제: {{task}}

이 과제가 너무 크거나 모호합니다.
다음 기준으로 범위를 줄여주세요:

1. 대상 축소: 전체가 아닌 일부로 (예: 모든 환자 → 일반 환자 5명)
2. 기간 축소: 장기가 아닌 단기로 (예: 전체 프로세스 → 1단계만)
3. 복잡도 축소: 고급 기능 제외 (예: 중환자, 특수 케이스 제외)

축소된 과제 범위와 그 이유를 제안해 주세요.

조건:
- 현재 과제 내용만 기반으로 축소
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
];
