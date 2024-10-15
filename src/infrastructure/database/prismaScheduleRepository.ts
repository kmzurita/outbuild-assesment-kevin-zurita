import { PrismaClient } from '@prisma/client';
import { Schedule } from '../../domain/entities/schedule';
import { ScheduleRepository } from '../../domain/repositories/scheduleRepository';

export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private prisma: PrismaClient) {}

  async createSchedule(schedule: Schedule): Promise<Schedule> {
    const createdSchedule = await this.prisma.schedule.create({
      data: {
        name: schedule.getName(),
        imageUrl: schedule.getImageUrl(),
      },
    });
    return new Schedule(createdSchedule.name, createdSchedule.imageUrl, createdSchedule.id, createdSchedule.userId);
  }

  async findScheduleById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    return schedule
      ? new Schedule(schedule.name, schedule.imageUrl, schedule.id, schedule.userId)
      : null;
  }

  async findScheduleByUserId(userId: string): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({ where: { userId } });
    return schedules.map(
      (schedule: any) => new Schedule(schedule.id, schedule.name, schedule.imageUrl, schedule.userId)
    );
  }
}
