import { Activity } from '../../domain/entities/activity';
import { ActivityRepository } from '../../domain/repositories/activityRepository';
import { ActivityDto } from '../dto/activityDto';

export class AddMultipleActivitiesToScheduleUseCase {
  constructor(private activityRepository: ActivityRepository) {}

  async execute(dtos: ActivityDto[]): Promise<void> {
    const activities = dtos.map(
      dto =>
        new Activity(
            dto.id,
            dto.name,
            dto.startDate,
            dto.endDate,
            dto.scheduleId
        )
    );
    await this.activityRepository.createBatchActivity(activities);
  }
}