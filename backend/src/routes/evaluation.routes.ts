import { Router } from 'express'
import {
  createOrUpdate,
  getBySubmissionId,
} from '../controllers/evaluation.controller'
import { authenticate, authorize } from '../middleware/auth.middleware'

const router = Router()

/**
 * POST /api/evaluations
 * 평가 생성 또는 업데이트
 * 평가자만 접근 가능
 */
router.post('/', authenticate, authorize('reviewer'), createOrUpdate)

/**
 * GET /api/evaluations/:submissionId
 * 제출물의 평가 조회
 * - 학생: 자신의 제출물 평가만
 * - 평가자: 모든 평가
 */
router.get('/:submissionId', authenticate, getBySubmissionId)

export default router
