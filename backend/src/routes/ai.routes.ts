import { Router } from 'express'
import { chatCompletion } from '../controllers/ai.controller'

const router = Router()

// POST /api/ai/chat - AI 채팅 완료 요청
router.post('/chat', chatCompletion)

export default router
