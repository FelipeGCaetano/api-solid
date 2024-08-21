import { describe, expect, it } from 'vitest'
import { RegisterUser } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUser = new RegisterUser(prismaUsersRepository)

    const { user } = await registerUser.execute({
      name: 'Teste',
      email: 'felipe@gmail.com',
      password: '123',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
