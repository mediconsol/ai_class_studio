import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's09-p01',
    title: '사고보고서 초안 작성 (기본)',
    description: '사고 상황 메모를 환자안전 보고서 형식으로 정리',
    category: 'safety',
    suggestedDummyDataIds: ['s09-dd01', 's09-dd02'],
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `아래 사고 상황 메모를 바탕으로 환자안전 보고서 초안을 작성해주세요.

■ 작성 기준
- 사실 중심으로 작성
- 원인 추정이나 판단은 절대 포함하지 말 것
- 감정적 표현이나 책임 표현은 제외할 것
- 공식 문서에 사용할 수 있는 문장으로 작성할 것

■ 피해야 할 표현
- "~때문에", "~로 인해" (원인 추정)
- "~미흡", "~부족", "~실수" (책임 암시)
- "확인하지 못했다", "~했어야 했다" (과실 암시)

■ 보고서 구성
1. 사고 개요
2. 사고 발생 상황
3. 사고 직후 환자 상태
4. 즉각 조치 내용

조건:
- 원문 메모에 있는 내용만 사용
- 시간, 장소, 수치는 정확히 유지
- 추측이나 해석 금지

[사고 상황 메모]
{{데이터 붙여넣기}}`,
    temperature: 0.05,
  },
  {
    id: 's09-p02',
    title: '표현 점검 (확장)',
    description: 'AI가 작성한 보고서의 위험 표현 검토',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `위 보고서에서 다음에 해당하는 표현이 있다면 중립적인 사실 표현으로 수정해주세요:

1. 원인을 추정하는 표현 ("~때문에", "~로 인해")
2. 책임을 암시하는 표현 ("~미흡", "~부족")
3. 판단이나 평가가 포함된 표현

수정한 부분이 있다면 [원본] → [수정] 형식으로 보여주세요.
수정할 부분이 없다면 "수정 필요 없음"이라고 답해주세요.

조건:
- 사실 기술만 유지
- 추측 표현 제거`,
    temperature: 0.05,
  },
  {
    id: 's09-p03',
    title: '시간순 정리 (확장)',
    description: '사고 내용을 시간순으로 재정리',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `위 사고 내용을 시간순으로 재정리해주세요.

형식:
[시간] - [발생 사항]

예시:
03:20 - 환자 화장실 이동 중 넘어짐
03:22 - 간호사 발견
03:25 - 활력징후 측정
...

조건:
- 모든 시간은 확인된 시간만 기재 (추정 금지)
- 시간이 명확하지 않은 경우 "~경"으로 표기
- 원문에 있는 사건만 기재`,
    temperature: 0.05,
  },
  {
    id: 's09-p04',
    title: '체크리스트 생성 (확장)',
    description: '보고서 완성 전 점검용 체크리스트 생성',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `위 사고보고서를 바탕으로 작성 완료 전 점검용 체크리스트를 만들어주세요.

체크리스트에 포함할 항목:
- 사실 기술 확인
- 원인 추정 표현 없음 확인
- 책임 암시 표현 없음 확인
- 시간/장소 정확성 확인
- 조치 내용 완전성 확인

형식:
□ [점검 항목] - [확인 내용]`,
    temperature: 0.1,
  },
  {
    id: 's09-p05',
    title: '위험 표현 변환 연습 (심화)',
    description: '위험한 표현을 찾아 중립적 표현으로 변환하는 연습',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `다음 문장들에서 위험한 표현을 찾아 중립적 표현으로 바꿔주세요.

1. "환자가 보호자 없이 혼자 이동하다가 넘어졌다."
2. "확인 미흡으로 투약이 지연되었다."
3. "침대 난간을 올리지 않았기 때문에 낙상이 발생했다."
4. "체위 변경을 자주 하지 않아서 욕창이 생겼다."

각 문장에 대해:
- [위험 표현]: 어떤 부분이 위험한지
- [수정 문장]: 중립적으로 수정한 문장`,
    temperature: 0.05,
  },
  {
    id: 's09-p06',
    title: '보고서 비교 분석 (심화)',
    description: '두 버전의 보고서를 비교하여 적절성 평가',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `아래 두 버전의 사고보고서를 비교해주세요.

[버전 A]
환자가 보호자 없이 화장실에 가다가 넘어졌다.
확인 부족으로 발견이 늦어졌다.

[버전 B]
03:20경 환자가 화장실 이동 중 병실 바닥에서 넘어짐.
03:25경 라운딩 중 발견됨.

어떤 버전이 더 적절한지, 그 이유를 설명해주세요.`,
    temperature: 0.1,
  },
  {
    id: 's09-p07',
    title: '사고 유형별 핵심 기록 항목 (심화)',
    description: '사고 유형별로 반드시 포함되어야 할 핵심 기록 항목 정리',
    category: 'safety',
    systemPrompt: getSystemPromptByCategory('safety'),
    userPrompt: `다음 사고 유형별로 사고보고서에 반드시 포함되어야 할 핵심 기록 항목을 정리해주세요.

1. 낙상
2. 투약 오류
3. 욕창
4. 자가 발관

각 유형별로 5가지 핵심 항목을 제시해주세요.

조건:
- 일반적인 지침만 제공
- 구체적 사례는 만들어내지 말 것`,
    temperature: 0.1,
  },
];
