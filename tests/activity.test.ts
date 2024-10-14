import { CreateActivityUseCase } from '../src/application/use-cases/CreateActivity';
import { CreateBatchActivityUseCase} from'../src/application/use-cases/CreateBatchActivity';

describe('testing create activity use case', () => {
  test('Given data a new activity should be registered under a schedule', () => {
    expect(CreateActivityUseCase('payload')).toBe('OK');
  });
});

describe('testing get batch activity use case', () => {
    test('Given data a batch of activities should be registered under a schedule', () => {
      expect(CreateBatchActivityUseCase('payload')).toBe('OK');
    });
  });