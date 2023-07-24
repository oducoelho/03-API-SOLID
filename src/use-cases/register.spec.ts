import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registartion', async () => {
    // const prismaUserRepositopry = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '1234567',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
