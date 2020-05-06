import annonce from './annonce.json';
import scamCheck from './scamCheck';
import { ScamCheckResult } from './models';

scamCheck(annonce).then((result: ScamCheckResult) => {
  console.info(JSON.stringify(result, null, 2));
});
