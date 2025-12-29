import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 비밀번호 해싱 (모든 테스트 계정 동일: test1234)
  const hashedPassword = await bcrypt.hash('test1234', 10)

  // 기존 데이터 삭제 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️  Cleaning existing data...')
    await prisma.evaluation.deleteMany()
    await prisma.submission.deleteMany()
    await prisma.user.deleteMany()
  }

  // 테스트 사용자 생성
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'instructor1@test.com',
        passwordHash: hashedPassword,
        role: 'instructor',
        name: '테스트강사1',
      },
      {
        email: 'student1@test.com',
        passwordHash: hashedPassword,
        role: 'student',
        name: '테스트학생1',
      },
      {
        email: 'student2@test.com',
        passwordHash: hashedPassword,
        role: 'student',
        name: '테스트학생2',
      },
      {
        email: 'reviewer1@test.com',
        passwordHash: hashedPassword,
        role: 'reviewer',
        name: '테스트평가자1',
      },
    ],
    skipDuplicates: true,
  })

  console.log(`✅ Created ${users.count} users`)

  // 생성된 사용자 목록 출력
  const allUsers = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      name: true,
    },
  })

  console.log('\n📋 Test Accounts:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  allUsers.forEach((user) => {
    console.log(`  ${user.role.padEnd(12)} | ${user.email.padEnd(25)} | 비밀번호: test1234`)
  })
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log('✨ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
