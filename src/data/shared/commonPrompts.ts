import { PromptTemplate } from '../types';
import { getSystemPromptByCategory } from './systemPrompts';

// 여러 차시에서 공통으로 사용할 수 있는 프롬프트 템플릿

export const commonPrompts: PromptTemplate[] = [
  {
    id: 'common-summarize',
    title: '텍스트 요약',
    description: '긴 텍스트를 핵심 내용으로 요약합니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `다음 텍스트를 핵심 내용 3-5개로 요약해 주세요.

조건:
- 원문에 있는 내용만 요약
- 추측이나 해석 금지
- 중요한 수치, 날짜, 이름은 정확히 유지

[텍스트 입력]`,
    temperature: 0.1,
  },
  {
    id: 'common-structure',
    title: '문서 구조화',
    description: '비정형 텍스트를 구조화된 형식으로 변환합니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `다음 내용을 구조화된 문서 형식으로 정리해 주세요.

조건:
- 항목별로 나누고, 핵심 내용을 명확히 할 것
- 원문에 있는 정보만 사용
- 추가 설명이나 일반론은 포함하지 말 것

[내용 입력]`,
    temperature: 0.2,
  },
  {
    id: 'common-proofread',
    title: '문서 검토',
    description: '문서의 문법, 표현, 일관성을 검토합니다',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `다음 문서를 검토하고 개선점을 제안해 주세요.

검토 항목:
- 문법 오류
- 어색한 표현
- 일관성 문제
- 개선 제안

조건:
- 제공된 문서만 검토
- 내용 자체는 변경하지 말 것
- 형식과 표현의 개선만 제안

[문서 입력]`,
    temperature: 0.1,
  },
];

export const getCommonPrompt = (id: string) => {
  return commonPrompts.find((p) => p.id === id);
};
