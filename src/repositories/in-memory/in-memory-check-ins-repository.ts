import { Checkin, Prisma } from '@prisma/client'
import { CheckInsRespository } from '../check-ins-repository'
import { randomUUID } from 'crypto'

export class inMemoryCheckInsRepository implements CheckInsRespository {
  public items: Checkin[] = []

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)

    return checkIn
  }
}
