import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../utils/prisma'

/**
 * 로그인
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // 입력값 검증
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      })
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    // JWT 토큰 생성
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: '7d', // 7일 유효
      }
    )

    // 응답
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Login failed',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}

/**
 * 현재 사용자 정보 조회
 * GET /api/auth/me
 */
export const me = async (req: Request, res: Response) => {
  try {
    // authenticate 미들웨어에서 req.user가 설정됨
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    res.json({
      user: req.user,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      error: 'Failed to get user information',
      message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    })
  }
}
