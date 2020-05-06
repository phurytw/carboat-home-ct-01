import { QuotationService } from '../models';
import serviceSleep from './utils';

const quotationService: QuotationService = {
  getQuotation: (): Promise<number> =>
    serviceSleep().then(() => Promise.resolve(35000)),
};

export default quotationService;
