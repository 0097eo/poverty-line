import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    per_page: 9,
    total_pages: 0,
    total_items: 0
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('full_name');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchProfiles = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get('/profiles', {
        params: {
          page,
          per_page: meta.per_page,
          location: filters.location,
          sort_by: sortField,
          sort_direction: sortDirection
        }
      });
      setProfiles(response.data.profiles);
      setMeta(response.data.meta);
    } catch (error) {
      toast.error('Failed to fetch profiles');
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortField, sortDirection, meta.per_page]);

  useEffect(() => {
    fetchProfiles(meta.page);
  }, [meta.page, fetchProfiles]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setShowFilters(false);
    toast.success('Filters cleared');
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      {/* Header Section */}
      <section className="bg-black text-white rounded-b-3xl relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-6 text-center">Profile Directory</h1>
          <p className="text-xl mb-8 text-center">Discover and connect with users in your area</p>
          
          {/* Search and Filter Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by location..."
                  name="location"
                  value={filters.location || ''}
                  onChange={handleFilterChange}
                  className="w-full bg-white/10 rounded-xl py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                >
                  <Filter size={20} />
                  Filters
                </button>
                {Object.values(filters).some(x => x) && (
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  placeholder="Bio keywords"
                  name="bio"
                  value={filters.bio || ''}
                  onChange={handleFilterChange}
                  className="bg-white/10 rounded-xl py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  placeholder="Name"
                  name="name"
                  value={filters.name || ''}
                  onChange={handleFilterChange}
                  className="bg-white/10 rounded-xl py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['full_name', 'location'].map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  sortField === field ? 'bg-purple-600' : 'bg-white/10'
                }`}
              >
                {field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                {sortField === field && (
                  <ArrowUpDown size={16} className={sortDirection === 'desc' ? 'transform rotate-180' : ''} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div key={profile.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-purple-600 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">{profile.full_name}</h3>
                  <p className="text-sm opacity-80">📍 {profile.location}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => fetchProfiles(meta.page - 1)}
            disabled={meta.page <= 1}
            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <span className="text-gray-600">
            Page {meta.page} of {meta.total_pages}
          </span>
          
          <button
            onClick={() => fetchProfiles(meta.page + 1)}
            disabled={meta.page >= meta.total_pages}
            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 rounded-t-3xl">
        <div className="container mx-auto px-4">
          <p className="text-center mb-4">Connect with us on social media</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Facebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Twitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Instagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300"><Linkedin /></a>
          </div>
          <p className="text-center text-sm">© 2024 Profile Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileList;