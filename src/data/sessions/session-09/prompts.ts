import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's09-report',
    title: '환자안전 보고서 초안',
    description: '환자안전 사건을 보고서 형식으로 정리',
    category: 'safety',
    suggestedDummyDataIds: ['s09-dd01'],
    prompt: `당신은 환자안전 보고서 작성을 보조합니다. 아래 사건을 보고서 형식으로 정리해주세요.

[사건 내용]
{{데이터 붙여넣기}}`,
  },
];
