import { PromptTemplate } from '../types';

// 여러 차시에서 공통으로 사용할 수 있는 프롬프트 템플릿

export const commonPrompts: PromptTemplate[] = [
  {
    id: 'common-summarize',
    title: '텍스트 요약',
    description: '긴 텍스트를 핵심 내용으로 요약합니다',
    prompt: `다음 텍스트를 핵심 내용 3-5개로 요약해 주세요.

[텍스트 입력]`,
    category: 'general',
  },
  {
    id: 'common-structure',
    title: '문서 구조화',
    description: '비정형 텍스트를 구조화된 형식으로 변환합니다',
    prompt: `다음 내용을 구조화된 문서 형식으로 정리해 주세요.
항목별로 나누고, 핵심 내용을 명확히 해주세요.

[내용 입력]`,
    category: 'general',
  },
  {
    id: 'common-proofread',
    title: '문서 검토',
    description: '문서의 문법, 표현, 일관성을 검토합니다',
    prompt: `다음 문서를 검토하고 개선점을 제안해 주세요.
- 문법 오류
- 어색한 표현
- 일관성 문제
- 개선 제안

[문서 입력]`,
    category: 'general',
  },
];

export const getCommonPrompt = (id: string) => {
  return commonPrompts.find((p) => p.id === id);
};
