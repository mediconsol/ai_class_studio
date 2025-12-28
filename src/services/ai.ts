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
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    modelId: 'gemini-2.0-flash-exp',
    description: '무료, 빠른 응답, 최신 모델',
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
    description: '고성능 멀티모달',
    tier: 'premium',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    modelId: 'gpt-4-turbo',
    description: '빠른 GPT-4',
    tier: 'premium',
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    provider: 'openai',
    modelId: 'o1-mini',
    description: '추론 특화, 경제적',
    tier: 'standard',
  },
  {
    id: 'o1',
    name: 'o1',
    provider: 'openai',
    modelId: 'o1',
    description: '고급 추론 모델',
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
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    modelId: 'claude-3-5-sonnet-latest',
    description: '균형잡힌 성능',
    tier: 'premium',
  },
  {
    id: 'claude-opus',
    name: 'Claude Opus 4',
    provider: 'anthropic',
    modelId: 'claude-opus-4-latest',
    description: '최고 성능, 복잡한 작업',
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

// ============================================
// AI 응답 생성 옵션
// ============================================

export interface AIGenerationOptions {
  temperature?: number;  // 0.0 ~ 1.0, 기본값 0.2 (할루시네이션 감소)
  topP?: number;         // 0.0 ~ 1.0, 기본값 0.9
  maxTokens?: number;    // 최대 토큰 수, 기본값 4096
}

// 기본 설정값 (할루시네이션 최소화)
const DEFAULT_OPTIONS: Required<AIGenerationOptions> = {
  temperature: 0.2,
  topP: 0.9,
  maxTokens: 4096,
};

// Google Gemini API 호출
async function callGemini(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: Required<AIGenerationOptions>
): Promise<string> {
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
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: options.temperature,
          topP: options.topP,
          maxOutputTokens: options.maxTokens,
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
async function callOpenAI(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: Required<AIGenerationOptions>
): Promise<string> {
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
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: options.temperature,
      top_p: options.topP,
      max_tokens: options.maxTokens,
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
async function callAnthropic(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: Required<AIGenerationOptions>
): Promise<string> {
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
      max_tokens: options.maxTokens,
      temperature: options.temperature,
      top_p: options.topP,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
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
export async function generateAIResponse(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options?: AIGenerationOptions
): Promise<string> {
  const model = AI_MODELS.find((m) => m.id === modelId);
  if (!model) {
    throw new Error(`알 수 없는 모델: ${modelId}`);
  }

  // 옵션 병합 (사용자 제공 옵션이 기본값 override)
  const finalOptions: Required<AIGenerationOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  switch (model.provider) {
    case 'google':
      return callGemini(model.modelId, systemPrompt, userPrompt, finalOptions);
    case 'openai':
      return callOpenAI(model.modelId, systemPrompt, userPrompt, finalOptions);
    case 'anthropic':
      return callAnthropic(model.modelId, systemPrompt, userPrompt, finalOptions);
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
