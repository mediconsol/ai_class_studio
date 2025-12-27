import { DummyData } from '../../types';

export const dummyData: DummyData[] = [
  {
    id: 's06-dd01',
    title: '간호 메모 - 예제데이터 ① 기본',
    description: '80대 남성 환자 기본 간호 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `[간호 메모]

환자: 김OO (80대, 남)
밤에 잠 거의 못 잠
허리 통증 계속 호소함
혈압 160/95
식사량 절반 이하
보행 시 불안정`,
  },
  {
    id: 's06-dd02',
    title: '간호 메모 - 예제데이터 ② 심화',
    description: '70대 여성 환자 복합 증상 간호 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `[간호 메모]

환자: 이OO (70대, 여)
아침에 어지러움 호소
식사 중 오심 표현
혈당 210
낙상 위험 있어 보임
보호자 불안해함`,
  },
  {
    id: 's06-dd03',
    title: '간호 메모 - 예제데이터 ③ 추가 연습용',
    description: '60대 남성 환자 호흡기 증상 간호 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `[간호 메모]

환자: 박OO (60대, 남)
기침 지속됨
가래 있음
산소포화도 92%
호흡 시 불편감 표현
산소 2L 유지 중
체온 37.8도`,
  },
  {
    id: 's06-dd04',
    title: '간호 메모 - 예제데이터 ④ 추가 연습용',
    description: '50대 여성 환자 수술 후 상태 간호 메모',
    category: 'nursing',
    format: 'text',
    isRaw: true,
    content: `[간호 메모]

환자: 최OO (50대, 여)
수술 후 2일차
통증 호소 (NRS 6점)
수술 부위 드레싱 깨끗함
보행 시작함 (워커 사용)
식사 시작 (미음)
배뇨 정상`,
  },
  {
    id: 's06-dd05',
    title: '예제데이터 세트 (JSON 형식)',
    description: 'JSON 형식의 간호 메모 데이터 세트',
    category: 'patient',
    format: 'json',
    isRaw: true,
    content: `{
  "nursing_memos": [
    {
      "id": 1,
      "patient": "김OO",
      "age": "80대",
      "gender": "남",
      "memo": [
        "밤에 잠 거의 못 잠",
        "허리 통증 계속 호소함",
        "혈압 160/95",
        "식사량 절반 이하",
        "보행 시 불안정"
      ],
      "difficulty": "기본"
    },
    {
      "id": 2,
      "patient": "이OO",
      "age": "70대",
      "gender": "여",
      "memo": [
        "아침에 어지러움 호소",
        "식사 중 오심 표현",
        "혈당 210",
        "낙상 위험 있어 보임",
        "보호자 불안해함"
      ],
      "difficulty": "심화"
    },
    {
      "id": 3,
      "patient": "박OO",
      "age": "60대",
      "gender": "남",
      "memo": [
        "기침 지속됨",
        "가래 있음",
        "산소포화도 92%",
        "호흡 시 불편감 표현",
        "산소 2L 유지 중",
        "체온 37.8도"
      ],
      "difficulty": "심화"
    },
    {
      "id": 4,
      "patient": "최OO",
      "age": "50대",
      "gender": "여",
      "memo": [
        "수술 후 2일차",
        "통증 호소 (NRS 6점)",
        "수술 부위 드레싱 깨끗함",
        "보행 시작함 (워커 사용)",
        "식사 시작 (미음)",
        "배뇨 정상"
      ],
      "difficulty": "심화"
    }
  ]
}`,
  },
  {
    id: 's06-dd06',
    title: '예제데이터 세트 (CSV 형식)',
    description: 'CSV 형식의 간호 메모 데이터 세트',
    category: 'patient',
    format: 'text',
    isRaw: true,
    content: `환자,나이,성별,메모,난이도
김OO,80대,남,"밤에 잠 거의 못 잠 / 허리 통증 계속 호소 / 혈압 160/95 / 식사량 절반 이하 / 보행 시 불안정",기본
이OO,70대,여,"아침에 어지러움 호소 / 식사 중 오심 표현 / 혈당 210 / 낙상 위험 있어 보임 / 보호자 불안해함",심화
박OO,60대,남,"기침 지속 / 가래 있음 / 산소포화도 92% / 호흡 불편감 / 산소 2L 유지 / 체온 37.8도",심화
최OO,50대,여,"수술 후 2일차 / 통증 NRS 6점 / 드레싱 깨끗함 / 워커 보행 / 미음 식사 / 배뇨 정상",심화`,
  },
];
