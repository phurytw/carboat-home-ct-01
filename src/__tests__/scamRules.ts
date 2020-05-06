import scamRules from '../scamRules';
import { Annonce } from '../models';
import annonceData from '../annonce.json';

jest.mock('../services/utils', () => ({
  __esModule: true,
  default: (): Promise<void> => Promise.resolve(),
}));

describe('Scam rules definitions', () => {
  const annonce: Annonce = annonceData;

  describe('First name check (rule::firstname::length)', () => {
    it('Returns "true" if firstname length is greater than 2', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          firstName: 'Long Name',
        },
      };
      return expect(
        scamRules['rule::firstname::length'](inputAnnonce)
      ).toResolve();
    });

    it('Returns "false" if firstname length is less than or equal 2', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          firstName: 'No',
        },
      };
      return expect(
        scamRules['rule::firstname::length'](inputAnnonce)
      ).toReject();
    });
  });

  describe('Last name check (rule::lastname::length)', () => {
    it('Returns "true" if firstname length is greater than 2', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          lastName: 'Long Name',
        },
      };
      return expect(
        scamRules['rule::lastname::length'](inputAnnonce)
      ).toResolve();
    });

    it('Returns "false" if firstname length is less than or equal 2', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          lastName: 'No',
        },
      };
      return expect(
        scamRules['rule::lastname::length'](inputAnnonce)
      ).toReject();
    });
  });

  describe('Alphanumeric email check (rule:✉:alpha_rate)', () => {
    it('Returns "true" if the email has mostly alphanumeric characters (above 70% before "@")', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          email: '4LPH4num3r1c葛城ミサト@email.com',
        },
      };
      return expect(scamRules['rule:✉:alpha_rate'](inputAnnonce)).toResolve();
    });

    it('Returns "false" if the email has not enough alphanumeric characters (70% or below before "@")', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          email: '4LPH4num3r1c葛城 ミサト@email.com',
        },
      };
      return expect(scamRules['rule:✉:alpha_rate'](inputAnnonce)).toReject();
    });
  });

  describe('Number email check (rule:✉:number_rate)', () => {
    it('Returns "true" if the email does not have exceeding amount of digits (below 30% before "@")', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          email: '123myemails@email.com',
        },
      };
      return expect(scamRules['rule:✉:number_rate'](inputAnnonce)).toResolve();
    });

    it('Returns "false" if the email has exceeding amount of digits (30% or above before "@")', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        contacts: {
          ...annonce.contacts,
          email: '123myemail@email.com',
        },
      };
      return expect(scamRules['rule:✉:number_rate'](inputAnnonce)).toReject();
    });
  });

  describe('Price check (rule::price::quotation_rate)', () => {
    it('Returns "true" if price is not too high (within 20% above quotation)', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        price: 40000,
      };
      return expect(
        scamRules['rule::price::quotation_rate'](inputAnnonce)
      ).toResolve();
    });

    it('Returns "true" if price is not too low (within 20% below quotation)', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        price: 30000,
      };
      return expect(
        scamRules['rule::price::quotation_rate'](inputAnnonce)
      ).toResolve();
    });

    it('Returns "false" if price is too high (20% above quotation)', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        price: 45000,
      };
      return expect(
        scamRules['rule::price::quotation_rate'](inputAnnonce)
      ).toReject();
    });

    it('Returns "false" if price is too low (20% below quotation)', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        price: 25000,
      };
      return expect(
        scamRules['rule::price::quotation_rate'](inputAnnonce)
      ).toReject();
    });
  });

  describe('Blacklist check (rule::registernumber::blacklist)', () => {
    it('Returns "true" if the register number is not blacklisted', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        vehicle: {
          ...annonce.vehicle,
          registerNumber: 'BB123BB',
        },
      };
      return expect(
        scamRules['rule::registernumber::blacklist'](inputAnnonce)
      ).toResolve();
    });

    it('Returns "false" if the register number is blacklisted', () => {
      const inputAnnonce: Annonce = {
        ...annonce,
        vehicle: {
          ...annonce.vehicle,
          registerNumber: 'AA123AA',
        },
      };
      return expect(
        scamRules['rule::registernumber::blacklist'](inputAnnonce)
      ).toReject();
    });
  });
});
