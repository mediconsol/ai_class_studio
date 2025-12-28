import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

// 1차시: 의료기관 업무를 AI로 바꾼다는 것
// 시연용 프롬프트 - 강의 중 바로 시연 가능

export const prompts: PromptTemplate[] = [
  {
    id: 's01-demo1',
    title: '[시연] 업무 분류해보기',
    description: 'AI가 업무를 분석하는 모습 시연',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 업무를 분석해서 AI 적용 가능 여부를 판단해 주세요.

업무명: 인수인계 기록 작성

분석 기준:
1. 반복성 (매일/매주 반복되는가?)
2. 문서 중심 여부 (기록/정리가 필요한가?)
3. 형식화 가능 여부 (정해진 틀이 있는가?)
4. 판단 필요 여부 (전문적 판단이 핵심인가?)
5. 개인정보 민감도 (실명/주민번호 필요한가?)

결과를 "AI 적용 가능 / 부분 적용 / 적용 불가"로 판단해 주세요.`,
    temperature: 0.2,
  },
  {
    id: 's01-demo2',
    title: '[시연] AI가 못하는 일',
    description: 'AI 한계를 보여주는 시연',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 상황에서 어떻게 해야 할지 결정해주세요.

상황:
- 70대 남성 환자
- 폐렴으로 입원 중
- 오늘 퇴원 예정이었으나 새벽에 발열 38.5도
- 보호자는 오늘 퇴원을 강력히 원함
- 의사는 하루 더 관찰을 권유

질문: 퇴원시켜야 할까요, 입원을 연장해야 할까요?

** 이 질문은 AI가 의학적 판단을 할 수 없음을 시연하기 위한 것입니다. AI의 한계를 명확히 보여주세요.`,
    temperature: 0.2,
  },
  {
    id: 's01-demo3',
    title: '[시연] 간단한 요약 시연',
    description: 'AI 정리 능력 시연',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 인수인계 메모를 깔끔하게 정리해주세요.

301호 김OO 80대여 고혈압당뇨 어제 입원 활력좋음 내일ct예정 보호자딸 낮에방문예정 식이일반식 특이사항없음
302호 박OO 60대남 폐렴 열있어서 해열제줌 3시에 38.2도 지금은 37.5도 보호자없음 혼자계심 링거중
303호 이OO 70대여 골절수술후 통증호소 진통제prn투여함 내일재활예정

**원문에 있는 정보만 사용하여 환자별로 구조화해주세요. 추측이나 추가 정보는 절대 포함하지 마세요.**`,
    temperature: 0.1,
  },
  {
    id: 's01-preview',
    title: '(예고) 실습에서 사용할 프롬프트',
    description: '6차시 실습에서 본격적으로 사용',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 내용을 분석하여 구조화된 형식으로 정리해주세요.

[요청]: 인수인계 기록 정리
[형식]: 환자별 / 항목별 구조화
[주의]: 개인정보 비식별화, 핵심 정보만

[내용]
(여기에 내용 입력)`,
    temperature: 0.2,
  },
];
