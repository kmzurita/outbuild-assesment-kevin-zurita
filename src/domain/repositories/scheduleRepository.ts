import { Schedule } from '../entities/schedule';

export interface ScheduleRepository {
  createSchedule(schedule: Schedule): Promise<Schedule>;
  findScheduleById(id: string): Promise<Schedule | null>;
  findScheduleByUserId(userId: string): Promise<Schedule[]>;
}
