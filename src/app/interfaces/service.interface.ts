import { ServiceFormat } from '../models/service/service-format.enum';
import { ServiceSession } from '../models/service/service-session.enum';
import { ServiceWith } from '../models/service/service.with.enum';

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
  session?: ServiceSession;
  with?: ServiceWith;
}
