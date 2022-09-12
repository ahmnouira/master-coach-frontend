export function getPrice(price: string | number) {
  if (typeof price === 'string') {
    if (price.includes(' euros HT')) {
      return parseInt(price.replace(' euros HT', ''));
    }
    return parseInt(price);
  }

  return price;
}

export function getCartTotalPrice(array: any[]) {
  let price = 0;
  if (array && array.length) {
    try {
      price = array.map((el) => el.price).reduce((p, c) => p + c) * 100;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return price;
}
