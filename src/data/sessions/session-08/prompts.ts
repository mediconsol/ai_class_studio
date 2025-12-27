import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's08-timeline',
    title: '환자상태 시간순 정리',
    description: '환자의 관찰 기록을 시간순으로 정리합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01'],
    prompt: `당신은 간호 기록 정리를 보조하는 역할입니다.
아래 환자의 관찰 기록을 시간순으로 정리해주세요.

다음 형식으로 정리하세요:
1. 시간대별 주요 상태
2. 활력징후 변화 추이
3. 주요 이벤트 (검사, 처치, 상태 변화)
4. 주의 관찰 사항

[관찰 기록]
{{데이터 붙여넣기}}`,
  },
  {
    id: 's08-trend',
    title: '상태 변화 추이 요약',
    description: '환자 상태의 호전/악화 추이를 요약합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01'],
    prompt: `당신은 간호 기록 분석을 보조하는 역할입니다.
아래 환자의 관찰 기록에서 상태 변화 추이를 분석해주세요.

다음을 포함해 주세요:
1. 전체적인 상태 변화 (호전/유지/악화)
2. 주요 지표별 변화
3. 주의가 필요한 시점

[관찰 기록]
{{데이터 붙여넣기}}`,
  },
];
