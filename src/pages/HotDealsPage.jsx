import { useAtom } from 'jotai';
import { cartActionsAtom } from '../atom/cartAtom';
import { wishlistActionsAtom } from '../atom/wishlistAtom';

import { Link, useNavigate } from 'react-router-dom';

import { FaHeart, FaEye, FaCartArrowDown, FaStar } from 'react-icons/fa';
import { Hotdeals } from '../api/product';
import { useState } from 'react';
import EventsPage from '../components/layout/EventsPage';
import ReactPaginate from 'react-paginate';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const HotDealsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;
  const startIndex = currentPage * productsPerPage;
  const selectedProducts = Hotdeals.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const [ratings, setRatings] = useState({});
  const handleRating = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };
  const [cart, setCart] = useAtom(cartActionsAtom);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) =>
      prevCart.some((item) => item.id === product.id)
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prevCart, { ...product, quantity: 1 }],
    );
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 2000);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const [wishlist, setWishlist] = useAtom(wishlistActionsAtom);
  const [showPopup, setShowPopup] = useState(false);
  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const isInWishlist = prev.some((w) => w.id === item.id);
      if (!isInWishlist) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
        return [...prev, item];
      }
      return prev;
    });
  };

  return (
    <div className="wrapper">
      <div className="mb-5 place-items-center">
        <h1 className="text-[1.875rem] font-bold">Hot Deals Of The Year</h1>
        <button
          onClick={goToCart}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Go to Cart 🛒 ({cart.length})
        </button>
      </div>

      <div className="flex flex-col gap-x-5 lg:grid lg:grid-cols-[1fr_220px]">
        {/* HotDeals */}
        <div className="container mx-auto flex max-w-[59.375rem] flex-col justify-center">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {selectedProducts.map((item, i) => (
              <div className="border-2 p-5" key={i}>
                {/* Product Info */}
                <div className="flex justify-between">
                  <span>{item.cat}</span>
                  <span>
                    <FaHeart
                      className={`cursor-pointer text-[1.5625rem] ${
                        wishlist.some((w) => w.id === item.id)
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                      onClick={() => addToWishlist(item)}
                    />
                  </span>
                </div>
                <Link to={`/productdetail/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-50 mt-2 h-[200px] lg:h-[18.75rem] lg:w-[17.5rem]"
                  />
                </Link>
                <div>
                  <h3 className="h-[70px] text-lg font-semibold">
                    <p>{item.name}</p>
                  </h3>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-green-600">
                      ${item.price}
                    </h3>
                    <div className="flex gap-2">
                      <Link to={`/productdetail/${item.id}`}>
                        <FaEye className="cursor-pointer text-[2.1875rem] text-gray-500 hover:text-blue-500" />
                      </Link>
                      <FaCartArrowDown
                        className="cursor-pointer text-[2.1875rem] text-gray-500 hover:text-green-500"
                        onClick={() => addToCart(item)}
                      />
                    </div>
                  </div>
                </div>
                {/* Star Rating */}
                <div className="mt-3 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-xl ${
                        (ratings[item.id] || 0) >= star
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRating(item.id, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={Math.ceil(Hotdeals.length / productsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'flex space-x-3'}
              pageClassName={
                'px-3 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300'
              }
              activeClassName={'bg-blue-500 text-white'}
              previousClassName={
                'px-3 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400'
              }
              nextClassName={
                'px-3 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400'
              }
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
          </div>
        </div>
        {/* wishlistpopup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40"
            >
              <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-8 py-6 text-center shadow-2xl">
                <CheckCircle className="h-14 w-14 animate-pulse text-green-500" />
                <p className="text-2xl font-semibold text-gray-800">
                  Add To Wishlist Successfully
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* cartpopup */}
        <AnimatePresence>
          {showCartPopup && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed right-5 top-5 flex w-64 flex-col gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-white" />
                <p className="font-medium text-white">
                  {' '}
                  Add To Cart Successfully
                </p>
              </div>
              {/* Animated Progress Bar */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-1 rounded bg-white"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event */}
        <div className="hidden md:block">
          <EventsPage />
        </div>
      </div>
    </div>
  );
};

export default HotDealsPage;
