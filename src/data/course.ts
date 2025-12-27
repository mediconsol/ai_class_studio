import { CourseMeta } from './types';

export const courseMeta: CourseMeta = {
  title: '의료기관 AI 실무 교육',
  description: '의료기관 종사자를 위한 생성형 AI 실무 활용 과정. 판단은 사람이, 정리는 AI가.',
  totalSessions: 20,

  parts: [
    {
      id: 1,
      title: 'Part 1: 이론 - AI 이해와 기초',
      sessionRange: [1, 5],
      type: 'theory',
    },
    {
      id: 2,
      title: 'Part 2: 실습 - 간호 실무 AI 활용',
      sessionRange: [6, 12],
      type: 'practice',
    },
    {
      id: 3,
      title: 'Part 3: 실습 - 행정·트랙 확장',
      sessionRange: [13, 15],
      type: 'practice',
    },
    {
      id: 4,
      title: 'Part 4: 과제 - 병원 적용 프로젝트',
      sessionRange: [16, 20],
      type: 'assignment',
    },
  ],
};

// 세션 ID로 파트 정보 가져오기
export const getPartBySessionId = (sessionId: number) => {
  return courseMeta.parts.find(
    (part) => sessionId >= part.sessionRange[0] && sessionId <= part.sessionRange[1]
  );
};

// 파트별 세션 타입 가져오기
export const getSessionTypeById = (sessionId: number) => {
  const part = getPartBySessionId(sessionId);
  return part?.type ?? 'theory';
};
