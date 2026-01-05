import { PromptTemplate } from '../../types';
import { getSystemPromptByCategory } from '../../shared/systemPrompts';

// 2차시: 생성형 AI를 업무 도우미로 쓰는 법
// 프롬프트 작성법 시연

export const prompts: PromptTemplate[] = [
  {
    id: 's02-demo1',
    title: '[시연] 나쁜 프롬프트 vs 좋은 프롬프트',
    description: '프롬프트 품질에 따른 결과 차이',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `정리해줘

환자 70대 남자 폐렴 열남 항생제 투여중

** 이것은 "나쁜 프롬프트" 예시입니다. 불명확한 요청으로 인해 AI가 어떻게 응답하는지 시연용입니다.`,
    temperature: 0.2,
  },
  {
    id: 's02-demo2',
    title: '[시연] 좋은 프롬프트로 다시',
    description: '구조화된 프롬프트의 결과',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 환자 정보를 인수인계용 간호기록 형식으로 정리해주세요.

[형식]
- 환자 기본정보 (나이/성별/진단명)
- 현재 상태
- 투약 현황
- 주의 사항

[환자 정보]
70대 남자, 폐렴, 발열 있음, 항생제 투여 중

**원문에 있는 정보만 사용하세요. 추가 정보나 추측은 절대 포함하지 마세요.**`,
    temperature: 0.1,
  },
  {
    id: 's02-basic',
    title: '기본 프롬프트 구조',
    description: '역할+대상+형식+주의사항 포함 기본 템플릿',
    category: 'general',
    systemPrompt: getSystemPromptByCategory('general'),
    userPrompt: `아래 회의 내용을 업무 지시사항 형식으로 정리해주세요.

주의사항:
- 각 항목마다 담당자와 기한을 명시할 것
- 원문에 없는 내용은 추가하지 말 것

[내용]
오늘 간호부 회의에서 다음 사항들이 논의되었습니다. 김 간호사님은 다음 주까지
낙상 예방 교육 자료를 준비해주시고, 이 팀장님은 이번 주 금요일까지 야간 근무
일정표를 확정해서 공유해주세요. 그리고 박 선생님은 월말까지 환자 만족도 조사
결과를 분석해서 보고서로 작성 부탁드립니다.`,
    temperature: 0.2,
  },
  {
    id: 's02-simplify',
    title: '[시연] 쉽게 풀어쓰기',
    description: '전문 용어를 쉽게 변환',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용을 환자도 이해할 수 있게 쉬운 말로 풀어서 설명해주세요.

조건:
- 전문 용어는 피하고, 일상적인 표현 사용
- 원문의 중요한 수치와 시간 정보는 그대로 유지
- 추가 설명이나 조언은 하지 말 것

[내용]
당뇨병 환자의 경우 저혈당 증상(혈당 70mg/dL 미만) 발생 시
즉시 속효성 탄수화물 15-20g을 섭취하고 15분 후 재측정해야 합니다.
지속적인 저혈당 시 글루카곤 투여를 고려할 수 있습니다.`,
    temperature: 0.1,
  },
  {
    id: 's02-summarize',
    title: '[시연] 요약하기',
    description: '긴 내용을 핵심만 요약',
    category: 'demo',
    systemPrompt: getSystemPromptByCategory('demo'),
    userPrompt: `아래 내용을 3줄 이내로 핵심만 요약해주세요.

조건:
- 가장 중요한 정보만 남기고 불필요한 내용 제외
- 시간, 장소, 수치 등 객관적 사실은 정확히 유지
- 추측이나 해석은 절대 포함하지 말 것

[내용]
오늘 오전 9시경 301호 환자분이 낙상하셨습니다. 침대에서 화장실로 이동하시다가
미끄러지셨고, 바닥에 엉덩이를 부딪히셨습니다. 환자분은 즉시 호출벨을 누르셨고,
담당 간호사가 3분 내 도착하여 상태를 확인했습니다. 의식 명료하고, 통증 호소는
경미한 수준(NRS 3점)이었습니다. 활력징후는 정상 범위였고, 당직 의사에게 보고 후
경과 관찰하기로 했습니다. 보호자에게 전화로 상황을 설명드렸고, 낙상 보고서를
작성하여 제출했습니다.`,
    temperature: 0.1,
  },
];
