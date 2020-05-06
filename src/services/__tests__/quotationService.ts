import { Vehicle } from '../../models';
import quotationService from '../quotationService';

jest.useFakeTimers();

describe('Quotation service', () => {
  const vehicleA: Vehicle = {
    category: 'CatA',
    mileage: 100000,
    make: 'MakeA',
    model: 'ModelA',
    registerNumber: 'NumberA',
    version: 'VersionA',
  };
  const vehicleB: Vehicle = {
    category: 'CatB',
    mileage: 150000,
    make: 'MakeB',
    model: 'ModelB',
    registerNumber: 'NumberB',
    version: 'VersionB',
  };

  it('Resolves 35000 with any Vehicle', () => {
    expect.assertions(2);
    quotationService.getQuotation(vehicleA).then((result: number) => {
      expect(result).toBe(35000);
    });
    quotationService.getQuotation(vehicleB).then((result: number) => {
      expect(result).toBe(35000);
    });
    jest.advanceTimersByTime(50);
  });
});
