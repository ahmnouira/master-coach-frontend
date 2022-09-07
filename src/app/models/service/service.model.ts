import { IService } from 'src/app/interfaces/service.interface';
import { Entity } from '../entity/entity.model';
import { User } from '../user-model';
import { ServiceChez } from './service-chez.enum';
import { ServiceFormat } from './service-format.enum';
import { SessionType } from './service-type.enum';
export class Service extends Entity implements IService {
  format?: ServiceFormat;
  sessionType?: SessionType;
  chez?: ServiceChez;
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

  readonly user: User;

}
