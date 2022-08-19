import { PlanType } from './plan.enum';

export class Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  type: PlanType;

  /*
  getPrice(): number {
    if(this.price.includes(' euros HT')) {
      return parseInt(this.price.replace(' euros HT', '')) * 100
    }
    return parseInt(this.price)   * 100  
  }
  */
}
