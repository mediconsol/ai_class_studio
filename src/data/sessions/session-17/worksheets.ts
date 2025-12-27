import { Worksheet } from '../../types';

export const worksheets: Worksheet[] = [
  {
    id: 's17-ws01',
    title: 'AI 업무 개선 설계서',
    description: 'AI 적용 전/후 비교 및 개선안 설계',
    fields: [
      {
        id: 'writer',
        label: '작성자',
        type: 'text',
        placeholder: '이름',
        required: true,
      },
      {
        id: 'department',
        label: '직무/부서',
        type: 'text',
        placeholder: '예: 병동 간호사',
        required: true,
      },
      {
        id: 'title',
        label: '1. 과제명',
        type: 'text',
        placeholder: '16차시에서 정의한 과제명',
        required: true,
      },
      {
        id: 'asIsProcess',
        label: '2. AI 적용 전 업무 흐름 (단계별)',
        type: 'textarea',
        placeholder: `예:
1) 담당 환자 10~15명 간호기록 직접 읽기 (10분)
2) 핵심 내용 머릿속으로 정리 (3분)
3) 다음 근무자에게 구두로 전달 (5분)
4) 누락 시 재확인 (2분)`,
        required: true,
      },
      {
        id: 'asIsTime',
        label: '3. AI 적용 전 총 소요 시간',
        type: 'text',
        placeholder: '예: 약 20분',
        required: true,
      },
      {
        id: 'asIsResult',
        label: '4. AI 적용 전 결과물 형태',
        type: 'text',
        placeholder: '예: 구두 전달 (문서 없음)',
        required: true,
      },
      {
        id: 'asIsProblems',
        label: '5. 현재 문제점',
        type: 'textarea',
        placeholder: `예:
- 시간 부족 시 급하게 전달 → 누락 발생
- 형식이 사람마다 달라서 전달받는 사람 혼란
- 중요도 판단이 사람마다 다름`,
        required: true,
      },
      {
        id: 'toBeProcess',
        label: '6. AI 적용 후 업무 흐름 (단계별)',
        type: 'textarea',
        placeholder: `예:
1) 간호기록 복사 (2분)
2) AI에 입력 → 요약 생성 (1분)
3) 요약 결과 확인/수정 (3분)
4) 템플릿 기반 전달 (4분)`,
        required: true,
      },
      {
        id: 'toBeTime',
        label: '7. AI 적용 후 예상 소요 시간',
        type: 'text',
        placeholder: '예: 약 10분',
        required: true,
      },
      {
        id: 'toBeResult',
        label: '8. AI 적용 후 결과물 형태',
        type: 'text',
        placeholder: '예: 문서 템플릿 (인쇄/화면 공유 가능)',
        required: true,
      },
      {
        id: 'humanRole',
        label: '9. 사람 역할',
        type: 'textarea',
        placeholder: '예: 기록 복사, 요약 확인/수정, 최종 전달',
        required: true,
      },
      {
        id: 'aiRole',
        label: '10. AI 역할',
        type: 'textarea',
        placeholder: '예: 간호기록 → 인수인계 요약 생성',
        required: true,
      },
      {
        id: 'expectedEffect',
        label: '11. 기대 효과',
        type: 'textarea',
        placeholder: `예:
- 시간: 20분 → 10분 (50% 단축)
- 품질: 누락 감소 (형식화로 빠짐 방지)
- 일관성: 형식 통일 (누가 해도 같은 형태)`,
        required: true,
      },
      {
        id: 'deliverableType',
        label: '12. 예상 결과물 유형',
        type: 'select',
        options: ['문서', '템플릿', '양식', '기타'],
        required: true,
      },
      {
        id: 'deliverableDesc',
        label: '13. 예상 결과물 설명',
        type: 'textarea',
        placeholder: `예:
- 인수인계 요약 템플릿 1종
- 환자별 요약 형식 (현재상태/주의사항/확인사항)
- AI 프롬프트 1종`,
        required: true,
      },
      {
        id: 'sampleData',
        label: '14. 필요한 샘플 데이터',
        type: 'textarea',
        placeholder: '예: 환자 5명 간호기록 예시 (가명 처리)',
        required: false,
      },
    ],
  },
  {
    id: 's17-ws02',
    title: '전/후 비교표',
    description: 'AI 적용 전/후 핵심 변화 정리',
    fields: [
      {
        id: 'taskName',
        label: '과제명',
        type: 'text',
        placeholder: '과제명 입력',
        required: true,
      },
      {
        id: 'workflowBefore',
        label: '업무 흐름 (AI 적용 전)',
        type: 'text',
        placeholder: '예: 읽기→정리→전달→재확인',
        required: true,
      },
      {
        id: 'workflowAfter',
        label: '업무 흐름 (AI 적용 후)',
        type: 'text',
        placeholder: '예: 복사→AI→확인→전달',
        required: true,
      },
      {
        id: 'timeBefore',
        label: '소요 시간 (AI 적용 전)',
        type: 'text',
        placeholder: '예: 약 20분',
        required: true,
      },
      {
        id: 'timeAfter',
        label: '소요 시간 (AI 적용 후)',
        type: 'text',
        placeholder: '예: 약 10분',
        required: true,
      },
      {
        id: 'resultBefore',
        label: '결과물 형태 (AI 적용 전)',
        type: 'text',
        placeholder: '예: 구두 전달',
        required: true,
      },
      {
        id: 'resultAfter',
        label: '결과물 형태 (AI 적용 후)',
        type: 'text',
        placeholder: '예: 문서 템플릿',
        required: true,
      },
      {
        id: 'humanRoleBefore',
        label: '사람 역할 (AI 적용 전)',
        type: 'text',
        placeholder: '예: 전 과정 직접 수행',
        required: true,
      },
      {
        id: 'humanRoleAfter',
        label: '사람 역할 (AI 적용 후)',
        type: 'text',
        placeholder: '예: 확인/수정/전달',
        required: true,
      },
      {
        id: 'aiRoleAfter',
        label: 'AI 역할 (AI 적용 후)',
        type: 'text',
        placeholder: '예: 요약 생성',
        required: true,
      },
      {
        id: 'keySummary',
        label: '핵심 변화 요약',
        type: 'textarea',
        placeholder: `예:
1. 시간: 20분 → 10분 (50% 단축)
2. 결과물: 구두 → 문서
3. 사람 역할: 전 과정 → 확인/전달만`,
        required: true,
      },
    ],
  },
];
