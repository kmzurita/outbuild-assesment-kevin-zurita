import { Activity } from '../../domain/entities/activity';
import { ActivityRepository } from '../../domain/repositories/activityRepository';
import { ActivityDto } from '../dto/activityDto';

export class AddActivityToScheduleUseCase {
  constructor(private activityRepository: ActivityRepository) {}

  async execute(dto: ActivityDto): Promise<Activity> {
    const activity = new Activity(
        dto.id,
        dto.name,
        dto.startDate,
        dto.endDate,
        dto.scheduleId
    );
    return this.activityRepository.createActivity(activity);
  }
}