import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

const SidebarPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-auto">
      <ProSidebar 
        collapsed={collapsed} 
        width="100%"
        className="shadow-lg"
      >
        <Menu 
          iconShape="circle" 
          className="h-full bg-gray-900 p-3 text-white"
        >

          <MenuItem 
            icon={<FaHome />} 
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <Link to="/home" className="flex items-center justify-between w-full">
              <span>Home</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </Link>
          </MenuItem>

          <MenuItem 
            icon={<FaUser />} 
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <span>Profile</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </div>
          </MenuItem>

          <MenuItem
            icon={<FaShoppingCart />}
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <Link to="/cart" className="flex items-center justify-between w-full">
              <span>Cart</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </Link>
          </MenuItem>

          <MenuItem
            icon={<FaRegHeart />}
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <Link to="/wishlist" className="flex items-center justify-between w-full">
              <span>Wishlist</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </Link>
          </MenuItem>

          <MenuItem
            icon={<FaCog />}
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <span>Settings</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </div>
          </MenuItem>

          <MenuItem
            icon={<FaSignOutAlt />}
            className="rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <span>Logout</span>
              {!collapsed && <FaChevronRight className="text-sm" />}
            </div>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default SidebarPage;
