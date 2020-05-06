import serviceSleep from '../utils';

jest.useFakeTimers();

describe('Utilities', () => {
  it('Resolves after 50ms', async () => {
    const spy: jest.Mock = jest.fn();
    serviceSleep().then(spy);
    // fake timers don't yet support promises https://stackoverflow.com/a/51132058
    await Promise.resolve().then(() => jest.advanceTimersByTime(50));
    expect(spy).toHaveBeenCalled();
  });
});
