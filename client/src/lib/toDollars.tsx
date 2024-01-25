import { CartItem } from './api';

export function toDollars(value: number): string {
  return '$' + (value / 100).toFixed(2);
}

export function countItems(cart: CartItem[]): number {
  let counterOrigin = 0;

  for (let i = 0; i < cart.length; i += 1) {
    counterOrigin += cart[i].quantity;
  }
  return counterOrigin;
}

export function countPrice(cart: CartItem[]): number {
  let counterOrigin = 0;

  for (let i = 0; i < cart.length; i += 1) {
    counterOrigin += cart[i].price * cart[i].quantity;
  }
  return counterOrigin;
}
