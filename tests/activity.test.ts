import { AddActivityToScheduleUseCase } from '../src/application/useCases/addActivityToSchedule';
import { AddActivityBatchToScheduleUseCase} from'../src/application/useCases/addActivityBatchToSchedule';
import { ActivityRepository } from '../src/domain/repositories/activityRepository';
import { Activity } from '../src/domain/entities/activity';

describe('AddActivityToScheduleUseCase', () => {
    let mockActivityRepository: jest.Mocked<ActivityRepository>;
    let addActivityToScheduleUseCase: AddActivityToScheduleUseCase;
  
    beforeEach(() => {
      mockActivityRepository = {
        createActivity: jest.fn(),
        findActivitiesByScheduleId: jest.fn(),
        createBatchActivity: jest.fn(),
      };
      addActivityToScheduleUseCase = new AddActivityToScheduleUseCase(mockActivityRepository);
    });
  
    it('should add an activity to a schedule', async () => {
      const activityData = {
        name: 'Test Activity',
        startDate: new Date(),
        endDate: new Date(),
        scheduleId: 1,
      };
  
      const expectedActivity = new Activity(expect.any(Number), activityData.name, activityData.startDate, activityData.endDate, activityData.scheduleId);
  
      mockActivityRepository.createActivity.mockResolvedValue(expectedActivity);
  
      const result = await addActivityToScheduleUseCase.execute(activityData);
  
      expect(mockActivityRepository.createActivity).toHaveBeenCalledWith(expect.any(Activity));
      expect(result).toEqual(expectedActivity);
    });
  });

  describe('AddMultipleActivitiesToScheduleUseCase', () => {
    let mockActivityRepository: jest.Mocked<ActivityRepository>;
    let addMultipleActivitiesToScheduleUseCase: AddActivityBatchToScheduleUseCase;
  
    beforeEach(() => {
      mockActivityRepository = {
        createActivity: jest.fn(),
        findActivitiesByScheduleId: jest.fn(),
        createBatchActivity: jest.fn(),
      };
      addMultipleActivitiesToScheduleUseCase = new AddActivityBatchToScheduleUseCase(mockActivityRepository);
    });
  
    it('should add multiple activities to a schedule', async () => {
      const activitiesData = [
        {
          name: 'Activity 1',
          startDate: new Date(),
          endDate: new Date(),
          scheduleId: 1,
        },
        {
          name: 'Activity 2',
          startDate: new Date(),
          endDate: new Date(),
          scheduleId: 1,
        },
      ];
  
      await addMultipleActivitiesToScheduleUseCase.execute(activitiesData);
  
      expect(mockActivityRepository.createBatchActivity).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.any(Activity),
          expect.any(Activity),
        ])
      );
    });
  });