import { Router } from 'express'
import {
  createOrUpdate,
  getMySubmissions,
  getById,
} from '../controllers/submission.controller'
import { authenticate, authorize } from '../middleware/auth.middleware'

const router = Router()

/**
 * POST /api/submissions
 * 제출물 생성 또는 업데이트
 * 학생만 접근 가능
 */
router.post('/', authenticate, authorize('student'), createOrUpdate)

/**
 * GET /api/submissions
 * 내 제출물 목록 조회
 * - 학생: 자신의 제출물
 * - 평가자: 제출된(submitted) 모든 제출물
 * 쿼리 파라미터: ?status=saved|submitted&sessionId=1
 */
router.get('/', authenticate, getMySubmissions)

/**
 * GET /api/submissions/:id
 * 제출물 상세 조회
 * - 학생: 자신의 제출물만
 * - 평가자: 제출된(submitted) 제출물만
 */
router.get('/:id', authenticate, getById)

export default router
