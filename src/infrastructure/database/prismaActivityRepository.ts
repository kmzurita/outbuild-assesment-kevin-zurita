import { PrismaClient } from '@prisma/client';
import { Activity } from '../../domain/entities/activity';
import { ActivityRepository } from '../../domain/repositories/activityRepository';

export class PrismaActivityRepository implements ActivityRepository {
  constructor(private prisma: PrismaClient) {}

  async findActivitiesByScheduleId(scheduleId: number): Promise<Activity[]> {
    const activities = await this.prisma.activity.findMany({ where: { scheduleId } });
    return activities.map(
      (activity: any) =>
        new Activity(activity.name, activity.startDate, activity.endDate, activity.scheduleId, activity.id)
    );
  }

  async createActivity(activity: Activity): Promise<Activity> {
    const createdActivity = await this.prisma.activity.create({
      data: {
        name: activity.getName(),
        startDate: activity.getStartDate(),
        endDate: activity.getEndDate(),
        scheduleId: activity.getScheduleId(),
      },
    });
    return new Activity(
      createdActivity.name,
      createdActivity.startDate,
      createdActivity.endDate,
      createdActivity.scheduleId,
      createdActivity.id
    );
  }

  async createBatchActivity(activities: Activity[]): Promise<void> {
    await this.prisma.activity.createMany({
      data: activities.map((activity) => ({
        name: activity.getName(),
        startDate: activity.getStartDate(),
        endDate: activity.getEndDate(),
        scheduleId: Number(activity.getScheduleId()),
      })),
    });
  }
}
