// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

import Sliderimg1 from '../assets/images/Slider1.jpg';
import Sliderimg2 from '../assets/images/Slider2.jpg';
import Sliderimg3 from '../assets/images/Slider3.jpg';
import Shop1 from '../assets/images/shop1.jpg';
import Shop2 from '../assets/images/shop2.jpeg';
import Shop3 from '../assets/images/shop3.jpg';
import Dealbanner from '../assets/images/hotdeal.png';
import { CartItemNewProduct, TopSelling } from '../components/product/Product-Item';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';

const HomePage = () => {
  const handleCountdownComplete = () => {
    console.log('Countdown completed!');
    console.log('See you next time!');
    
  };

  return (
    <div className="wrapper">
      <div className="container mx-auto max-w-[1200px]">
        {/* Slider */}
        <div className="slider mx-auto mb-10">
          <Swiper
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
            className="homepageSwiper"
          >
            {[Sliderimg1, Sliderimg2, Sliderimg3].map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  className="h-[20rem] w-full md:h-[25rem] lg:h-[30rem]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Collection */}
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden border bg-gray-300">
              <div className="red-overlay"></div>
              <Link to={`/laptops`}>
                <div className="absolute left-5 top-5 z-10 text-white">
                  <h1 className="text-xl font-bold">
                    Laptop <br /> Collection
                  </h1>
                  <span className="text-sm">Shop Now →</span>
                </div>
              </Link>
              <img src={Shop1} className="h-[300px] w-full object-cover" />
            </div>

            <div className="relative overflow-hidden border bg-gray-300">
              <div className="red-overlay"></div>
              <Link to={`/cameras`}>
                <div className="absolute left-5 top-5 z-10 text-white">
                  <h1 className="text-xl font-bold">
                    Cameras <br />
                    Collection
                  </h1>
                  <span className="text-sm">Shop Now →</span>
                </div>
              </Link>
              <img src={Shop2} className="h-[300px] w-full object-cover" />
            </div>
            <div className="relative overflow-hidden border bg-gray-300">
              <div className="red-overlay"></div>
              <Link to={`/accessories`}>
                <div className="absolute left-5 top-5 z-10 text-white">
                  <h1 className="text-xl font-bold">
                    Accessories <br /> Collection
                  </h1>
                  <span className="text-sm">Shop Now →</span>
                </div>
              </Link>
              <img src={Shop3} className="h-[300px] w-full object-cover" />
            </div>
          </div>
        </div>

        {/* NEW PRODUCT */}
        <div className="new-product">
          <div className="py-10">
            <h2 className="font-bold">NEW PRODUCT</h2>
          </div>

          {/* new-product-cart */}
          <div>
            <CartItemNewProduct />
          </div>
        </div>

        {/* Hot-Deal-This-Week */}
        <div className="relative h-[500px] w-full">
          <img
            src={Dealbanner}
            alt="Deal Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <CountdownTimer 
              initialDays={7}
              onComplete={handleCountdownComplete}
              autoRestart={true}
              restartDelay={1000}
            />
            <div className="mt-3 place-items-center">
              <h1 className="text-[1.875rem] font-extrabold">
                HOT DEAL THIS WEEK
              </h1>
              <h2 className="text-[1.375rem] text-gray-400">
                NEW COLLECTION UP TO 50% OFF
              </h2>
              <button className="mt-5 rounded-full bg-red-600 p-3 text-white">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Top seller */}

        <div className="mb-10">
          <div className="py-10">
            <h2 className="font-bold">TOP SELLING</h2>
          </div>
          <div>
            <TopSelling />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
