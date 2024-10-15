import { Schedule } from '../../domain/entities/schedule';
import { ScheduleRepository } from '../../domain/repositories/scheduleRepository';
import { ScheduleDto } from '../dto/scheduleDto';

export class CreateScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(dto: ScheduleDto): Promise<Schedule> {
    const schedule = new Schedule(
      dto.name,
      dto.imageUrl,
      dto.id,
      dto.userId
    );
    return this.scheduleRepository.createSchedule(schedule);
  }
}