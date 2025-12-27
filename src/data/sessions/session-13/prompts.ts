import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's13-response',
    title: '민원 응대 문구 생성',
    description: '민원 상황에 맞는 응대 문구 생성',
    category: 'admin',
    suggestedDummyDataIds: ['s13-dd01'],
    prompt: `당신은 병원 민원 응대 담당자입니다. 아래 민원 상황에 대한 응대 문구를 작성해주세요.

구조: 공감 → 상황 설명 → 조치 안내 → 마무리

[민원 상황]
{{데이터 붙여넣기}}`,
  },
];
