import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-600 rounded-full mr-1"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
          <NavLink to="/" className="text-white hover:text-gray-300 text-xl font-semibold">
            PovertyLine
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
          >
            About
          </NavLink>
          <NavLink 
            to="/records" 
            className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
          >
            Records
          </NavLink>
          <NavLink 
            to="/categories" 
            className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
          >
            Categories
          </NavLink>
          <NavLink 
            to="/backgrounds" 
            className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
          >
            Backgrounds
          </NavLink>
          {isAuthenticated && (
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
            >
              Profile
            </NavLink>
          )}
          <NavLink 
            to="/members" 
            className={({ isActive }) => isActive ? "text-purple-400" : "text-white hover:text-gray-300"}
          >
            Members
          </NavLink>
        </div>
        {isAuthenticated ? (
          <button 
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;