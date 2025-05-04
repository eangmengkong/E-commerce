import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="wrapper">
      <div className="container mx-auto max-w-[75rem] py-4">
        {/* Mobile Menu Button - Visible only on mobile (sm and below), hidden on tablets (md) and laptops (lg) */}
        <button
          className="mb-4 block w-full rounded-lg bg-gray-100 p-3 text-center text-sm font-medium sm:block md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } flex flex-col items-center gap-2 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:flex md:flex-row md:justify-between`}
        >
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/hotdeals"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hot Deals
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink
            to="/laptops"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Laptops
          </NavLink>
          <NavLink
            to="/smartphones"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Smartphones
          </NavLink>
          <NavLink
            to="/cameras"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cameras
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-red-500 underline sm:w-auto sm:bg-transparent sm:p-2'
                : 'w-full rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 hover:bg-gray-200 sm:w-auto sm:bg-transparent sm:p-2'
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accessories
          </NavLink>
        </ul>
      </div>
      <hr className="h-5" />
    </div>
  );
};

export default Navbar;
