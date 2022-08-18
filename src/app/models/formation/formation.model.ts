import { FormationType } from './formation-type.enum';

export class Formation {
  id: string;
  image: string;
  price: string;
  /**TODO: add enum */
  type: FormationType
  title: string;
  subTitle: string;
}
