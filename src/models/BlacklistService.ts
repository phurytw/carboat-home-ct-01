export interface BlacklistService {
  isBlacklisted: (registerNumber: string) => Promise<boolean>;
}
