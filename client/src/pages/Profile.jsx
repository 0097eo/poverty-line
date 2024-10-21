import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../redux/profileSlice';
import { Link } from "react-router-dom";
import { User, MapPin, Edit, Trash2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    location: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        location: profile.location || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      dispatch(updateProfile(formData)).then(() => {
        toast.success('Profile updated successfully');
        setEditing(false);
      });
    } else {
      dispatch(createProfile(formData)).then(() => {
        toast.success('Profile created successfully');
        setEditing(false);
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      dispatch(deleteProfile()).then(() => {
        toast.success('Profile deleted successfully');
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-black text-white rounded-b-3xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link to="/login" className="bg-purple-600 text-white px-6 py-2 rounded-full">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
    <div className="bg-white text-black min-h-screen">
      <ToastContainer />
      <section className="bg-black text-white rounded-b-3xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Your Profile</h1>
          <p className="text-xl mb-4">Manage your personal information</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        {!editing ? (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{profile?.full_name || 'Your Name'}</h2>
              <div>
                <button onClick={() => setEditing(true)} className="mr-2 bg-purple-600 text-white p-2 rounded-full">
                  <Edit size={20} />
                </button>
                <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded-full">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <User className="mr-2" size={20} />
              <p>{profile?.bio || 'No bio provided'}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" size={20} />
              <p>{profile?.location || 'Location not specified'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">{profile ? 'Edit Profile' : 'Create Profile'}</h2>
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setEditing(false)} className="mr-2 bg-gray-300 text-black px-6 py-2 rounded-full">Cancel</button>
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full">{profile ? 'Update Profile' : 'Create Profile'}</button>
            </div>
          </form>
        )}
      </section>
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

export default ProfilePage;