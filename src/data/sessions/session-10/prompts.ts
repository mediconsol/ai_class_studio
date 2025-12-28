import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's10-p01',
    title: '교육자료 생성 (기본)',
    description: '감염관리 지침을 신규 직원 교육용으로 변환',
    category: 'infection',
    suggestedDummyDataIds: ['s10-dd01'],
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `아래 감염관리 기본 지침을 바탕으로 신규 직원 교육용 자료 초안을 작성해주세요.

■ 작성 기준
- 어려운 표현은 쉬운 말로 바꿀 것
- 항목별로 정리할 것
- 교육용 문체로 작성할 것 ("~합니다", "~하세요")
- 왜 중요한지 간단한 설명 포함
- 분량은 A4 1장 이내

조건:
- 원문 지침의 내용만 사용
- 의학적 진단이나 판단 금지
- 추가 정보나 일반론 금지

[감염관리 지침]
{{데이터 붙여넣기}}`,
    temperature: 0.1,
  },
  {
    id: 's10-p02',
    title: '게시용 요약 (확장)',
    description: '교육자료를 병동 게시용으로 간략화',
    category: 'infection',
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `위 교육자료를 병동 게시용 '감염관리 핵심 수칙 5가지'로 아주 간단하게 요약해주세요.

■ 조건
- 5개 항목
- 각 항목 1줄 이내
- 누구나 한눈에 이해할 수 있게
- 게시판에 붙일 수 있는 형식

조건:
- 위 교육자료에 있는 내용만 요약
- 추가 내용 금지`,
    temperature: 0.1,
  },
  {
    id: 's10-p03',
    title: '체크리스트 변환 (확장)',
    description: '지침을 일일 점검 체크리스트로 변환',
    category: 'infection',
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `위 감염관리 지침을 바탕으로 '일일 감염관리 점검 체크리스트'를 만들어주세요.

■ 형식
□ [점검 항목] - [확인 내용]

■ 조건
- 10개 항목 이내
- 매일 확인 가능한 항목만
- 예/아니오로 답할 수 있는 형태

조건:
- 지침에 있는 내용만 사용
- 추가 항목 만들지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's10-p04',
    title: '대상별 버전 (확장)',
    description: '환자용, 보호자용 안내문 작성',
    category: 'infection',
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `위 감염관리 내용을 다음 대상별로 다르게 작성해주세요:

1. 환자용 안내문 (입원 시 배포)
2. 보호자용 안내문 (면회 시 안내)

■ 조건
- 각각 5줄 이내
- 친절하고 쉬운 말로
- 협조를 부탁하는 톤

조건:
- 원문에 있는 내용만 대상별로 변환
- 추가 정보나 권고 금지`,
    temperature: 0.15,
  },
  {
    id: 's10-p05',
    title: '부서별 맞춤 버전 (심화)',
    description: '수술실, 외래, 중환자실 등 부서별 맞춤화',
    category: 'infection',
    suggestedDummyDataIds: ['s10-dd01'],
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `아래 감염관리 기본 지침을 다음 부서별로 맞춤화해주세요:

1. 수술실용 (수술 관련 추가 주의사항 포함)
2. 외래용 (외래 환자 특성 반영)
3. 중환자실용 (고위험 환자 관리 강조)

각 버전별 핵심 포인트 5가지씩 정리해주세요.

조건:
- 기본 지침의 내용을 부서별로 재구성만 할 것
- 지침에 없는 내용은 추가하지 말 것

[감염관리 지침]
{{데이터 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's10-p06',
    title: '퀴즈 형식 변환 (심화)',
    description: '교육자료를 직원 교육용 퀴즈로 변환',
    category: 'infection',
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `아래 감염관리 교육자료를 바탕으로 직원 교육용 퀴즈 10문항을 만들어주세요.

■ 형식
- O/X 문제 5개
- 객관식 문제 3개 (4지선다)
- 단답형 문제 2개

■ 조건
- 정답과 해설 포함
- 실제 업무와 연관된 상황 문제로

조건:
- 교육자료에 있는 내용만 출제
- 추측이나 일반론 금지

[교육자료]
{{데이터 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's10-p07',
    title: '월별 캠페인 문구 (심화)',
    description: '연간 감염관리 캠페인 월별 슬로건 생성',
    category: 'infection',
    systemPrompt: getSystemPromptByCategory('infection'),
    userPrompt: `감염관리 연간 캠페인을 위해 월별 슬로건과 핵심 메시지를 만들어주세요.

■ 형식
- 월: [슬로건] - [핵심 메시지 1줄]

■ 주제 배분
- 1~3월: 손 위생
- 4~6월: 보호구 착용
- 7~9월: 환경 관리
- 10~12월: 종합 복습

조건:
- 각 월별로 짧고 기억하기 쉬운 문구로 작성
- 일반적인 감염관리 원칙 범위 내에서만`,
    temperature: 0.2,
  },
];
