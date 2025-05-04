import { useAtom } from 'jotai';
import { wishlistAtom } from '../atom/wishlistAtom';
import { cartAtom } from '../atom/cartAtom';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useHydrateCartAndWishlist } from '../hooks/useHydrateCartAndWishlist';

const WishlistPage = () => {
  useHydrateCartAndWishlist();
  const [cart, setCart] = useAtom(cartAtom);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const navigate = useNavigate();

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
    setWishlist((prev) => {
      const updatedWishlist = prev.filter(
        (wishlistItem) => wishlistItem.id !== item.id,
      );
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <div className="wrapper mx-auto max-w-7xl p-5">
      <h1 className="mb-4 text-center text-2xl font-bold">Your Wishlist ❤️</h1>
      <button onClick={() => navigate('/home')} className="mb-4 text-blue-500">
        ← Back to Shopping
      </button>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {wishlist.map((item) => (
            <div className="rounded-lg border-2 p-5 shadow-md" key={item.id}>
              <img
                src={item.img}
                alt={item.name}
                className="h-[250px] w-full rounded-md"
              />
              <h3 className="mt-2 h-[60px] text-lg font-semibold">
                <span>{item.name}</span>
              </h3>
              <p className="font-bold text-green-600">${item.price}</p>
              <div className="mt-3 flex items-center justify-between">
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart 🛒
                </button>
                <FaTrash
                  className="cursor-pointer text-red-500 transition hover:text-red-700"
                  onClick={() => removeFromWishlist(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
