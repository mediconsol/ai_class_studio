import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's08-p01',
    title: '상태 흐름 요약 (기본)',
    description: '며칠간의 관찰 기록을 바탕으로 환자의 전반적인 상태 변화 흐름을 요약',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 며칠간의 관찰 기록을 바탕으로 환자의 전반적인 상태 변화 흐름을 요약해주세요.

요약 구조:
1. 초기 상태
2. 경과 요약 (주요 변화)
3. 현재 상태
4. 주의 깊게 볼 점

조건:
- 진단이나 판단은 추가하지 말 것
- 간호 관찰 사실만 정리
- 원문에 있는 내용만 사용
- 수치 변화는 정확히 기재

[관찰 기록]
(기록 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's08-p02',
    title: '요약 시트 형식 (확장)',
    description: '환자 상태 요약을 정해진 시트 형식으로 변환',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 내용을 다음 형식의 요약 시트로 정리해주세요:

┌────────────────────────────────────┐
│ 환자 상태 요약 시트                │
├────────────────────────────────────┤
│ 환자명:                            │
│ 기간:                              │
├────────────────────────────────────┤
│ 초기 상태:                         │
│ 경과 요약:                         │
│ 현재 상태:                         │
│ 관찰 포인트:                       │
└────────────────────────────────────┘

조건:
- 원문 내용만 사용
- 간결하게 정리`,
    temperature: 0.1,
  },
  {
    id: 's08-p03',
    title: '항목별 추이 표 (확장)',
    description: '주요 항목별 변화 추이를 표로 정리',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01', 's08-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 기록에서 다음 항목별 변화 추이를 표로 정리해주세요:

| 날짜 | 수면 | 통증 | 혈압 | 보행 |
|------|------|------|------|------|

표 아래에 각 항목별 변화 패턴을 간단히 분석해주세요.

조건:
- 원문에 있는 정보만 표에 기재
- 변화 패턴은 관찰된 사실만 기술
- 추측이나 해석 금지`,
    temperature: 0.1,
  },
  {
    id: 's08-p04',
    title: '개선/악화 구분 (확장)',
    description: '개선된 항목과 주의가 필요한 항목을 구분하여 정리',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01', 's08-dd02', 's08-dd03'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 기록을 바탕으로 다음을 구분해주세요:

■ 개선된 항목
■ 유지되는 항목
■ 주의가 필요한 항목

각 항목에 대해 관찰된 사실을 근거로 제시해주세요.

조건:
- 원문의 변화 내용만 근거로 사용
- "개선" 또는 "악화"는 수치나 상태 변화로만 판단
- 의학적 해석 금지`,
    temperature: 0.15,
  },
  {
    id: 's08-p05',
    title: '주간 요약 리포트 (심화)',
    description: '1주일간의 관찰 기록을 주간 요약 리포트로 작성',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래는 환자의 1주일간 관찰 기록입니다.
주간 요약 리포트를 작성해주세요.

리포트 구성:
1. 주간 개요 (한 문장)
2. 주요 변화 사항
3. 개선된 점
4. 지속 관찰 필요 사항
5. 다음 주 관찰 포인트

조건:
- 원문 기록에 있는 내용만 사용
- 각 항목은 관찰된 사실만 기술
- 추측이나 예측 금지

[1주일 기록]
(기록 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's08-p06',
    title: '퇴원 요약 초안 (심화)',
    description: '입원 기간 전체 기록을 바탕으로 퇴원 요약 초안 작성',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래는 환자의 입원 기간 전체 관찰 기록입니다.
퇴원 요약 초안을 작성해주세요.

구성:
1. 입원 당시 상태
2. 입원 기간 중 경과
3. 퇴원 시 상태
4. 퇴원 후 주의 사항

조건:
- 의료적 판단이나 진단은 포함하지 말 것
- 간호 관찰 내용만 정리
- 원문에 있는 사실만 사용
- "퇴원 후 주의사항"은 원문에 명시된 것만

[입원 기간 기록]
(기록 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's08-p07',
    title: '다학제 회의용 요약 (심화)',
    description: '다학제 회의(팀 컨퍼런스)에서 발표할 형식으로 요약',
    category: 'nursing',
    suggestedDummyDataIds: ['s08-dd01', 's08-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 환자 기록을 다학제 회의(팀 컨퍼런스)에서 발표할 수 있는 형식으로 요약해주세요.

발표 시간: 2분 이내
포함 내용:
- 환자 개요 (한 줄)
- 현재 주요 문제
- 최근 변화
- 논의 필요 사항

조건:
- 원문 기록만 사용
- 간결하고 명확하게
- 추측이나 판단 금지

[환자 기록]
(기록 붙여넣기)`,
    temperature: 0.1,
  },
];
