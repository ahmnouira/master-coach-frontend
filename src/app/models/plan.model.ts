import { PlanType } from './plan.enum';

export class Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  type: PlanType;
}
