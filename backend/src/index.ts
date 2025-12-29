import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './utils/prisma'
import authRoutes from './routes/auth.routes'
import submissionRoutes from './routes/submission.routes'
import evaluationRoutes from './routes/evaluation.routes'
import { notFoundHandler, errorHandler } from './middleware/error.middleware'

// 환경변수 로드
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// CORS 설정
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:7900',              // Local Vite
  'https://inno.mediconsol.com',        // Production
  'https://aiclassstudio.vercel.app',   // Vercel
]

app.use(cors({
  origin: (origin, callback) => {
    // origin이 없는 경우 (same-origin) 허용
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS policy: Origin not allowed'))
    }
  },
  credentials: true,
}))

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API 라우트
app.use('/api/auth', authRoutes)
app.use('/api/submissions', submissionRoutes)
app.use('/api/evaluations', evaluationRoutes)

// 404 핸들러
app.use(notFoundHandler)

// 에러 핸들링 미들웨어
app.use(errorHandler)

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 CORS allowed origins: ${allowedOrigins.join(', ')}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏳ Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n⏳ Shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})
