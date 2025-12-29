import { Router } from 'express'
import { login, me } from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

/**
 * POST /api/auth/login
 * 이메일/비밀번호로 로그인
 */
router.post('/login', login)

/**
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보 조회
 * 인증 필요
 */
router.get('/me', authenticate, me)

export default router
