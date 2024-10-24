import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import api from '../api/axios';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/verify', {
        email,
        verification_code: verificationCode
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Access</h2>
            <p className="text-gray-600 mb-4">Please sign up first to verify your email.</p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Go to Sign Up
            </button>
          </div>
        </div>
        <footer className="bg-black text-white py-10 rounded-t-3xl">
          <div className="container mx-auto px-4">
            <p className="text-center mb-4">Let's come be part of the changes</p>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Facebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Twitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Instagram />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Linkedin />
              </a>
            </div>
            <p className="text-center text-sm">© 2024 PovertyLine. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <div className="bg-white text-black min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Verify Your Email</h2>
          
          {success ? (
            <div className="bg-white shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4 text-center">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
              <h3 className="text-xl font-bold mb-2">Email Verified!</h3>
              <p className="text-gray-600 mb-4">Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4">
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4 text-center">
                  We've sent a verification code to<br />
                  <span className="font-semibold">{email}</span>
                </p>
                
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                    id="verificationCode"
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:scale-105"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
              </div>
            </form>
          )}
          
          <p className="text-center text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              Try signing up again
            </button>
          </p>
        </div>
      </div>
      
      <footer className="bg-black text-white py-10 rounded-t-3xl">
        <div className="container mx-auto px-4">
          <p className="text-center mb-4">Let's come be part of the changes</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Twitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Instagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              <Linkedin />
            </a>
          </div>
          <p className="text-center text-sm">© 2024 PovertyLine. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default VerifyEmail;