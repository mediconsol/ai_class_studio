import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's12-quiz',
    title: '교육 퀴즈 생성',
    description: '교육 내용으로 퀴즈 생성',
    category: 'education',
    suggestedDummyDataIds: ['s12-dd01'],
    prompt: `당신은 신규 간호사 교육 담당자입니다. 아래 교육 내용으로 이해도 확인 퀴즈 5문항을 생성해주세요.

[교육 내용]
{{데이터 붙여넣기}}`,
  },
];
