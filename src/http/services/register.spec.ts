import { describe, expect, it } from 'vitest'
import { RegisterUser } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const { user } = await registerUser.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const { user } = await registerUser.execute({
      name: 'Teste',
      email: 'felipe@gmail.com',
      password: '123456',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('should not be able to registre with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUser = new RegisterUser(usersRepository)

    const email = 'teste@teste.com'

    await registerUser.execute({
      name: 'Teste',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUser.execute({
        name: 'Teste',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
