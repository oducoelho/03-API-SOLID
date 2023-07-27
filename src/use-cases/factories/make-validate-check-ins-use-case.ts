import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(CheckInsRepository)

  return useCase
}
