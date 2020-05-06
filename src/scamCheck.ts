import { Annonce, ScamCheckResult, ScamRuleCheck } from './models';
import scamRules from './scamRules';

export default function scamCheck(annonce: Annonce): Promise<ScamCheckResult> {
  const scamRulePromises: Promise<void>[] = [];
  const brokenRules: string[] = [];
  for (const rule in scamRules) {
    if (Object.prototype.hasOwnProperty.call(scamRules, rule)) {
      const ruleCheck: ScamRuleCheck = scamRules[rule];
      scamRulePromises.push(
        ruleCheck(annonce).catch(() => {
          brokenRules.push(rule);
          return Promise.resolve();
        })
      );
    }
  }

  return Promise.all(scamRulePromises).then(() => ({
    reference: annonce.reference,
    rules: brokenRules,
    scam: brokenRules.length > 0,
  }));
}
