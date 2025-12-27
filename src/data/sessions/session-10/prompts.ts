import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's10-edu',
    title: '감염관리 교육자료 변환',
    description: '지침을 교육용으로 변환',
    category: 'infection',
    suggestedDummyDataIds: ['s10-dd01'],
    prompt: `당신은 감염관리 교육 담당자입니다. 아래 지침을 신규 간호사 교육용 자료로 변환해주세요.

[지침]
{{데이터 붙여넣기}}`,
  },
];
