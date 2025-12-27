import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's11-checklist',
    title: 'SOP 체크리스트 변환',
    description: 'SOP를 실무 체크리스트로 변환',
    category: 'sop',
    suggestedDummyDataIds: ['s11-dd01'],
    prompt: `당신은 간호 업무 매뉴얼 담당자입니다. 아래 SOP를 실무 체크리스트로 변환해주세요.

[SOP]
{{데이터 붙여넣기}}`,
  },
];
