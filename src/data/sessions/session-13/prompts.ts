import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's13-p01',
    title: '민원 응대 문구 (기본)',
    description: '민원 상황별 표준 응대 문구 작성',
    category: 'admin',
    suggestedDummyDataIds: ['s13-dd01', 's13-dd02', 's13-dd03'],
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 민원 상황에 대해 환자 또는 보호자에게 안내할 응대 문구 초안을 작성해주세요.

■ 작성 기준
- 공손하고 차분한 톤
- 감정적인 표현 사용 금지
- 상황을 이해하기 쉽게 설명
- 가능한 대안 제시
- 책임을 회피하거나 전가하는 표현 금지
- "규정이라서", "원래 그렇습니다" 같은 표현 금지

■ 형식
1. 첫인사 (공감 표현)
2. 상황 설명
3. 대안/안내
4. 마무리

조건:
- 제공된 민원 상황 정보만 사용
- 추측이나 일반론 금지
- 병원 정책이나 규정은 언급하지 말 것

[민원 상황]
{{데이터 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's13-p02',
    title: '안내문 작성 (확장)',
    description: '환자용 안내문 자동 생성',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 주제에 맞는 환자용 안내문을 작성해주세요.

■ 안내문 주제: [주제]

■ 포함 내용
- (항목 1)
- (항목 2)
- (항목 3)
- 문의처

■ 조건
- A4 1장 이내
- 큰 글씨, 항목별 정리
- 환자가 읽기 쉽게
- 이모지 사용 가능 (적절히)

조건:
- 제공된 항목 내용만 사용
- 추가 정보나 일반론 금지`,
    temperature: 0.15,
  },
  {
    id: 's13-p03',
    title: 'FAQ 정리 (확장)',
    description: '자주 묻는 질문 표준 답변집 작성',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `병원 [부서명]에서 자주 받는 질문 10가지와 각 질문에 대한 표준 답변을 작성해주세요.

■ 형식
Q: 질문
A: 답변 (3줄 이내)

■ 조건
- 실제 병원에서 자주 받는 질문으로
- 답변은 명확하고 간결하게
- 추가 안내가 필요한 경우 문의처 안내

조건:
- 일반적인 병원 업무 기준만 사용
- 특정 병원의 정책 만들지 말 것`,
    temperature: 0.2,
  },
  {
    id: 's13-p04',
    title: '톤 비교 (확장)',
    description: '간결한 버전과 상세한 버전 비교',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `위 응대 문구를 두 가지 버전으로 작성해주세요.

1) 간결한 버전 (핵심만, 3~4문장)
2) 상세한 버전 (충분히 설명, 6~8문장)

각 버전의 사용 상황도 설명해주세요.

조건:
- 위 응대 문구의 내용만 사용
- 추가 정보나 해석 금지`,
    temperature: 0.15,
  },
  {
    id: 's13-p05',
    title: '문자/카카오톡 버전 (심화)',
    description: '응대 문구를 문자/카카오톡용으로 변환',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 응대 문구를 문자 또는 카카오톡으로 보낼 수 있는 형태로 바꿔주세요.

■ 조건
- 100자 이내
- 핵심 내용만
- 링크 추가 가능 (예: 홈페이지 안내)
- 이모지 사용 가능

조건:
- 원본 응대 문구의 내용만 사용
- 추가 정보 금지

[원본 응대 문구]
{{문구 붙여넣기}}`,
    temperature: 0.2,
  },
  {
    id: 's13-p06',
    title: '상황별 응대 문구 세트 (심화)',
    description: '민원 유형별 표준 응대 문구 일괄 작성',
    category: 'admin',
    suggestedDummyDataIds: ['s13-dd01', 's13-dd02', 's13-dd03', 's13-dd04', 's13-dd05'],
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `아래 민원 유형별로 표준 응대 문구를 각각 작성해주세요.

■ 민원 유형
1. 대기시간 불만
2. 비용 관련 문의
3. 서류 발급 문의
4. 예약 변경 문의
5. 보험 적용 문의

■ 형식 (각 유형별)
- 상황 요약 (1줄)
- 응대 문구 (4~5문장)
- 주의사항 (1줄)

조건:
- 일반적인 병원 업무 기준만 사용
- 특정 병원의 정책이나 규정 만들지 말 것`,
    temperature: 0.2,
  },
  {
    id: 's13-p07',
    title: '민원 예방 안내문 (심화)',
    description: '사전 안내를 통한 민원 예방',
    category: 'admin',
    systemPrompt: getSystemPromptByCategory('admin'),
    userPrompt: `자주 발생하는 민원을 예방하기 위한 사전 안내문을 작성해주세요.

■ 민원 유형: [유형]
■ 목적: 민원 발생 전에 미리 안내하여 문의 감소

■ 조건
- 환자가 먼저 읽고 이해할 수 있게
- 질문이 생기기 전에 답을 제공
- A4 1장 이내

조건:
- 일반적인 병원 안내 기준만 사용
- 추측이나 일반론 금지`,
    temperature: 0.2,
  },
];
