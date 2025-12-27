import { PromptTemplate } from '../../types';

export const prompts: PromptTemplate[] = [
  {
    id: 's06-soap',
    title: 'SOAP 간호기록 정리',
    description: '거친 간호 메모를 SOAP 형식의 기록용 문장으로 정리합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02', 's06-dd03'],
    prompt: `당신은 병원 간호기록을 보조하는 역할입니다.
아래 간호 메모를 SOAP 형식의 간호기록 문장으로 정리해주세요.

- 판단이나 진단은 추가하지 말고,
- 간호사가 관찰한 내용만 정리하세요.
- 간결하고 기록용 문장으로 작성해주세요.

[간호 메모]
{{데이터 붙여넣기}}`,
  },
  {
    id: 's06-compare',
    title: '버전 비교 (간결/상세)',
    description: '같은 내용을 간결한 버전과 상세한 버전으로 비교합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd02'],
    prompt: `당신은 병원 간호기록을 보조하는 역할입니다.
아래 간호 메모를 SOAP 형식으로 정리하되,
두 가지 버전으로 작성해주세요.

1) 간결한 버전 - 인수인계용 (핵심만)
2) 상세한 버전 - 공식 기록용 (상세 설명 포함)

[간호 메모]
{{데이터 붙여넣기}}`,
  },
  {
    id: 's06-focus',
    title: '집중 영역 지정',
    description: '특정 영역(통증, 활력징후 등)에 집중하여 기록합니다',
    category: 'nursing',
    suggestedDummyDataIds: ['s06-dd01', 's06-dd03'],
    prompt: `당신은 병원 간호기록을 보조하는 역할입니다.
아래 간호 메모를 SOAP 형식으로 정리하되,
특히 {{focus}} 관련 내용에 집중해서 작성해주세요.

해당 영역의 변화나 특이사항을 중심으로 정리하세요.

[간호 메모]
{{데이터 붙여넣기}}

집중 영역: {{focus}}`,
  },
];
