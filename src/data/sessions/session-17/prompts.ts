import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's17-p01',
    title: '개선 설계서 검토',
    description: '작성한 설계서의 전/후 비교 명확성 검토',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내가 작성한 AI 업무 개선 설계서를 검토해주세요.

■ 설계서
(작성한 내용 붙여넣기)

■ 검토 요청
1. 전/후 비교가 명확한지
2. 사람 역할과 AI 역할이 잘 구분되어 있는지
3. 시간 추정이 현실적인지
4. 빠진 부분이 있는지
5. 18차시(결과물 완성)를 위해 준비할 것

■ 조건
- 솔직하게 피드백해주세요
- 개선 방향을 구체적으로 제안해주세요

조건:
- 제공된 설계서 내용만 검토
- 추측하지 말 것`,
    temperature: 0.2,
  },
  {
    id: 's17-p02',
    title: '전/후 비교표 작성 도움',
    description: '과제 정의서 기반 비교표 작성 지원',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 과제의 전/후 비교표를 작성하는 것을 도와주세요.

■ 과제 정의서
(16차시 과제 정의서 붙여넣기)

■ 현재 업무 흐름
(대략적으로 설명)

■ 요청
- 전/후 비교표 형식으로 정리
- 업무 흐름, 소요 시간, 결과물, 사람/AI 역할 포함
- 핵심 변화 요약 포함

조건:
- 제공된 과제 정의서와 업무 흐름만 사용
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
  {
    id: 's17-p03',
    title: '업무 흐름 구체화',
    description: 'AI 적용 전/후 업무 흐름 상세화',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 과제의 업무 흐름을 더 구체적으로 정리하고 싶습니다.

■ 과제명
(과제명)

■ 현재 업무 (대략)
(현재 어떻게 하는지 설명)

■ 요청
1. AI 적용 전 업무 흐름 (단계별, 시간 포함)
2. AI 적용 후 업무 흐름 (단계별, 예상 시간)
3. 각 단계에서 사람이 하는 일 vs AI가 하는 일

조건:
- 제공된 업무 설명만 기반으로 구체화
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
  {
    id: 's17-p04',
    title: '기대 효과 정리',
    description: '전/후 비교 기반 효과 정리',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 과제의 기대 효과를 정리하고 싶습니다.

■ 전/후 비교
(전/후 비교 내용 붙여넣기)

■ 요청
- 시간 측면 기대 효과
- 품질 측면 기대 효과
- 일관성 측면 기대 효과
- 기타 기대 효과

■ 조건
- 과장하지 않고 현실적으로
- 가능하면 숫자로 표현

조건:
- 제공된 전/후 비교 내용만 기반으로 분석
- 추측하지 말 것`,
    temperature: 0.25,
  },
];
