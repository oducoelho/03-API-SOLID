import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Near Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -21.8946848,
      longitude: -47.0583614,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -21.7640092,
      longitude: -47.0890235,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.8946848,
      userLongitude: -47.0583614,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
