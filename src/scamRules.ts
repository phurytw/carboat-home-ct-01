import { Annonce, ScamRuleCheck, ScamRules } from './models';
import quotationService from './services/quotationService';
import blacklistService from './services/blacklistService';

const firstNameRuleCheck: ScamRuleCheck = (annonce: Annonce): Promise<void> =>
  annonce.contacts.firstName.length > 2 ? Promise.resolve() : Promise.reject();

const lastNameRuleCheck: ScamRuleCheck = (annonce: Annonce): Promise<void> =>
  annonce.contacts.lastName.length > 2 ? Promise.resolve() : Promise.reject();

const alphanumericEmailRuleCheck: ScamRuleCheck = (
  annonce: Annonce
): Promise<void> => {
  const emailBeforeAt: string = annonce.contacts.email.slice(
    0,
    annonce.contacts.email.indexOf('@')
  );
  const nAlphanumeric: number = emailBeforeAt
    .split('')
    .reduce((value: number, current: string) => {
      const charCode: number = current.charCodeAt(0);
      if (
        (charCode >= 48 && charCode <= 57) ||
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      ) {
        return value + 1;
      }
      return value;
    }, 0);

  return nAlphanumeric / emailBeforeAt.length > 0.7
    ? Promise.resolve()
    : Promise.reject();
};

const digitsEmailRuleCheck: ScamRuleCheck = (
  annonce: Annonce
): Promise<void> => {
  const emailBeforeAt: string = annonce.contacts.email.slice(
    0,
    annonce.contacts.email.indexOf('@')
  );
  const nDigits: number = emailBeforeAt
    .split('')
    .reduce((value: number, current: string) => {
      const charCode: number = current.charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        return value + 1;
      }
      return value;
    }, 0);

  return nDigits / emailBeforeAt.length < 0.3
    ? Promise.resolve()
    : Promise.reject();
};

const priceRuleCheck: ScamRuleCheck = (annonce: Annonce): Promise<void> => {
  return quotationService
    .getQuotation(annonce.vehicle)
    .then((quotation: number) => {
      const difference: number = Math.abs(quotation - annonce.price);
      if (difference / quotation >= 0.2) {
        return Promise.reject();
      }
      return Promise.resolve();
    });
};

const blacklistCheck: ScamRuleCheck = (annonce: Annonce): Promise<void> => {
  return blacklistService
    .isBlacklisted(annonce.vehicle.registerNumber)
    .then((isBlacklisted: boolean) => {
      if (isBlacklisted) {
        return Promise.reject();
      }
      return Promise.resolve();
    });
};

const scamRules: ScamRules = {
  'rule::firstname::length': firstNameRuleCheck,
  'rule::lastname::length': lastNameRuleCheck,
  'rule:✉:alpha_rate': alphanumericEmailRuleCheck,
  'rule:✉:number_rate': digitsEmailRuleCheck,
  'rule::price::quotation_rate': priceRuleCheck,
  'rule::registernumber::blacklist': blacklistCheck,
};

export default scamRules;
