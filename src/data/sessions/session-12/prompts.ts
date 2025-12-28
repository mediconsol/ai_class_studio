import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

export const prompts: PromptTemplate[] = [
  {
    id: 's12-p01',
    title: '교육자료 변환 (기본)',
    description: 'SOP를 신규 간호사용 교육자료로 변환',
    category: 'education',
    suggestedDummyDataIds: ['s12-dd01', 's12-dd02', 's12-dd03'],
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `아래 SOP 내용을 바탕으로 신규 간호사를 위한 교육자료 초안을 작성해주세요.

■ 작성 기준
- 교육용 말투 사용 ("~합니다", "~하세요")
- 왜 중요한지 간단한 설명 포함
- 주의할 점을 강조
- 실수하기 쉬운 부분 언급
- 분량은 A4 1장 이내

■ 구성
1. 왜 이 업무가 중요한가
2. 어떻게 하는가 (절차)
3. 주의할 점
4. 자주 하는 실수

조건:
- 원본 SOP에 있는 내용만 사용
- 추측이나 일반론 금지
- 절차와 기준은 정확히 유지

[SOP 내용]
{{데이터 붙여넣기}}`,
    temperature: 0.1,
  },
  {
    id: 's12-p02',
    title: '자가 체크리스트 (확장)',
    description: '신규 간호사용 자가 확인 체크리스트 제작',
    category: 'education',
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `위 교육자료를 바탕으로 신규 간호사가 스스로 확인할 수 있는 '[업무명] 자가 체크리스트'를 만들어주세요.

■ 형식
□ [확인 항목]
  ↳ 세부 확인 내용 (필요시)

■ 조건
- 10개 항목 이내
- 예/아니오로 답할 수 있는 형태
- 수행 전/중/후로 구분
- 프리셉터 확인란 포함

조건:
- 위 교육자료에 있는 내용만 체크리스트화
- 추가 항목 만들지 말 것`,
    temperature: 0.1,
  },
  {
    id: 's12-p03',
    title: '교육 확인 퀴즈 (확장)',
    description: '교육 이해도 확인용 퀴즈 생성',
    category: 'education',
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `위 교육자료를 바탕으로 신규 간호사 교육 확인용 퀴즈 10문항을 만들어주세요.

■ 형식
- O/X 문제 5개
- 객관식 문제 3개 (4지선다)
- 단답형 문제 2개

■ 조건
- 정답과 간단한 해설 포함
- 실제 업무와 연관된 상황 문제로
- 난이도: 쉬움~보통

조건:
- 교육자료에 있는 내용만 출제
- 추측이나 일반론 금지`,
    temperature: 0.15,
  },
  {
    id: 's12-p04',
    title: '포켓 요약 카드 (확장)',
    description: '휴대용 핵심 요약 카드 제작',
    category: 'education',
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `위 교육 내용을 바탕으로 신규 간호사가 포켓에 넣고 다닐 수 있는 '[업무명] 핵심 요약 카드'를 만들어주세요.

■ 조건
- 명함 크기 (앞뒤 양면)
- 앞면: 핵심 절차 (번호로)
- 뒷면: 주의사항/이상 기준
- 최대한 간결하게

조건:
- 위 교육자료의 핵심만 추출
- 추가 내용 금지`,
    temperature: 0.1,
  },
  {
    id: 's12-p05',
    title: '대상별 교육자료 (심화)',
    description: '대상별로 다른 교육자료 제작',
    category: 'education',
    suggestedDummyDataIds: ['s12-dd01', 's12-dd02', 's12-dd03'],
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `아래 SOP를 바탕으로 다음 대상별로 교육자료를 다르게 작성해주세요:

1. 신규 간호사용 (상세 설명)
2. 경력 간호사 전입용 (요약 + 차이점 강조)
3. 간호조무사용 (역할 범위 명확화)

조건:
- 원본 SOP의 내용만 사용
- 각 대상에게 필요한 정보만 포함
- 역할 범위는 일반적 기준만 언급

[SOP 내용]
{{데이터 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's12-p06',
    title: '프리셉터 교육 가이드 (심화)',
    description: '프리셉터용 교육 지침서 제작',
    category: 'education',
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `아래 교육자료를 바탕으로 프리셉터가 신규 간호사를 가르칠 때 사용할 '프리셉터 교육 가이드'를 만들어주세요.

■ 포함 내용
- 교육 순서 (무엇을 먼저 가르칠지)
- 각 단계별 예상 소요 시간
- 확인 질문 (신규에게 물어볼 것)
- 흔한 질문과 답변 예시

조건:
- 교육자료에 있는 내용만 사용
- 교육 순서는 교육자료의 구조 따름
- 추측이나 일반론 금지

[교육자료]
{{데이터 붙여넣기}}`,
    temperature: 0.15,
  },
  {
    id: 's12-p07',
    title: '교육 일정표 (심화)',
    description: '신규 간호사 오리엔테이션 일정표 작성',
    category: 'education',
    systemPrompt: getSystemPromptByCategory('education'),
    userPrompt: `아래 교육 항목들을 바탕으로 신규 간호사 1주차 오리엔테이션 일정표를 만들어주세요.

■ 조건
- 1일 8시간 기준
- 이론 교육과 실습 교육 구분
- 각 항목별 예상 시간 배정
- 평가 시점 포함

■ 교육 항목
1. 활력징후 측정
2. 체위 변경
3. 경구 투약
4. 낙상 예방
5. 감염관리 기본

조건:
- 일반적인 교육 시간 배분 기준만 적용
- 특정 병원의 일정 만들지 말 것`,
    temperature: 0.2,
  },
];
