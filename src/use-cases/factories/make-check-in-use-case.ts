import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(CheckInsRepository, gymsRepository)

  return useCase
}
