import { Exercise } from '../../types';

export const exercises: Exercise[] = [
  {
    step: 1,
    title: 'SOAP 기록 정리 (기본)',
    instruction: '첫 번째 간호 메모를 AI가 SOAP 형식으로 정리하도록 합니다',
    dummyDataId: 's06-dd01',
    promptId: 's06-p01',
    hint: 'AI가 "판단됨"이 아닌 "관찰됨"으로 표현하는지 확인하세요. 주관적 정보(S)와 객관적 정보(O)가 잘 구분되었는지 확인하세요',
  },
  {
    step: 2,
    title: '버전 비교 생성 (심화)',
    instruction: '두 번째 간호 메모를 AI가 간결한 버전과 상세한 버전 두 가지로 정리하도록 합니다',
    dummyDataId: 's06-dd02',
    promptId: 's06-p02',
    hint: '인수인계용으로는 간결한 버전이, 공식 기록용으로는 상세한 버전이 적합합니다. 용도에 맞게 선택하세요',
  },
  {
    step: 3,
    title: '확장 활용 (응용)',
    instruction: '추가 연습용 간호 메모를 사용하여 SOAP 기록 정리를 연습합니다. 필요에 따라 표 형식이나 특정 항목 강조를 시도해보세요',
    dummyDataId: 's06-dd03',
    promptId: 's06-p01',
    hint: 'step 1에서 배운 기본 프롬프트로 시작한 후, 필요에 따라 s06-p03(특정 항목 강조) 또는 s06-p04(표 형식)를 추가로 사용해보세요',
  },
];
