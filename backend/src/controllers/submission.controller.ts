import { Request, Response } from 'express'
import { SubmissionStatus } from '@prisma/client'
import { prisma } from '../utils/prisma'

/**
 * 제출물 생성 또는 업데이트
 * POST /api/submissions
 * 학생만 접근 가능
 */
export const createOrUpdate = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { sessionId, prompt, result, modelId, status } = req.body

    // 입력값 검증
    if (!sessionId || !prompt || !result || !modelId || !status) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['sessionId', 'prompt', 'result', 'modelId', 'status'],
      })
    }

    // status 검증
    if (!['saved', 'submitted'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        allowed: ['saved', 'submitted'],
      })
    }

    // 해당 차시의 기존 제출물 조회
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        userId: req.user.id,
        sessionId: parseInt(sessionId),
      },
    })

    let submission

    if (existingSubmission) {
      // 업데이트: 기존 제출물이 있으면 업데이트
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          prompt,
          result,
          modelId,
          status: status as SubmissionStatus,
        },
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
      })
    } else {
      // 생성: 새 제출물 생성
      submission = await prisma.submission.create({
        data: {
          userId: req.user.id,
          sessionId: parseInt(sessionId),
          prompt,
          result,
          modelId,
          status: status as SubmissionStatus,
        },
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
      })
    }

    return res.json({ submission })
  } catch (error) {
    console.error('Create/Update submission error:', error)
    return res.status(500).json({
      error: 'Failed to save submission',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}

/**
 * 내 제출물 목록 조회
 * GET /api/submissions
 * 학생: 자신의 제출물만, 평가자: 제출된 모든 제출물
 */
export const getMySubmissions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // 쿼리 파라미터
    const { status, sessionId } = req.query

    // 필터 조건 구성
    const where: any = {}

    // 학생은 자신의 제출물만 조회
    if (req.user.role === 'student') {
      where.userId = req.user.id
    }

    // 평가자는 제출된(submitted) 제출물만 조회
    if (req.user.role === 'reviewer') {
      where.status = 'submitted'
    }

    // status 필터
    if (status && ['saved', 'submitted'].includes(status as string)) {
      where.status = status as SubmissionStatus
    }

    // sessionId 필터
    if (sessionId) {
      where.sessionId = parseInt(sessionId as string)
    }

    // 제출물 조회
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        evaluation: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.json({ submissions })
  } catch (error) {
    console.error('Get submissions error:', error)
    return res.status(500).json({
      error: 'Failed to get submissions',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}

/**
 * 제출물 상세 조회
 * GET /api/submissions/:id
 * 학생: 자신의 제출물만, 평가자: 제출된 모든 제출물
 */
export const getById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.params

    // 제출물 조회
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        evaluation: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }

    // 권한 확인
    // 학생: 자신의 제출물만
    if (req.user.role === 'student' && submission.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    // 평가자: 제출된 제출물만
    if (req.user.role === 'reviewer' && submission.status !== 'submitted') {
      return res.status(403).json({ error: 'Forbidden' })
    }

    return res.json({ submission })
  } catch (error) {
    console.error('Get submission error:', error)
    return res.status(500).json({
      error: 'Failed to get submission',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}
