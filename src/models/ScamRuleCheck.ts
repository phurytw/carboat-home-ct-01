import { Annonce } from './Annonce';

export type ScamRuleCheck = (annonce: Annonce) => Promise<void>;
