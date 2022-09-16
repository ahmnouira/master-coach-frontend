import { PlanPeriod } from './plan-period.enum';

export class Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  period: PlanPeriod;
}
