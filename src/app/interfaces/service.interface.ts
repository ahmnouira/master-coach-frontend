import { ServiceFormat } from '../models/service/service-format.enum';
import { SessionType } from '../models/service/service-type.enum';
import { ServiceChez } from '../models/service/service-chez.enum';

export interface IService {
  title: string;
  description: string;
  duration: string;
  image: File | string;
  price?: string;
  category?: string;
  isFree?: boolean;
  isFixedPrice?: boolean;
  isPriceHidden?: boolean;
  testimonies?: any[];
  isAutoConfirmed?: boolean;
  format?: ServiceFormat;
  sessionType?: SessionType;
  chez?: ServiceChez;
}
