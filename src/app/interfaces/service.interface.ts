export interface IService {
  title: string;
  description: string;
  duration?: string;
  price?: number;
  category?: string;
  isFree?: boolean;
  isFixedPrice?: boolean;
  testimonies?: any[];
  isAutoConfirmed?: boolean;
  image?: any;
}
