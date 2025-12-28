import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's07-p01',
    title: '기본 인수인계 요약 (기본)',
    description: '여러 환자의 간호 메모를 인수인계용으로 요약',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 간호 메모를 다음 근무자가 바로 이해할 수 있도록 요약해주세요.

각 환자별로:
- 현재 상태
- 주의 사항
- 다음 근무 시 할 일

조건:
- 원문에 있는 정보만 사용
- 수치와 시간은 정확히 유지
- 추측이나 해석 금지

[간호 메모]
(여기에 메모 내용 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's07-p02',
    title: '표 형식 인수인계 (기본)',
    description: '인수인계 내용을 표 형식으로 변환',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01', 's07-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 간호 메모를 표 형식으로 정리해주세요.

표 형식:
| 환자 | 현재 상태 | 주의사항 | 다음 할 일 |
|------|-----------|----------|------------|
| ... | ... | ... | ... |

조건:
- 원문에 있는 내용만 사용
- 각 항목은 간결하게

[간호 메모]
(여기에 메모 내용 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's07-p03',
    title: '우선순위 정렬 (확장)',
    description: '5명 이상 환자를 우선순위 순으로 정렬',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 여러 환자의 간호 메모를 우선순위 순으로 정렬하여 요약해주세요.

우선순위 기준:
1. 응급 상황 가능성
2. 예정된 처치/투약 시간
3. 관찰 필요 빈도

조건:
- 원문의 상태 설명만으로 우선순위 판단
- 추측하지 말 것
- 우선순위 높은 환자부터 나열

각 환자별로:
- 현재 상태
- 주의 사항
- 다음 근무 시 할 일

[간호 메모]
(여기에 메모 내용 붙여넣기)`,
    temperature: 0.15,
  },
  {
    id: 's07-p04',
    title: '야간근무 인수인계 (확장)',
    description: '야간근무용 인수인계 특화 요약',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd03'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 간호 메모를 야간근무자에게 전달할 인수인계 자료로 정리해주세요.

야간근무 특화 항목:
- 수면 상태 관련 사항
- 야간 투약 예정 (시간 명시)
- 야간 관찰 필요 사항
- 응급 대응 준비 사항

조건:
- 원문에 해당 정보가 있는 경우만 기재
- 시간은 정확히 유지
- 없는 내용은 만들어내지 말 것

[간호 메모]
(여기에 메모 내용 붙여넣기)`,
    temperature: 0.1,
  },
  {
    id: 's07-p05',
    title: '인계받은 내용 검토 (심화)',
    description: '인계받은 인수인계 자료에서 누락·불명확한 부분 지적',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01', 's07-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 인수인계 자료를 검토하여, 누락되었거나 불명확한 부분을 지적해주세요.

확인 항목:
□ 현재 활력징후
□ 금일 투약 내역
□ 다음 투약 예정 시간
□ 관찰 필요 증상
□ 낙상/욕창 위험 평가
□ 보호자 상태
□ 다음 근무 시 예정된 처치/검사

[인수인계 자료]
(여기에 인수인계 자료 붙여넣기)

출력 형식:
**명확한 항목**: (✓ 표시)
**누락된 항목**: (명시되지 않은 항목)
**불명확한 항목**: (구체화 필요한 항목)

조건:
- 제공된 자료만 검토
- 추측하지 말 것`,
    temperature: 0.05,
  },
  {
    id: 's07-p06',
    title: '병원 양식 맞춤 (심화)',
    description: '특정 병원 양식에 맞게 인수인계 정리',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01', 's07-dd02'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래 간호 메모를 우리 병원 인수인계 양식에 맞게 정리해주세요.

우리 병원 인수인계 양식:
1. 환자 정보 (이름, 병실, 진단명)
2. 금일 주요 사항 (투약, 처치, 검사)
3. 현재 상태 (활력징후, 증상)
4. 특이사항 (낙상 위험, 알레르기 등)
5. 다음 근무 전달사항 (예정 투약/검사, 관찰 필요 사항)

[간호 메모]
(여기에 메모 내용 붙여넣기)

조건:
- 각 항목별로 명확히 구분
- 활력징후는 최신 측정값만 (원문 그대로)
- 전달사항은 시간 순서대로
- 원문에 없는 내용은 추가하지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's07-p07',
    title: '간단 메모 → 인수인계 변환 (심화)',
    description: '간략한 키워드 메모를 완전한 인수인계 문장으로 확장',
    category: 'nursing',
    suggestedDummyDataIds: ['s07-dd01'],
    systemPrompt: getSystemPromptByCategory('nursing'),
    userPrompt: `아래는 근무 중 간략히 적은 키워드 메모입니다.
이를 다음 근무자에게 전달할 완전한 인수인계 문장으로 확장해주세요.

확장 원칙:
- 키워드를 완전한 문장으로 변환
- 시간 정보가 있으면 명시
- 측정값은 단위와 함께 기록
- "관찰됨", "호소함" 등 객관적 표현 사용
- 원문의 키워드만 사용 (추가 정보 금지)

[간략 메모]
(여기에 키워드 메모 붙여넣기)

출력 형식:
각 환자별로:
- 현재 상태: (완전한 문장)
- 주의 사항: (완전한 문장)
- 다음 할 일: (완전한 문장)`,
    temperature: 0.1,
  },
];
