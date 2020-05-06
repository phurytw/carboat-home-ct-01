import { BlacklistService } from '../models';
import serviceSleep from './utils';

const blacklistService: BlacklistService = {
  isBlacklisted: (registeredNumber: string) =>
    serviceSleep().then(() => {
      if (registeredNumber === 'AA123AA') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
};

export default blacklistService;
