import { inMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository = new inMemoryUserRepository()
let sut = new AuthenticateUseCase(usersRepository)

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUserRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'jonh doe',
      email: 'jonh.doe91@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jonh.doe91@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jonh.doe91@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'jonh doe',
      email: 'jonh.doe91@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonh.doe91@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
