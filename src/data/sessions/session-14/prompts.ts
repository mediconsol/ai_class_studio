import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's14-appeal',
    title: '소명서 초안 작성',
    description: '심사 소명서 초안 작성',
    category: 'admin',
    suggestedDummyDataIds: ['s14-dd01'],
    prompt: `당신은 병원 심사 담당자입니다. 아래 심사 내용에 대한 소명서 초안을 작성해주세요.

[심사 내용]
{{데이터 붙여넣기}}`,
  },
];
