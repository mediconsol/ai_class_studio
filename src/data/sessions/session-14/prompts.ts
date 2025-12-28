import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's14-p01',
    title: '평가 대응 문서 (기본)',
    description: '평가 항목에 대한 대응 문서 작성',
    category: 'admin',
    suggestedDummyDataIds: ['s14-dd01', 's14-dd02', 's14-dd03'],
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 평가 항목과 운영 내용 메모를 바탕으로 평가 대응 문서 초안을 작성해주세요.

■ 작성 기준
- 평가 질문에 직접 답할 것
- 실제 운영 중인 내용만 정리할 것
- 과장된 표현 사용 금지
- "철저히", "항상", "문제 없음" 같은 표현 금지
- 공식 문서 톤으로 작성

■ 구성
1. 평가 항목에 대한 답변 (1~2문장)
2. 현재 운영 체계 설명 (항목별)
3. 관련 근거 자료 목록

조건:
- 제공된 메모에 있는 내용만 사용
- 추측이나 일반론 금지
- 수치와 시간은 정확히 유지

[평가 항목]
{{데이터 붙여넣기}}

[운영 내용 메모]
{{메모 붙여넣기}}`,
    temperature: 0.1,
  },
  {
    id: 's14-p02',
    title: '근거 자료 상세화 (확장)',
    description: '근거 자료를 표 형식으로 상세 정리',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `위 대응 문서의 근거 자료를 더 상세하게 정리해주세요.

■ 형식
| 근거 자료명 | 내용 설명 | 보관 위치 | 담당자 |

■ 조건
- 실제 제출 가능한 수준으로
- 각 자료가 어떤 평가 기준과 연결되는지 표시

■ 추가 정리
- 평가 기준별로 어떤 근거 자료가 해당하는지 매핑

조건:
- 위 대응 문서에 언급된 자료만 정리
- 추가 자료 만들지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's14-p03',
    title: '일괄 구조화 (확장)',
    description: '여러 평가 항목을 같은 형식으로 일괄 정리',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 평가 항목들을 모두 같은 형식으로 정리해주세요.

■ 형식 (항목당)
| 평가 항목 | 답변 요약 | 운영 체계 요약 | 주요 근거 자료 |

■ 평가 항목 목록
(항목 목록 붙여넣기)

■ 각 항목별 운영 내용
(각 항목 메모 붙여넣기)

■ 조건
- 모든 항목이 같은 구조로 정리
- 답변 요약은 1문장
- 운영 체계 요약은 핵심 키워드만

조건:
- 제공된 내용만 사용
- 추측이나 일반론 금지`,
    temperature: 0.1,
  },
  {
    id: 's14-p04',
    title: '자기평가 보고서 (확장)',
    description: '평가 항목 기반 자기평가 보고서 작성',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 평가 항목들을 바탕으로 자기평가 보고서 초안을 작성해주세요.

■ 형식
1. 개요 (1~2문단)
2. 항목별 운영 현황 (항목당 3~5줄)
3. 근거 자료 요약
4. 향후 개선 계획 (있는 경우)

■ 조건
- 사실 중심으로 작성
- 과장 표현 금지
- 개선 계획은 구체적인 내용이 있는 경우만 포함

조건:
- 제공된 정보만 사용
- 추측이나 일반론 금지

[평가 항목 및 운영 현황]
{{내용 붙여넣기}}`,
    temperature: 0.1,
  },
  {
    id: 's14-p05',
    title: '부족 항목 분석 (심화)',
    description: '보완이 필요한 항목 분석',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 평가 항목들의 운영 현황을 보고 부족하거나 보완이 필요한 부분을 분석해주세요.

■ 분석 기준
- 근거 자료가 불명확한 항목
- 운영 내용이 구체적이지 않은 항목
- 추가 확인이 필요한 항목

■ 형식
| 평가 항목 | 현재 상태 | 보완 필요 사항 | 우선순위 |

조건:
- 제공된 운영 현황만 분석
- 추측하지 말 것

[운영 현황]
{{내용 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's14-p06',
    title: '평가 준비 체크리스트 (심화)',
    description: '평가 준비용 체크리스트 생성',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 평가 항목에 대해 평가 준비용 체크리스트를 만들어주세요.

■ 형식
□ [확인 항목]
  - 근거 자료: ___
  - 담당자: ___
  - 확인 상태: 완료/진행중/미착수

■ 조건
- 평가 기준에서 요구하는 모든 항목 포함
- 근거 자료와 연결
- 담당자 지정란 포함

조건:
- 제공된 평가 항목 기준만 사용
- 추가 항목 만들지 말 것

[평가 항목 및 기준]
{{내용 붙여넣기}}`,
    temperature: 0.1,
  },
  {
    id: 's14-p07',
    title: '작년 대비 변경 사항 (심화)',
    description: '작년 대비 변경된 내용 정리',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `작년 평가 대응 내용과 올해 운영 현황을 비교하여 변경된 사항을 정리해주세요.

■ 형식
| 항목 | 작년 | 올해 | 변경 내용 |

■ 조건
- 변경된 내용만 강조
- 개선된 부분 표시
- 추가된 부분 표시

조건:
- 제공된 두 자료만 비교
- 추측이나 일반론 금지

[작년 대응 내용]
{{내용 붙여넣기}}

[올해 운영 현황]
{{내용 붙여넣기}}`,
    temperature: 0.1,
  },
];
