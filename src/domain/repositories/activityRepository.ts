import { Activity } from '../entities/activity';

export interface ActivityRepository {
  createActivity(activity: Activity): Promise<Activity>;
  createBatchActivity(activities: Activity[]): Promise<void>;
  findActivitiesByScheduleId(scheduleId: string): Promise<Activity[]>;
}