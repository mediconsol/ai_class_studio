import { Worksheet } from '../../types';

export const worksheets: Worksheet[] = [
  {
    id: 's16-ws01',
    title: 'AI 업무 개선 과제 정의서',
    description: '과제의 설계도 - 무엇을, 왜, 어떻게, 어디까지 할 것인지 정의',
    fields: [
      {
        id: 'title',
        label: '1. 과제명',
        type: 'text',
        placeholder: '예: 교대 인수인계 요약 자동화',
        required: true,
      },
      {
        id: 'type',
        label: '2. 과제 유형',
        type: 'select',
        options: ['개인 과제', '부서 과제'],
        required: true,
      },
      {
        id: 'currentWork',
        label: '3. 현재 업무 설명',
        type: 'textarea',
        placeholder: '어떤 상황에서, 어떻게 수행되는가?\n예: 교대 시 담당 환자 10~15명의 기록을 직접 읽고, 핵심 사항을 구두로 전달 (약 20분 소요)',
        required: true,
      },
      {
        id: 'painPoints',
        label: '4. 현재의 불편한 점',
        type: 'textarea',
        placeholder: '시간/반복/누락/감정 등\n예: 환자 많으면 시간 부족, 급하면 누락 발생, 형식이 사람마다 다름',
        required: true,
      },
      {
        id: 'aiIdea',
        label: '5. AI 적용 아이디어',
        type: 'textarea',
        placeholder: 'AI가 어떤 역할을 하는가?\n예: 간호기록 요약을 AI가 자동 생성, ISBAR 구조로 정리',
        required: true,
      },
      {
        id: 'expectedEffect',
        label: '6. 기대 효과',
        type: 'textarea',
        placeholder: '시간/정확성/만족도 등\n예: 인수인계 준비 시간 50% 단축, 누락 방지, 형식 표준화',
        required: true,
      },
      {
        id: 'scope',
        label: '7. 과제 범위',
        type: 'textarea',
        placeholder: '이번에 다룰 것 / 다루지 않을 것\n예:\n✓ 다룰 것: 일반 환자 5명 분량의 인수인계 요약\n✗ 다루지 않을 것: 중환자, 신규 입원, 수술 환자',
        required: true,
      },
    ],
  },
  {
    id: 's16-ws02',
    title: '과제 자가 점검 체크리스트',
    description: '좋은 과제의 5가지 조건을 충족하는지 점검',
    fields: [
      {
        id: 'check1',
        label: '실제 업무다 (가상이 아닌 내 실제 업무)',
        type: 'checklist',
        options: ['예', '아니오'],
      },
      {
        id: 'check2',
        label: '혼자 해볼 수 있다 (다른 부서 협조 불필요)',
        type: 'checklist',
        options: ['예', '아니오'],
      },
      {
        id: 'check3',
        label: '결과물이 남는다 (문서/템플릿/양식 등)',
        type: 'checklist',
        options: ['예', '아니오'],
      },
      {
        id: 'check4',
        label: '바로 적용할 수 있다 (교육 끝나고 바로 사용)',
        type: 'checklist',
        options: ['예', '아니오'],
      },
      {
        id: 'check5',
        label: '범위가 명확하다 ("여기까지만"이 있음)',
        type: 'checklist',
        options: ['예', '아니오'],
      },
    ],
  },
];
