import { Session } from '../../types';
import { slides } from './slides';
import { prompts } from './prompts';
import { resources } from './resources';
import { dummyData } from './dummyData';
import { exercises } from './exercises';
import { quizzes } from './quizzes';
import { nursingPracticeGuide } from '../../shared/commonPracticeGuides';

export const session11: Session = {
  id: 11,
  type: 'practice',
  title: '간호 SOP·업무매뉴얼에 AI 활용',
  subtitle: 'SOP를 교육용 체크리스트로 변환하는 실습',
  duration: 60,
  objective: 'SOP를 실무에서 바로 사용할 수 있는 체크리스트로 변환',
  keyMessage: '복잡한 절차를 단순하게',
  tools: ['ChatGPT', 'Claude'],
  slides,
  prompts,
  resources,
  dummyData,
  exercises,
  practiceGuide: nursingPracticeGuide,
  quizzes,
};
