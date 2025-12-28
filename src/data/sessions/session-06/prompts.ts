import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's06-p01',
    title: 'SOAP 기록 정리 (기본)',
    description: '거친 간호 메모를 SOAP 형식의 기록용 문장으로 정리',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 간호 메모를 SOAP 형식의 간호기록 문장으로 정리해주세요.

조건:
- 판단이나 진단은 추가하지 말 것
- 간호사가 관찰한 내용만 정리
- 간결하고 기록용 문장으로 작성
- 원문에 있는 정보만 사용
- 수치와 시간 정보는 절대 변경 금지

[간호 메모]
(여기에 메모 내용 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's06-p02',
    title: '버전 비교 (확장)',
    description: '같은 내용을 간결한 버전과 상세한 버전으로 비교',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 간호기록을 두 가지 버전으로 작성해주세요:

1) 간결한 버전 (인수인계용)
2) 상세한 버전 (공식 기록용)

조건:
- 두 버전 모두 원문 내용만 사용
- 추가 정보나 해석 금지`,
    temperature: 0.1,
  },
  {
    id: 's06-p03',
    title: '특정 항목 강조 (확장)',
    description: '낙상 위험, 통증 등 특정 항목을 강조하여 기록',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd03'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 SOAP 기록에서 다음 항목을 특히 강조해서 다시 작성해주세요:
- 낙상 위험
- 통증 상태
- 활력징후 변화

조건:
- 원문에 해당 항목이 있는 경우만 강조
- 없는 내용은 만들어내지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's06-p04',
    title: '표 형식 변환 (확장)',
    description: 'SOAP 기록을 표 형식으로 변환',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 SOAP 기록을 다음 표 형식으로 변환해주세요:

| 구분 | 내용 |
|------|------|
| S | |
| O | |
| A | |
| P | |

조건:
- 원문 내용만 사용
- 각 구분에 맞게 정확히 분류`,
    temperature: 0.1,
  },
  {
    id: 's06-p05',
    title: '여러 시점 기록 (심화)',
    description: '같은 환자의 여러 날짜 기록을 정리하고 변화 요약',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래는 같은 환자의 3일간 간호 메모입니다.
각 날짜별로 SOAP 기록을 작성하고, 마지막에 3일간의 변화 요약을 추가해주세요.

[1일차 메모]
(내용)

[2일차 메모]
(내용)

[3일차 메모]
(내용)

출력 형식:
**1일차**
(SOAP 기록)

**2일차**
(SOAP 기록)

**3일차**
(SOAP 기록)

**3일간 변화 요약**
- 주요 변화 사항 (원문에 있는 내용만)
- 호전/악화 경향 (관찰된 사실만)
- 지속 관찰 필요 항목

조건:
- 각 날짜의 메모에 있는 내용만 사용
- 추측이나 해석 금지
- 수치 변화는 정확히 기재`,
    temperature: 0.1,
  },
  {
    id: 's06-p06',
    title: '특정 포맷 지정 (심화)',
    description: '병원 고유의 간호기록 양식에 맞게 정리',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 메모를 우리 병원 간호기록 양식에 맞게 정리해주세요.

양식:
- 날짜/시간:
- 주호소:
- 활력징후:
- 관찰 사항:
- 간호 중재:
- 계획:

[간호 메모]
(내용)

조건:
- 각 항목은 간결하게 작성
- 활력징후는 측정값 중심 (원문 그대로)
- 관찰 사항은 객관적 표현
- 간호 중재는 이미 시행한 것만
- 계획은 앞으로 할 것만
- 원문에 없는 내용은 추가하지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's06-p07',
    title: '검토 포인트 추가 (심화)',
    description: '기록 작성 후 누락 사항과 추가 확인 필요 항목 제시',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `위 간호기록을 작성한 후, 기록에서 누락되었거나 추가로 확인이 필요한 항목이 있다면 별도로 알려주세요.

확인 항목:
□ 통증 정도 (NRS 점수)
□ 투약 내역
□ 배뇨/배변 상태
□ 식사 섭취량
□ 수분 섭취량
□ 욕창 위험 평가
□ 낙상 위험 평가
□ 정서 상태
□ 보호자 교육 여부

출력 형식:
**기록된 항목**: (✓ 표시)
**누락된 항목**: (원문에 없어서 기록 못한 항목)
**권장 사항**: (추가 확인을 권장하는 항목)

조건:
- 원문에 있는 항목만 "기록됨"으로 표시
- 추측하지 말 것`,
    temperature: 0.05,
  },
];
