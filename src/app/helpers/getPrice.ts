export function getPrice(price: string | number, multi: number  = 1) {
  if (typeof price === 'string') {
    if (price.includes(' euros HT')) {
      return parseInt(price.replace(' euros HT', '')) * multi;
    }
    return parseInt(price) * multi;
  }

  return price * multi;
}

export function getCartTotalPrice(array: any[], multi: number = 1) {
  let price = 0;
  if (array && array.length) {
    try {
      price = array.map((el) => el.price).reduce((p, c) => p + c) * multi;
    } catch (error) {
      throw error;
    }
  }
  return price;
}
