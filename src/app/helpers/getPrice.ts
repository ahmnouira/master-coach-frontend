export function getPrice(price: string | number) {
  if (typeof price === 'string') {
    if (price.includes(' euros HT')) {
      return parseInt(price.replace(' euros HT', '')) * 100;
    }
    return parseInt(price) * 100;
  }

  return price * 100;
}
