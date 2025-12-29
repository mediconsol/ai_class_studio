import { Request, Response } from 'express'
import { prisma } from '../utils/prisma'

/**
 * 평가 생성 또는 업데이트
 * POST /api/evaluations
 * 평가자만 접근 가능
 */
export const createOrUpdate = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { submissionId, score, comment } = req.body

    // 입력값 검증
    if (!submissionId || score === undefined) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['submissionId', 'score'],
      })
    }

    // 점수 범위 검증 (0-100)
    if (typeof score !== 'number' || score < 0 || score > 100) {
      return res.status(400).json({
        error: 'Invalid score',
        message: 'Score must be a number between 0 and 100',
      })
    }

    // 제출물 조회
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    })

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    // 제출물이 submitted 상태인지 확인
    if (submission.status !== 'submitted') {
      return res.status(400).json({
        error: 'Cannot evaluate',
        message: 'Only submitted submissions can be evaluated',
      })
    }

    // 현재 평가자의 기존 평가 조회
    const existingEvaluation = await prisma.evaluation.findUnique({
      where: {
        submissionId_reviewerId: {
          submissionId,
          reviewerId: req.user.id,
        },
      },
    })

    let evaluation

    if (existingEvaluation) {
      // 업데이트: 기존 평가가 있으면 업데이트 (본인 평가만 수정 가능)
      evaluation = await prisma.evaluation.update({
        where: { id: existingEvaluation.id },
        data: {
          score,
          comment: comment || null,
        },
        include: {
          reviewer: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
          submission: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      })
    } else {
      // 생성: 새 평가 생성
      evaluation = await prisma.evaluation.create({
        data: {
          submissionId,
          reviewerId: req.user.id,
          score,
          comment: comment || null,
        },
        include: {
          reviewer: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
          submission: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      })
    }

    return res.json({ evaluation })
  } catch (error) {
    console.error('Create/Update evaluation error:', error)
    return res.status(500).json({
      error: 'Failed to save evaluation',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}

/**
 * 제출물의 평가 목록 조회
 * GET /api/evaluations/:submissionId
 * 학생: 자신의 제출물 평가만, 평가자: 모든 평가
 * 여러 평가자가 평가한 경우 배열로 반환
 */
export const getBySubmissionId = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { submissionId } = req.params

    // 제출물 조회
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    })

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    // 권한 확인: 학생은 자신의 제출물 평가만 조회 가능
    if (req.user.role === 'student' && submission.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // 평가 목록 조회 (여러 평가자의 평가)
    const evaluations = await prisma.evaluation.findMany({
      where: { submissionId },
      include: {
        reviewer: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.json({ evaluations })
  } catch (error) {
    console.error('Get evaluations error:', error)
    return res.status(500).json({
      error: 'Failed to get evaluations',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}
