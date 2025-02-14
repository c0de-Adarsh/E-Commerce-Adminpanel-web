import React, { useState, useEffect, useRef } from 'react';
import { User, LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setIsLoginFalse } from '../Slice/UserSlice';
import { removeAllWhenLogout } from '../Actions/cartActions';
import { toast } from 'react-toastify';

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    dispatch(getAllProductsForAdmin());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    setIsOpen(false); // Close dropdown after click
  };

  const handleNavigation = () => {
    setIsOpen(false); // Close dropdown after any navigation
  };

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(removeAllWhenLogout());
    dispatch(setIsLoginFalse());
    // Move this line before navigation
    toast.success("Logout Successful!");
    setIsOpen(false);
    navigate('/');
  };
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {me?.avatar?.[0]?.url ? (
          <img 
            src={me.avatar[0].url} 
            alt="Profile" 
            className="h-8 w-8 rounded-full  object-cover"
          />
        ) : (
          <img 
            src="/Images/avatar.png" 
            alt="Default Avatar"
            className="h-8 w-7 rounded-full object-cover" 
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-[10px] w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/account"
              onClick={handleNavigation}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="mr-3 h-4 w-4" />
              My Account
            </Link>

            {me?.role === "admin" && (
              <Link
                to="/dashboard"
                onClick={handleDashboardClick}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboard className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
            )}

            <Link
              to="/orders"
              onClick={handleNavigation}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <ShoppingCart className="mr-3 h-4 w-4" />
              My Orders
            </Link>

            <div className="border-t border-gray-200" />

            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;