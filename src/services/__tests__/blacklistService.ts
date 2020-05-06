import blacklistService from '../blacklistService';

describe('Blacklist service', () => {
  it('Resolves "true" if input is "AA123AA"', () => {
    return expect(blacklistService.isBlacklisted('AA123AA')).resolves.toBe(
      true
    );
  });

  it('Resolves "false" if input is not "AA123AA"', () => {
    return expect(blacklistService.isBlacklisted('BB123BB')).resolves.toBe(
      false
    );
  });
});
