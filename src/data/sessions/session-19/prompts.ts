import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's19-p01',
    title: '확산 전략 검토',
    description: 'AI 결과물 확산 계획의 현실성 검토',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 AI 결과물 확산 계획을 검토해주세요.

■ 결과물 설명
(18차시 결과물 간단히 설명)

■ 확산 계획
(작성한 확산 전략서 붙여넣기)

■ 검토 요청
1. 계획이 현실적인지
2. 빠진 부분이 있는지
3. 예상되는 리스크
4. 더 효과적인 확산 방법

■ 조건
- 의료기관 현실 고려
- 구체적인 피드백

조건:
- 제공된 확산 계획만 검토
- 추측하지 말 것`,
    temperature: 0.25,
  },
  {
    id: 's19-p02',
    title: '리스크 분석',
    description: '결과물 적용 시 발생 가능한 리스크 분석',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `내 AI 결과물 적용 시 발생할 수 있는 리스크를 분석해주세요.

■ 결과물
(18차시 결과물 설명)

■ 적용 계획
(어떻게 사용할 예정인지)

■ 분석 요청
1. 예상되는 리스크 목록
2. 리스크별 발생 가능성 (높음/중간/낮음)
3. 리스크별 대응 방안
4. 특히 주의해야 할 점

■ 조건
- 의료기관 특성 고려
- 현실적인 리스크 중심

조건:
- 제공된 결과물과 적용 계획만 기반으로 분석
- 추측이나 일반론 금지`,
    temperature: 0.25,
  },
  {
    id: 's19-p03',
    title: '공유 메시지 작성',
    description: '동료에게 결과물 공유 시 사용할 메시지 작성',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `동료에게 AI 결과물을 공유할 때 사용할 메시지를 작성해주세요.

■ 결과물
(18차시 결과물 간단히 설명)

■ 공유 대상
(예: 같은 근무조 동료 2명)

■ 요청
- 간단한 소개 (2~3문장)
- 사용 방법 안내 (3~4줄)
- 주의사항 (1~2줄)

■ 조건
- 부담 주지 않는 톤
- "해보실래요?" 권유 느낌
- 강요 아닌 제안

조건:
- 제공된 결과물 정보만 사용
- 추측하지 말 것`,
    temperature: 0.25,
  },
  {
    id: 's19-p04',
    title: '피드백 질문 작성',
    description: '결과물 공유 후 피드백 수집용 질문 작성',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `AI 결과물을 공유한 후 피드백을 받을 질문을 만들어주세요.

■ 결과물
(18차시 결과물 간단히 설명)

■ 요청
- 사용 편의성 관련 질문 2개
- 개선점 관련 질문 2개
- 추가 기능 관련 질문 1개

■ 조건
- 간단하게 답할 수 있는 질문
- 예/아니오 또는 선택형 포함
- 부담 없는 톤

조건:
- 제공된 결과물 정보만 사용
- 추측하지 말 것`,
    temperature: 0.25,
  },
];
