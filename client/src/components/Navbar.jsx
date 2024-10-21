import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Menu, X } from 'lucide-react';

const NavItem = ({ to, children, setIsOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block py-2 px-4 ${
        isActive ? 'text-purple-400' : 'text-white hover:text-gray-300'
      }`
    }
    onClick={() => setIsOpen(false)}
  >
    {children}
  </NavLink>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-600 rounded-full mr-1"></div>
            <div className="w-4 h-4 bg-green-400 rounded-full mr-2"></div>
            <NavLink to="/" className="text-white hover:text-gray-300 text-xl font-semibold">
              PovertyLine
            </NavLink>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavItem to="/about" setIsOpen={setIsOpen}>About</NavItem>
            <NavItem to="/records" setIsOpen={setIsOpen}>Records</NavItem>
            <NavItem to="/categories" setIsOpen={setIsOpen}>Categories</NavItem>
            <NavItem to="/backgrounds" setIsOpen={setIsOpen}>Backgrounds</NavItem>
            {isAuthenticated && <NavItem to="/profile" setIsOpen={setIsOpen}>Profile</NavItem>}
            <NavItem to="/members" setIsOpen={setIsOpen}>Members</NavItem>
          </div>
          <div className="hidden md:block">
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
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4">
            <NavItem to="/about" setIsOpen={setIsOpen}>About</NavItem>
            <NavItem to="/records" setIsOpen={setIsOpen}>Records</NavItem>
            <NavItem to="/categories" setIsOpen={setIsOpen}>Categories</NavItem>
            <NavItem to="/backgrounds" setIsOpen={setIsOpen}>Backgrounds</NavItem>
            {isAuthenticated && <NavItem to="/profile" setIsOpen={setIsOpen}>Profile</NavItem>}
            <NavItem to="/members" setIsOpen={setIsOpen}>Members</NavItem>
            <div className="mt-4">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 w-full"
                >
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className="block w-full" onClick={() => setIsOpen(false)}>
                  <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 w-full">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;