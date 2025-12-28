import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

// 5차시: 병원에 AI를 도입한다는 것
// 조직 관점 AI 활용 시연

export const prompts: PromptTemplate[] = [
  {
    id: 's05-demo1',
    title: '[시연] 업무 AI 적용 가능성 분석',
    description: '실제 업무를 AI로 분석',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 업무가 AI 적용에 적합한지 분석해주세요.

평가 기준:
1. 반복성 (반복되는 업무인가?)
2. 문서성 (문서 중심 업무인가?)
3. 판단 여부 (판단이 필요한가?)
4. 개인정보 (민감정보를 다루는가?)

조건:
- 객관적 분석만 제공
- "적합" 또는 "부적합" 단정보다는 장단점 제시
- 추측이나 일반론 금지

[업무 설명]
매일 아침 병동 인수인계 시 야간 환자 상태를 구두로 전달하고,
수기로 메모한 내용을 다시 간호기록에 입력하는 업무`,
    temperature: 0.2,
  },
  {
    id: 's05-demo2',
    title: '[시연] 도입 우선순위 정하기',
    description: '여러 업무 중 우선순위 결정',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 세 가지 업무 중 AI를 먼저 도입할 업무의 우선순위를 정해주세요.

평가 기준:
- 도입 효과 (시간 절약, 품질 향상)
- 도입 난이도 (기술적 복잡성)
- 위험도 (오류 발생 시 영향)

조건:
- 각 업무를 위 기준으로 평가
- 우선순위와 근거 제시
- 주관적 판단보다는 객관적 비교

[업무 목록]
1. 인수인계 기록 정리
2. 환자 퇴원 안내문 작성
3. 의료진 회진 내용 요약`,
    temperature: 0.2,
  },
  {
    id: 's05-demo3',
    title: '[시연] 도입 계획 초안 작성',
    description: 'AI 도입 계획 작성',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `병원에 AI 문서 정리 도구를 도입하려고 합니다.
아래 조건을 고려하여 도입 계획 초안을 작성해주세요.

[조건]
- 대상: 간호부서 인수인계 업무
- 목표: 인수인계 기록 작성 시간 50% 단축
- 기간: 3개월 시범 운영
- 제약: 개인정보 보호, 현장 반발 최소화

[출력 형식]
1. 1단계 (준비)
2. 2단계 (시범운영)
3. 3단계 (평가 및 확산)

조건:
- 제시된 조건만 반영
- 일반론이나 추가 제안은 최소화
- 구체적이고 실행 가능한 단계로 작성`,
    temperature: 0.2,
  },
  {
    id: 's05-analyze',
    title: '업무 분석 템플릿',
    description: '직접 사용할 수 있는 템플릿',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 업무가 AI 적용에 적합한지 분석해주세요.

평가 기준:
1. 반복성 (반복되는 업무인가?)
2. 문서성 (문서 중심 업무인가?)
3. 판단 여부 (판단이 필요한가?)
4. 개인정보 (민감정보를 다루는가?)

[업무 설명]
(여기에 업무 설명 입력)`,
    temperature: 0.2,
  },
  {
    id: 's05-summary',
    title: '[시연] 1-5차시 핵심 요약',
    description: '이론 파트 전체 요약',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 내용을 한 장 요약표로 정리해주세요.

[내용]
1차시: AI는 사람을 대체하는 게 아니라 보조하는 도구다. 판단은 사람이, 정리는 AI가.
2차시: 프롬프트는 역할+대상+형식+주의사항으로 구성한다. 명확하게 말해야 명확한 결과가 나온다.
3차시: 반복되는 문서 작업은 AI가 대신할 수 있다. 변환, 요약, 다중 버전 생성.
4차시: 개인정보는 절대 입력하지 않는다. AI 결과물은 반드시 검토한다. 책임은 사용자에게.
5차시: 작은 것부터, 한 업무씩, 사람 중심으로 도입한다.

[형식]
표 형식 (차시 | 핵심 주제 | 기억할 한마디)

조건:
- 제공된 내용만 사용
- 추가 해석이나 의견 금지
- 간결하고 명확하게`,
    temperature: 0.1,
  },
];
