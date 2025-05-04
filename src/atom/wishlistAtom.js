import { atom } from 'jotai';

// Initialize with empty array to avoid SSR localStorage access
export const wishlistAtom = atom([]);

// Writable atom to update wishlist and persist to localStorage
export const wishlistActionsAtom = atom(
  (get) => get(wishlistAtom),
  (get, set, updateWishlist) => {
    const newWishlist = updateWishlist(get(wishlistAtom));
    set(wishlistAtom, newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist)); // Save to localStorage on client only
    }
  },
);
