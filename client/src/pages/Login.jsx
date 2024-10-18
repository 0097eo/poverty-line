import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="bg-white text-black min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h2 className="text-4xl font-bold mb-8 text-center">Welcome Back</h2>
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
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <UserCircle className="absolute left-4 top-3 text-gray-400" size={20} />
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
                placeholder="Enter your password"
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;