import { IService } from "src/app/interfaces/service.interface";
import { Entity } from "../entity/entity.model";
export class Service extends Entity implements IService  {
  title: string;
  description: string;
  duration?: number;
  price?: number;
  category?: string;
  isFree?: boolean;
  isFixedPrice?: boolean;
  testimonies?: any[];
  isAutoConfirmed?: boolean;
  image?: any;
 
  
}


