import { Request, Response, NextFunction } from 'express'

/**
 * 404 Not Found 핸들러
 */
export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    error: 'Not Found',
    path: req.path,
  })
}

/**
 * 전역 에러 핸들러
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err)

  // CORS 에러
  if (err.message === 'CORS policy: Origin not allowed') {
    return res.status(403).json({ error: 'CORS policy violation' })
  }

  // 기본 에러 응답
  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
}
