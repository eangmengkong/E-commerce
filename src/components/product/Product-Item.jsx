import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaHeart, FaCartArrowDown } from 'react-icons/fa';

import { ProductSummary, TopSellingProduct } from '../../api/product';

import { useAtom } from 'jotai';
import { cartActionsAtom } from '../../atom/cartAtom';
import { wishlistActionsAtom } from '../../atom/wishlistAtom';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Button Group Component
const CustomButtonGroup = ({ next, previous }) => {
  return (
    <div className="absolute -top-12 right-0 flex gap-2">
      <button
        onClick={previous}
        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 sm:p-3"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={next}
        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 sm:p-3"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export const CartItemNewProduct = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  // addtoCart
  const [cart, setCart] = useAtom(cartActionsAtom);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const addToCart = (product) => {
    setCart((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { ...product, quantity: 1 }],
    );
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 2000);
  };

  // addtowishlist
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
    <div className="w-full">
      <div className="new-product-cart">
        <Carousel
          disableSwipeOnMobile
          disableDrag
          responsive={responsive}
          forSSR
          slidesToSlide={1}
          infinite={true}
          className="test"
          removeArrowOnDeviceType={[]} // Remove mobile from this array to show buttons on mobile
          customButtonGroup={<CustomButtonGroup />}
          renderButtonGroupOutside={true}
        >
          {ProductSummary.NewProduct.map((card, i) => (
            <div
              key={i}
              className="mx-2 flex h-auto min-h-[400px] max-w-full flex-col items-center gap-2 rounded-lg border bg-white p-2 shadow-sm transition-all hover:shadow-md sm:min-h-[450px] sm:p-3 md:min-h-[500px]"
            >
              <Link to={`/productdetail/${card.id}`} className="w-full">
                <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-56 md:h-64">
                  <img
                    src={card.img}
                    alt="Product"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </Link>
              <div className="flex h-auto min-h-[150px] flex-col items-center justify-center gap-1 text-center sm:min-h-[160px] md:min-h-[170px]">
                <h4 className="text-base font-bold sm:text-lg md:text-xl">
                  {card.cat}
                </h4>
                <h1 className="text-xs sm:text-sm md:text-base">{card.name}</h1>
                <h3 className="text-sm font-semibold text-red-600 sm:text-base md:text-lg">
                  ${card.price}
                </h3>
              </div>
              <div className="flex w-full items-center justify-center gap-4 p-2">
                <FaHeart
                  className={`cursor-pointer text-lg sm:text-xl md:text-2xl ${
                    wishlist.some((w) => w.id === card.id)
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                  onClick={() => addToWishlist(card)}
                />
                <FaCartArrowDown
                  className="cursor-pointer text-xl text-gray-500 hover:text-green-500 sm:text-2xl md:text-3xl"
                  onClick={() => addToCart(card)}
                />
              </div>
            </div>
          ))}
        </Carousel>

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
      </div>
    </div>
  );
};

// Function to generate Swiper slides
const generateSlides = (products) => {
  return (
    <>
      <SwiperSlide>
        <div className="flex flex-col gap-4">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b p-4"
            >
              <Link to={`/productdetail/${product.id}`}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-20 w-20 object-cover"
                />
              </Link>
              <div>
                <p className="text-xs text-gray-500">{product.cat}</p>
                <p className="font-bold">{product.name}</p>
                <p className="font-bold text-red-500">
                  {product.price}$
                  <s className="text-gray-400">{product.oldPrice}$</s>
                </p>
              </div>
            </div>
          ))}
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex flex-col gap-4">
          {products.slice(3, 6).map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b p-4"
            >
              <Link to={`/productdetail/${product.id}`}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-20 w-20 object-cover"
                />
              </Link>
              <div>
                <p className="text-xs text-gray-500">{product.cat}</p>
                <p className="font-bold">{product.name}</p>
                <p className="font-bold text-red-500">
                  {product.price}$
                  <s className="text-gray-400">{product.oldPrice}$</s>
                </p>
              </div>
            </div>
          ))}
        </div>
      </SwiperSlide>
    </>
  );
};

export const TopSelling = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:flex md:justify-between lg:flex lg:justify-between">
      {/* First Column */}
      <div className="w-full max-w-xs md:w-1/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">TOP SELLING</h2>
          <div className="flex gap-2">
            <button className="btn-prev-1 rounded-full border p-2">
              <ChevronLeft size={18} />
            </button>
            <button className="btn-next-1 rounded-full border p-2">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.btn-next-1',
            prevEl: '.btn-prev-1',
          }}
          autoplay={{ delay: 5000 }}
          loop
          slidesPerView={1}
          spaceBetween={20}
        >
          {generateSlides(TopSellingProduct.Selling1)}
        </Swiper>
      </div>

      {/* Second Column */}
      <div className="w-full max-w-xs md:w-1/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">TOP SELLING</h2>
          <div className="flex gap-2">
            <button className="btn-prev-2 rounded-full border p-2">
              <ChevronLeft size={18} />
            </button>
            <button className="btn-next-2 rounded-full border p-2">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.btn-next-2',
            prevEl: '.btn-prev-2',
          }}
          autoplay={{ delay: 7000 }}
          loop
          slidesPerView={1}
          spaceBetween={20}
        >
          {generateSlides(TopSellingProduct.Selling2)}
        </Swiper>
      </div>

      {/* Third Column */}
      <div className="w-full max-w-xs md:w-1/3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">TOP SELLING</h2>
          <div className="flex gap-2">
            <button className="btn-prev-3 rounded-full border p-2">
              <ChevronLeft size={18} />
            </button>
            <button className="btn-next-3 rounded-full border p-2">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.btn-next-3',
            prevEl: '.btn-prev-3',
          }}
          autoplay={{ delay: 9000 }}
          loop
          slidesPerView={1}
          spaceBetween={20}
        >
          {generateSlides(TopSellingProduct.Selling3)}
        </Swiper>
      </div>
    </div>
  );
};
