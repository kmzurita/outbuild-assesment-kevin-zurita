import { CreateScheduleUseCase } from '../src/application/use-cases/CreateSchedule';
import { GetScheduleUseCase} from'../src/application/use-cases/GetSchedule';

describe('testing create schedule use case', () => {
  test('given data a new schedule should be registered', () => {
    expect(CreateScheduleUseCase('payload')).toBe('OK');
  });
});

describe('testing get schedule use case', () => {
    test('given data and a validation should return the schedule with its activities', () => {
      expect(GetScheduleUseCase('payload')).toBe('data');
    });
  });