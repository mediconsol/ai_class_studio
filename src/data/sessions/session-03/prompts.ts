import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

// 3차시: 의료 문서 자동화의 시작
// 문서 변환 시연

export const prompts: PromptTemplate[] = [
  {
    id: 's03-demo1',
    title: '[시연] 환자 안내문 변환',
    description: '전문 내용을 환자용으로 변환',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 의료 정보를 환자도 쉽게 이해할 수 있는 안내문으로 바꿔주세요.

조건:
- 전문 용어는 일상 표현으로 변경
- 5줄 이내로 간결하게
- 주의사항은 따로 표시
- 원문의 수치와 시간 정보는 정확히 유지

[원본 내용]
제2형 당뇨병 환자에서 경구혈당강하제 복용 중 저혈당 예방을 위해
규칙적인 식사가 필요하며, 특히 식사 지연 시 저혈당 위험이 증가합니다.
저혈당 증상(발한, 진전, 두근거림, 어지러움) 발생 시
속효성 탄수화물(포도당, 주스 등) 섭취 후 15분 후 혈당 재측정이 권장됩니다.`,
    temperature: 0.1,
  },
  {
    id: 's03-demo2',
    title: '[시연] 메모 → 보고서 변환',
    description: '간단한 메모를 정식 보고서로',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용을 다음 구조의 보고서로 정리해주세요.

[구조]
1. 제목
2. 배경
3. 현황
4. 제안

조건:
- 메모에 있는 정보만 사용
- 추측이나 해석 금지
- 수치와 사실은 정확히 유지

[메모 내용]
낙상사고 많음. 화장실 이동시 특히. 지난달 5건. 야간에 3건.
센서매트 도입 검토중. 비용문제. 시범도입 제안.`,
    temperature: 0.2,
  },
  {
    id: 's03-demo3',
    title: '[시연] 다중 버전 생성',
    description: '하나의 내용을 세 가지 버전으로',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용을 세 가지 버전으로 만들어주세요.

1) 환자용 (쉽고 친절하게)
2) 보호자용 (주의사항 포함)
3) 직원용 (간결한 핵심만)

조건:
- 각 버전은 대상에 맞는 톤과 상세도 조절
- 원문의 중요 정보는 모든 버전에 포함
- 추가 정보나 일반론은 포함하지 말 것

[원본 내용]
대장내시경 검사 전 장정결이 필요합니다.
검사 전일 저녁부터 금식하고, 장정결제를 복용해야 합니다.
복용 방법은 제품에 따라 다르며, 충분한 수분 섭취가 중요합니다.
검사 당일에는 보호자 동반이 필요하며, 검사 후 운전은 삼가야 합니다.`,
    temperature: 0.2,
  },
  {
    id: 's03-convert',
    title: '환자용 안내문 변환 템플릿',
    description: '직접 사용할 수 있는 템플릿',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 의료 정보를 환자도 쉽게 이해할 수 있는 안내문으로 바꿔주세요.

조건:
- 전문 용어는 일상 표현으로 변경
- 5줄 이내로 간결하게
- 주의사항은 따로 표시
- 원문에 없는 내용은 추가하지 말 것

[원본 내용]
(여기에 내용 입력)`,
    temperature: 0.1,
  },
];
