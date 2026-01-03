import { Request, Response } from 'express'

// API 응답 타입 정의
interface APIErrorResponse {
  error?: { message?: string }
}

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
}

interface OpenAIResponse {
  choices?: Array<{ message?: { content?: string } }>
}

interface AnthropicResponse {
  content?: Array<{ text?: string }>
}

// AI 모델 타입 정의
type AIProvider = 'google' | 'openai' | 'anthropic'

interface AIModel {
  id: string
  provider: AIProvider
  modelId: string
}

// 지원하는 AI 모델 목록
const AI_MODELS: AIModel[] = [
  // Google Gemini
  { id: 'gemini-flash', provider: 'google', modelId: 'gemini-2.0-flash-exp' },
  // OpenAI
  { id: 'gpt-4o-mini', provider: 'openai', modelId: 'gpt-4o-mini' },
  { id: 'gpt-4o', provider: 'openai', modelId: 'gpt-4o' },
  { id: 'gpt-4-turbo', provider: 'openai', modelId: 'gpt-4-turbo' },
  { id: 'o1-mini', provider: 'openai', modelId: 'o1-mini' },
  { id: 'o1', provider: 'openai', modelId: 'o1' },
  // Anthropic Claude
  { id: 'claude-haiku', provider: 'anthropic', modelId: 'claude-3-5-haiku-latest' },
  { id: 'claude-sonnet', provider: 'anthropic', modelId: 'claude-3-5-sonnet-latest' },
  { id: 'claude-opus', provider: 'anthropic', modelId: 'claude-opus-4-latest' },
]

// API 키 가져오기
const getApiKey = (provider: AIProvider): string => {
  switch (provider) {
    case 'google':
      return process.env.GOOGLE_API_KEY || ''
    case 'openai':
      return process.env.OPENAI_API_KEY || ''
    case 'anthropic':
      return process.env.ANTHROPIC_API_KEY || ''
  }
}

// Google Gemini API 호출
async function callGemini(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: { temperature: number; topP: number; maxTokens: number }
): Promise<string> {
  const apiKey = getApiKey('google')
  if (!apiKey) throw new Error('Google AI API 키가 설정되지 않았습니다.')

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: options.temperature,
          topP: options.topP,
          maxOutputTokens: options.maxTokens,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = (await response.json()) as APIErrorResponse
    throw new Error(error.error?.message || 'Gemini API 호출 실패')
  }

  const data = (await response.json()) as GeminiResponse
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 생성할 수 없습니다.'
}

// OpenAI API 호출
async function callOpenAI(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: { temperature: number; topP: number; maxTokens: number }
): Promise<string> {
  const apiKey = getApiKey('openai')
  if (!apiKey) throw new Error('OpenAI API 키가 설정되지 않았습니다.')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: options.temperature,
      top_p: options.topP,
      max_tokens: options.maxTokens,
    }),
  })

  if (!response.ok) {
    const error = (await response.json()) as APIErrorResponse
    throw new Error(error.error?.message || 'OpenAI API 호출 실패')
  }

  const data = (await response.json()) as OpenAIResponse
  return data.choices?.[0]?.message?.content || '응답을 생성할 수 없습니다.'
}

// Anthropic Claude API 호출
async function callAnthropic(
  modelId: string,
  systemPrompt: string,
  userPrompt: string,
  options: { temperature: number; topP: number; maxTokens: number }
): Promise<string> {
  const apiKey = getApiKey('anthropic')
  if (!apiKey) throw new Error('Anthropic API 키가 설정되지 않았습니다.')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: options.maxTokens,
      temperature: options.temperature,
      top_p: options.topP,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const error = (await response.json()) as APIErrorResponse
    throw new Error(error.error?.message || 'Anthropic API 호출 실패')
  }

  const data = (await response.json()) as AnthropicResponse
  return data.content?.[0]?.text || '응답을 생성할 수 없습니다.'
}

// AI 채팅 완료 요청 처리
export const chatCompletion = async (req: Request, res: Response) => {
  try {
    const { modelId, systemPrompt, userPrompt, options } = req.body

    // 필수 파라미터 검증
    if (!modelId || !userPrompt) {
      return res.status(400).json({
        error: 'modelId와 userPrompt는 필수입니다.',
      })
    }

    // 모델 찾기
    const model = AI_MODELS.find((m) => m.id === modelId)
    if (!model) {
      return res.status(400).json({
        error: `지원하지 않는 모델입니다: ${modelId}`,
      })
    }

    // 옵션 기본값 설정
    const finalOptions = {
      temperature: options?.temperature ?? 0.2,
      topP: options?.topP ?? 0.9,
      maxTokens: options?.maxTokens ?? 4096,
    }

    // AI 호출
    let response: string
    switch (model.provider) {
      case 'google':
        response = await callGemini(model.modelId, systemPrompt || '', userPrompt, finalOptions)
        break
      case 'openai':
        response = await callOpenAI(model.modelId, systemPrompt || '', userPrompt, finalOptions)
        break
      case 'anthropic':
        response = await callAnthropic(model.modelId, systemPrompt || '', userPrompt, finalOptions)
        break
      default:
        return res.status(400).json({ error: '지원하지 않는 제공자입니다.' })
    }

    return res.json({ response })
  } catch (error) {
    console.error('AI API Error:', error)
    const message = error instanceof Error ? error.message : 'AI 응답 생성 실패'
    return res.status(500).json({ error: message })
  }
}
