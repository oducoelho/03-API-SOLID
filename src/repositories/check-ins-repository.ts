import { Checkin, Prisma } from '@prisma/client'

export interface CheckInsRespository {
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
}
