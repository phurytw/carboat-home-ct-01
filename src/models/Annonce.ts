import { Contact } from './Contact';
import { Vehicle } from './Vehicle';

export interface Annonce {
  contacts: Contact;
  creationDate: string;
  price: number;
  publicationOptions: string[];
  reference: string;
  vehicle: Vehicle;
}
