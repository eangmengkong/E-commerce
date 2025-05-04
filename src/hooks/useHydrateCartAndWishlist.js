import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { cartAtom } from '../atom/cartAtom';
import { wishlistAtom } from '../atom/wishlistAtom';

export function useHydrateCartAndWishlist() {
  const setCart = useSetAtom(cartAtom);
  const setWishlist = useSetAtom(wishlistAtom);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setCart(savedCart);
      setWishlist(savedWishlist);
    }
  }, [setCart, setWishlist]);
}
