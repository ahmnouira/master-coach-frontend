import { IService } from 'src/app/interfaces/service.interface';
import { Entity } from '../entity/entity.model';
import { ServiceFormat } from './service-format.enum';
import { ServiceSession } from './service-session.enum';
export class Service extends Entity implements IService {
  format?: ServiceFormat;
  session?: ServiceSession;
  with?: any;
  title: string;
  description: string;
  duration: string;
  image: File;
  price?: string;
  category?: string;
  isFree?: boolean;
  isFixedPrice?: boolean;
  isPriceHidden?: boolean;
  testimonies?: any[];
  isAutoConfirmed?: boolean;
}
