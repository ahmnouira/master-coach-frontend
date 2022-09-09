export interface ICart {
  title: string;
  items: ICartItem[];
}

export interface ICartItem {
  type: string;
  category: string;
  price: number;
}
