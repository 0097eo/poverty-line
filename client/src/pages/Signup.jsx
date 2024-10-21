import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { UserCircle, Mail, Lock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <>
    <div className="bg-white text-black min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h2 className="text-4xl font-bold mb-8 text-center">Join Us</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <UserCircle className="absolute left-4 top-3 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-800 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
    {/* Footer */}
    <footer className="bg-black text-white py-10 rounded-t-3xl">
      <div className="container mx-auto px-4">
        <p className="text-center mb-4">Let's come be part of the changes</p>
        <div className="flex justify-center space-x-4 mb-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Facebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Twitter /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Instagram /></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Linkedin /></a>
        </div>
        <p className="text-center text-sm">© 2024 PovertyLine. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default SignUp;