export interface IService {
  title: string;
  description: string;
  duration: string;
  image: File | string;
  price?: number;
  category?: string;
  isFree?: boolean;
  isFixedPrice?: boolean;
  isPriceHidden?: boolean;
  testimonies?: any[];
  isAutoConfirmed?: boolean;
}
