import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's07-handoff',
    title: '다중 환자 인수인계 요약',
    description: '여러 환자의 간호 메모를 인수인계용으로 한 번에 요약합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01'],
    prompt: `당신은 간호 인수인계를 보조하는 역할입니다.
아래 여러 환자의 간호 메모를 인수인계용으로 요약해주세요.

각 환자별로 다음 항목을 정리하세요:
1. 현재 상태 (한 줄)
2. 오늘 시행한 주요 처치
3. 다음 근무자 주의사항

간결하고 명확하게 작성해주세요.

[간호 메모]
{{데이터 붙여넣기}}`,
  },
  {
    id: 's07-table',
    title: '인수인계 표 형식',
    description: '인수인계 내용을 표 형식으로 정리합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01'],
    prompt: `당신은 간호 인수인계를 보조하는 역할입니다.
아래 여러 환자의 간호 메모를 표 형식으로 정리해주세요.

열 구성: 환자(병실) | 현재 상태 | 오늘 처치 | 주의사항

[간호 메모]
{{데이터 붙여넣기}}`,
  },
];
