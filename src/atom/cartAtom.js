import { atom } from 'jotai';

// Initialize with empty array to avoid SSR localStorage access
export const cartAtom = atom([]);

// Writable atom to update cart and persist to localStorage
export const cartActionsAtom = atom(
  (get) => get(cartAtom),
  (get, set, updateCart) => {
    const newCart = updateCart(get(cartAtom));
    set(cartAtom, newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage on client only
    }
  },
);

// Total price atom based on cart items
export const totalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});
