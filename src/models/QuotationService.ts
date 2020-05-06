import { Vehicle } from './Vehicle';

export interface QuotationService {
  getQuotation: (vehicle: Vehicle) => Promise<number>;
}
