import { Schedule } from '../../domain/entities/schedule';
import { Activity } from '../../domain/entities/activity';
import { ScheduleRepository } from '../../domain/repositories/scheduleRepository';
import { ActivityRepository } from '../../domain/repositories/activityRepository';

export class GetScheduleWithActivitiesUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private activityRepository: ActivityRepository
  ) {}

  async execute(scheduleId: number): Promise<{ schedule: Schedule; activities: Activity[] }> {
    const schedule = await this.scheduleRepository.findScheduleById(scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }
    const activities = await this.activityRepository.findActivitiesByScheduleId(scheduleId);
    return { schedule, activities };
  }
}
