import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

// 4차시: AI 활용의 윤리와 보안
// 개인정보 보호 시연

export const prompts: PromptTemplate[] = [
  {
    id: 's04-demo1',
    title: '[시연] 개인정보 포함 여부 확인',
    description: '개인정보가 포함된 데이터 확인',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용에서 개인을 식별할 수 있는 정보가 있는지 확인해주세요.

확인 항목:
- 이름 (실명)
- 주민등록번호
- 연락처
- 주소
- 진단명 + 식별정보 조합

[확인할 내용]
홍길동 환자(620315-1234567)가 2024년 1월 15일 외래 방문하였습니다.
주소지는 서울시 강남구 역삼동 123-45이며, 연락처는 010-1234-5678입니다.
당뇨병 진단을 받고 메트포르민 500mg을 처방받았습니다.`,
    temperature: 0.1,
  },
  {
    id: 's04-demo2',
    title: '[시연] 비식별화 처리',
    description: '개인정보를 비식별화',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용에서 개인을 식별할 수 있는 정보를 비식별화 처리해주세요.

처리 방법:
- 이름 → "OOO" 또는 "김OO"
- 나이 → "00대" (예: 70대)
- 구체적 날짜 → "2024년 0월"
- 병원명 → "A병원"
- 주민번호 → 삭제
- 연락처 → 삭제
- 주소 → "서울시 OO구"

조건:
- 반드시 위 규칙대로만 변환
- 진단명과 투약 정보는 그대로 유지
- 추가 변경이나 해석 금지

[원본 내용]
홍길동 환자(620315-1234567)가 2024년 1월 15일 외래 방문하였습니다.
주소지는 서울시 강남구 역삼동 123-45이며, 연락처는 010-1234-5678입니다.
당뇨병 진단을 받고 메트포르민 500mg을 처방받았습니다.`,
    temperature: 0.05,
  },
  {
    id: 's04-demo3',
    title: '[시연] AI가 잘못된 정보를 줄 때',
    description: 'AI 결과물 검증의 중요성',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `다음 약물의 용량과 투여 방법을 알려주세요.

약물명: 픽토랄리맙 (Fictoralizumab)

참고: 이 약물에 대한 최신 임상 가이드라인을 기반으로 답변해주세요.

** 이것은 존재하지 않는 가상의 약물입니다. AI가 정보를 모를 때 어떻게 반응하는지 시연하기 위한 것입니다.`,
    temperature: 0.1,
  },
  {
    id: 's04-check',
    title: '개인정보 점검 템플릿',
    description: '직접 사용할 수 있는 템플릿',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 내용에서 개인을 식별할 수 있는 정보가 있는지 확인해주세요.

확인 항목:
- 이름 (실명)
- 주민등록번호
- 연락처
- 주소
- 진단명 + 식별정보 조합

[확인할 내용]
(여기에 내용 입력)`,
    temperature: 0.1,
  },
  {
    id: 's04-anonymize',
    title: '비식별화 요청 템플릿',
    description: '직접 사용할 수 있는 템플릿',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 내용에서 개인을 식별할 수 있는 정보를 비식별화 처리해주세요.

처리 방법:
- 이름 → "OOO" 또는 "김OO"
- 나이 → "00대" (예: 70대)
- 구체적 날짜 → "2024년 0월"
- 병원명 → "A병원"
- 주민번호/연락처 → 삭제

[원본 내용]
(여기에 내용 입력)`,
    temperature: 0.05,
  },
];
