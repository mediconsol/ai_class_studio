import { Session, SessionSummary } from '../types';
import { session01 } from './session-01';
import { session02 } from './session-02';
import { session03 } from './session-03';
import { session04 } from './session-04';
import { session05 } from './session-05';
import { session06 } from './session-06';
import { session07 } from './session-07';
import { session08 } from './session-08';
import { session09 } from './session-09';
import { session10 } from './session-10';
import { session11 } from './session-11';
import { session12 } from './session-12';
import { session13 } from './session-13';
import { session14 } from './session-14';
import { session15 } from './session-15';
import { session16 } from './session-16';
import { session17 } from './session-17';
import { session18 } from './session-18';
import { session19 } from './session-19';
import { session20 } from './session-20';

// 전체 20개 세션
const implementedSessions: Session[] = [
  session01,
  session02,
  session03,
  session04,
  session05,
  session06,
  session07,
  session08,
  session09,
  session10,
  session11,
  session12,
  session13,
  session14,
  session15,
  session16,
  session17,
  session18,
  session19,
  session20,
];

// Export functions
export const getSession = (id: number): Session | undefined => {
  return implementedSessions.find(session => session.id === id);
};

export const getAllSessions = (): Session[] => {
  return implementedSessions;
};

export const getSessionSummaries = (): SessionSummary[] => {
  return implementedSessions.map(({ slides, prompts, resources, dummyData, exercises, worksheets, ...meta }) => meta);
};

export const getImplementedSessionIds = (): number[] => {
  return implementedSessions.map(s => s.id);
};

// Re-export individual sessions for direct access
export {
  session01, session02, session03, session04, session05,
  session06, session07, session08, session09, session10,
  session11, session12, session13, session14, session15,
  session16, session17, session18, session19, session20,
};
