import { Schedule } from '../entities/schedule';

export interface ScheduleRepository {
  createSchedule(schedule: Schedule): Promise<Schedule>;
  findScheduleById(id: number): Promise<Schedule | null>;
  findScheduleByUserId(userId: number): Promise<Schedule[]>;
}
