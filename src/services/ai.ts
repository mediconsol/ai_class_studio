// AI Service - 다중 AI 모델 지원

export type AIProvider = 'google' | 'openai' | 'anthropic';

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  modelId: string;
  description: string;
  tier: 'free' | 'standard' | 'premium';
}

// 사용 가능한 AI 모델 목록
export const AI_MODELS: AIModel[] = [
  // Google Gemini (무료)
  {
    id: 'gemini-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    modelId: 'gemini-1.5-flash',
    description: '무료, 빠른 응답',
    tier: 'free',
  },
  // OpenAI GPT
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'openai',
    modelId: 'gpt-4o-mini',
    description: '경제적, 빠른 응답',
    tier: 'standard',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    modelId: 'gpt-4o',
    description: '고성능, 최신 모델',
    tier: 'premium',
  },
  // Anthropic Claude
  {
    id: 'claude-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    modelId: 'claude-3-5-haiku-latest',
    description: '경제적, 빠른 응답',
    tier: 'standard',
  },
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    modelId: 'claude-sonnet-4-20250514',
    description: '균형잡힌 성능',
    tier: 'premium',
  },
];

// API 키 가져오기
const getApiKey = (provider: AIProvider): string => {
  switch (provider) {
    case 'google':
      return import.meta.env.VITE_GOOGLE_AI_KEY || '';
    case 'openai':
      return import.meta.env.VITE_OPENAI_API_KEY || '';
    case 'anthropic':
      return import.meta.env.VITE_ANTHROPIC_API_KEY || '';
  }
};

// 공통 시스템 프롬프트 - 마크다운 스타일 지침 포함
const SYSTEM_PROMPT = `당신은 의료 분야 업무를 돕는 전문 AI 어시스턴트입니다.

## 응답 원칙
- 전문적이고 정확한 정보를 제공하되, 쉽게 이해할 수 있도록 설명합니다
- 의료 현장에서 바로 활용할 수 있는 실용적인 내용을 제공합니다
- 항상 "AI가 생성한 초안이므로 전문가 검토 후 사용"을 안내합니다

## 마크다운 형식 지침
응답 시 내용의 유형과 맥락에 따라 다음 형식을 적절히 활용하세요:

1. **제목 구조**: 주제별로 ## (h2), ### (h3) 헤딩을 사용하여 내용을 구조화
2. **목록**: 순서가 있으면 번호 목록(1. 2. 3.), 없으면 글머리 기호(- 또는 *)
3. **표**: 비교, 분류, 일정 등 데이터 정리 시 마크다운 테이블 사용
4. **강조**: 핵심 용어는 **굵게**, 부가 설명은 *기울임*
5. **인용**: 주의사항, 경고, 팁은 > 인용 블록 사용
6. **코드**: 약물명, 수치, 코드는 \`인라인 코드\` 사용
7. **구분선**: 섹션 구분 시 --- 사용

## 응답 구조 예시
- 문서 작성 요청: 제목 → 본문 → 주의사항
- 분석/비교 요청: 요약 → 상세 분석(표 활용) → 결론
- 교육 자료 요청: 목적 → 핵심 내용(목록) → 활용 방법
- 절차/프로세스: 단계별 번호 목록 → 각 단계 설명`;

// Google Gemini API 호출
async function callGemini(modelId: string, prompt: string): Promise<string> {
  const apiKey = getApiKey('google');
  if (!apiKey) throw new Error('Google AI API 키가 설정되지 않았습니다.');

  // Gemini는 system instruction을 별도로 지원
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Gemini API 호출 실패');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 생성할 수 없습니다.';
}

// OpenAI API 호출
async function callOpenAI(modelId: string, prompt: string): Promise<string> {
  const apiKey = getApiKey('openai');
  if (!apiKey) throw new Error('OpenAI API 키가 설정되지 않았습니다.');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API 호출 실패');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '응답을 생성할 수 없습니다.';
}

// Anthropic Claude API 호출
async function callAnthropic(modelId: string, prompt: string): Promise<string> {
  const apiKey = getApiKey('anthropic');
  if (!apiKey) throw new Error('Anthropic API 키가 설정되지 않았습니다.');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API 호출 실패');
  }

  const data = await response.json();
  return data.content?.[0]?.text || '응답을 생성할 수 없습니다.';
}

// 통합 AI 호출 함수
export async function generateAIResponse(modelId: string, prompt: string): Promise<string> {
  const model = AI_MODELS.find((m) => m.id === modelId);
  if (!model) {
    throw new Error(`알 수 없는 모델: ${modelId}`);
  }

  switch (model.provider) {
    case 'google':
      return callGemini(model.modelId, prompt);
    case 'openai':
      return callOpenAI(model.modelId, prompt);
    case 'anthropic':
      return callAnthropic(model.modelId, prompt);
    default:
      throw new Error(`지원하지 않는 제공자: ${model.provider}`);
  }
}

// 모델 ID로 모델 정보 가져오기
export function getModelById(modelId: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === modelId);
}

// 제공자별 아이콘/색상 정보
export const PROVIDER_INFO: Record<AIProvider, { name: string; color: string }> = {
  google: { name: 'Google', color: '#4285F4' },
  openai: { name: 'OpenAI', color: '#10A37F' },
  anthropic: { name: 'Anthropic', color: '#D97706' },
};
