import { FaPhoneVolume, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { HiCurrencyDollar } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import {
  Hotdeals,
  Laptops,
  Cameras,
  Smartphones,
  Accessories,
  ProductSummary,
  TopSellingProduct,
} from '../../api/product';
import { useState } from 'react';
import SidebarPage from './SidebarPage';

const Header = () => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Combine all products into one array
  const allItems = [
    ...Hotdeals,
    ...Laptops,
    ...Cameras,
    ...Smartphones,
    ...Accessories,
    ...ProductSummary.NewProduct,
    ...ProductSummary.TopSell,
    ...TopSellingProduct.Selling1,
    ...TopSellingProduct.Selling2,
    ...TopSellingProduct.Selling3,
  ];

  // Function to handle the search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === '') {
      setFilteredItems([]);
      return;
    }

    const results = allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredItems(results);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {' '}
      {/* Add this wrapper */}
      <div className="w-full bg-gray-600">
        {' '}
        {/* Remove container class */}
        {/* header-info */}
        <div className="top-header mx-auto w-full max-w-[75rem] p-2 text-white sm:flex sm:justify-between md:max-w-[90vw] md:px-2">
          {/* left */}
          <div className="hidden gap-3 sm:flex">
            <div className="flex items-center gap-1">
              <FaPhoneVolume className="text-red-700" />
              <h3 className="text-sm sm:text-base">+855 11 222 333</h3>
            </div>
            <div className="flex items-center gap-1">
              <IoIosMail className="text-red-700" />
              <h3 className="text-sm sm:text-base">mail@gmail.com</h3>
            </div>
            <div className="flex items-center gap-1">
              <FaLocationDot className="text-red-700" />
              <h3 className="text-sm sm:text-base">Phnom Penh</h3>
            </div>
          </div>
          {/* Right */}
          <div className="flex justify-end gap-3 sm:justify-start">
            <div className="flex items-center gap-1">
              <HiCurrencyDollar className="text-red-700" />
              <h3 className="text-sm sm:text-base">USD</h3>
            </div>
            <div className="flex items-center gap-1">
              <FaUserAlt className="text-red-700" />
              <h3 className="text-sm sm:text-base">My Account</h3>
            </div>
          </div>
        </div>
        <div className="main-header-container w-full bg-black py-4">
          <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between md:max-w-[90vw] md:flex-row md:items-center md:justify-between md:px-2">
            {/* Logo and Sidebar Toggle */}
            <div className="flex w-full items-center justify-between md:w-auto">
              <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-bold text-white">
                  LOGO
                </Link>
                {/* Sidebar Toggle - Now visible on all screens */}
                <button
                  className="text-white md:hidden"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </div>

            {/* Search Bar - Now visible on mobile and tablets */}
            <div className="relative w-full sm:flex-1 sm:px-4 md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full rounded-full bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <FaSearch />
                </button>
              </div>
              {/* Search Results Dropdown */}
              {search && filteredItems.length > 0 && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg bg-gray-800 shadow-lg">
                  <div className="max-h-60 overflow-y-auto">
                    {filteredItems.map((item) => (
                      <Link
                        key={item.id}
                        to={`/productdetail/${item.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-700"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-10 w-10 object-cover"
                        />
                        <div>
                          <p className="text-sm text-white">{item.name}</p>
                          <p className="text-xs text-gray-400">${item.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart and Wishlist */}
            <div className="flex w-full items-center justify-end gap-4 md:w-auto">
              <Link to="/wishlist" className="text-white hover:text-red-500">
                Wishlist
              </Link>
              <Link to="/cart" className="text-white hover:text-red-500">
                Cart
              </Link>
            </div>
          </div>
        </div>
        {/* Sidebar Dropdown - Now visible on all screens */}
        {isSidebarOpen && (
          <div className="fixed left-0 top-[120px] z-50 w-full bg-gray-900 shadow-lg">
            <div className="mx-auto w-full max-w-[75rem]">
              <SidebarPage />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
