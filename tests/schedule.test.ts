import { CreateScheduleUseCase } from '../src/application/useCases/createSchedule';
import { GetScheduleWithActivitiesUseCase} from'../src/application/useCases/getScheduleWithActivities';
import { ScheduleRepository } from '../src/domain/repositories/scheduleRepository';
import { ActivityRepository } from '../src/domain/repositories/activityRepository';
import { Schedule } from '../src/domain/entities/schedule';
import { Activity } from '../src/domain/entities/activity';

describe('CreateScheduleUseCase', () => {
    let mockScheduleRepository: jest.Mocked<ScheduleRepository>;
    let createScheduleUseCase: CreateScheduleUseCase;
  
    beforeEach(() => {
      mockScheduleRepository = {
        createSchedule: jest.fn(),
        findScheduleById: jest.fn(),
        findScheduleByUserId: jest.fn(),
      };
      createScheduleUseCase = new CreateScheduleUseCase(mockScheduleRepository);
    });
  
    it('should create a new schedule', async () => {
      const scheduleData = {
        name: 'Test Schedule',
        imageUrl: 'http://example.com/image.jpg',
        userId: 1,
      };
  
      const expectedSchedule = new Schedule(scheduleData.name, scheduleData.imageUrl,  expect.any(Number), scheduleData.userId);
  
      mockScheduleRepository.createSchedule.mockResolvedValue(expectedSchedule);
  
      const result = await createScheduleUseCase.execute(scheduleData);
  
      expect(mockScheduleRepository.createSchedule).toHaveBeenCalledWith(expect.any(Schedule));
      expect(result).toEqual(expectedSchedule);
    });
  });

  describe('GetScheduleWithActivitiesUseCase', () => {
    let mockScheduleRepository: jest.Mocked<ScheduleRepository>;
    let mockActivityRepository: jest.Mocked<ActivityRepository>;
    let getScheduleWithActivitiesUseCase: GetScheduleWithActivitiesUseCase;
  
    beforeEach(() => {
      mockScheduleRepository = {
        createSchedule: jest.fn(),
        findScheduleById: jest.fn(),
        findScheduleByUserId: jest.fn(),
      };
      mockActivityRepository = {
        createActivity: jest.fn(),
        findActivitiesByScheduleId: jest.fn(),
        createBatchActivity: jest.fn(),
      };
      getScheduleWithActivitiesUseCase = new GetScheduleWithActivitiesUseCase(
        mockScheduleRepository,
        mockActivityRepository
      );
    });
  
    it('should return a schedule with its activities', async () => {
      const scheduleId = expect.any(Number);
      const mockSchedule = new Schedule('Test Schedule', 'http://example.com/image.jpg', scheduleId, expect.any(Number));
      const mockActivities = [
        new Activity(expect.any(Number), 'Activity 1', new Date(), new Date(), scheduleId),
        new Activity(expect.any(Number), 'Activity 2', new Date(), new Date(), scheduleId),
      ];
  
      mockScheduleRepository.findScheduleById.mockResolvedValue(mockSchedule);
      mockActivityRepository.findActivitiesByScheduleId.mockResolvedValue(mockActivities);
  
      const result = await getScheduleWithActivitiesUseCase.execute(scheduleId);
  
      expect(mockScheduleRepository.findScheduleById).toHaveBeenCalledWith(scheduleId);
      expect(mockActivityRepository.findActivitiesByScheduleId).toHaveBeenCalledWith(scheduleId);
      expect(result).toEqual({ schedule: mockSchedule, activities: mockActivities });
    });
  
    it('should throw an error if schedule is not found', async () => {
      const scheduleId = 12;
  
      mockScheduleRepository.findScheduleById.mockResolvedValue(null);
  
      await expect(getScheduleWithActivitiesUseCase.execute(scheduleId)).rejects.toThrow('Schedule not found');
    });
  });
  