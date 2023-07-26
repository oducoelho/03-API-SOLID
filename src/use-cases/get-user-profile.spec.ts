import { inMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository = new inMemoryUserRepository()
let sut = new GetUserProfileUseCase(usersRepository)

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'jonh doe',
      email: 'jonh.doe91@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('jonh doe')
  })
  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
