import { Annonce, ScamCheckResult } from '../models';
import annonceData from '../annonce.json';
import scamCheck from '../scamCheck';

describe('Scam check module', () => {
  const annonce: Annonce = annonceData;

  it('Returns an object with a scam value of true and the broken rules', () => {
    const inputAnnonce: Annonce = {
      ...annonce,
      contacts: {
        ...annonce.contacts,
        firstName: 'No',
        lastName: 'No',
        email: '123456@email.com',
      },
      price: 20000,
      vehicle: {
        ...annonce.vehicle,
        registerNumber: 'AA123AA',
      },
    };

    return scamCheck(inputAnnonce).then((result: ScamCheckResult) => {
      expect(result.reference).toBe(inputAnnonce.reference);
      expect(result.scam).toBe(true);
      expect(result.rules).toContain('rule::firstname::length');
      expect(result.rules).toContain('rule::lastname::length');
      expect(result.rules).toContain('rule:✉:number_rate');
      expect(result.rules).toContain('rule::price::quotation_rate');
      expect(result.rules).toContain('rule::registernumber::blacklist');
    });
  });

  it('Returns an object with a scam value of false', () => {
    const inputAnnonce: Annonce = {
      ...annonce,
      contacts: {
        ...annonce.contacts,
        firstName: 'First name',
        lastName: 'Last name',
        email: 'nice_email@email.com',
      },
      price: 35000,
      vehicle: {
        ...annonce.vehicle,
        registerNumber: 'BB123BB',
      },
    };

    return scamCheck(inputAnnonce).then((result: ScamCheckResult) => {
      expect(result.reference).toBe(inputAnnonce.reference);
      expect(result.scam).toBe(false);
      expect(result.rules).toBeEmpty();
    });
  });
});
