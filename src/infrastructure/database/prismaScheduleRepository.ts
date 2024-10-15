import { PrismaClient } from '@prisma/client';
import { Schedule } from '../../domain/entities/schedule';
import { ScheduleRepository } from '../../domain/repositories/scheduleRepository';
import { ScheduleDto } from '../../application/dto/scheduleDto';

export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private prisma: PrismaClient) {}

  async createSchedule(schedule: Schedule): Promise<Schedule> {
    const createdSchedule = await this.prisma.schedule.create({
      data: {
        name: schedule.getName(),
        imageUrl: schedule.getImageUrl(),
        userId: schedule.getUserId()
      },
    });
    return new Schedule(createdSchedule.name, createdSchedule.imageUrl, createdSchedule.id, createdSchedule.userId);
  }

  async findScheduleById(id: number): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    return schedule
      ? new Schedule(schedule.name, schedule.imageUrl, schedule.id, schedule.userId)
      : null;
  }

  async findScheduleByUserId(userId: number): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({ where: { userId } });
    return schedules.map(
      (schedule: ScheduleDto) => new Schedule(schedule.name, schedule.imageUrl, schedule.id, schedule.userId)
    );
  }
}
