import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchRecords, 
  createRecord, 
  updateRecord, 
  deleteRecord,
  setFilters,
  clearFilters
} from '../redux/recordsSlice';
import { Search, Filter, Trash2, Edit, ChevronLeft, ChevronRight, Plus, ArrowUpDown, X, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Delete Record</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this record? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

const RecordsPage = () => {
  const dispatch = useDispatch();
  const { items, meta, filters, status, error } = useSelector((state) => state.records);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [sortField, setSortField] = useState('region');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // New state for regions and social backgrounds
  const [regions, setRegions] = useState([]);
  const [socialBackgrounds, setSocialBackgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    region_id: '',
    social_background_id: '',
    income: '',
    education_level: '',
    employment_status: ''
  });

  // Fetch regions and social backgrounds on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [regionsResponse, socialBackgroundsResponse] = await Promise.all([
          api.get('/regions'),
          api.get('/social-backgrounds')
        ]);
        
        setRegions(regionsResponse.data);
        setSocialBackgrounds(socialBackgroundsResponse.data);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        toast.error('Failed to load necessary data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    dispatch(fetchRecords({ 
      ...filters, 
      page: meta.page, 
      per_page: meta.per_page,
      sort_by: sortField,
      sort_direction: sortDirection
    }));
  }, [dispatch, filters, meta.page, meta.per_page, sortField, sortDirection]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
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

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRecord(id)).unwrap();
      dispatch(fetchRecords({ ...filters, page: meta.page, per_page: meta.per_page }));
      toast.success('Record deleted successfully');
    } catch (err) {
      toast.error('Failed to delete record');
      console.error('Failed to delete record:', err);
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      region_id: parseInt(record.region_id),
      social_background_id: parseInt(record.social_background_id),
      income: parseFloat(record.income),
      education_level: record.education_level,
      employment_status: record.employment_status
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingRecord(null);
    setFormData({
      region_id: '',
      social_background_id: '',
      income: '',
      education_level: '',
      employment_status: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await dispatch(updateRecord({ id: editingRecord.id, ...formData })).unwrap();
        toast.success('Record updated successfully');
      } else {
        await dispatch(createRecord(formData)).unwrap();
        toast.success('Record created successfully');
      }
      setShowModal(false);
      dispatch(fetchRecords({ ...filters, page: meta.page, per_page: meta.per_page }));
    } catch (err) {
      toast.error(`Failed to ${editingRecord ? 'update' : 'create'} record`);
      console.error('Failed to save record:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
          <div className="flex justify-between items-start mb-6 text-center">
            <h1 className="text-5xl font-bold ">Records Dashboard</h1>
            <button
              onClick={handleCreate}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Plus size={20} />
              New Record
            </button>
          </div>
          <p className="text-xl mb-8">Track and manage poverty data across regions</p>
          
          {/* Search and Filter Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by region..."
                  name="region"
                  value={filters.region || ''}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input
                  placeholder="Social Background"
                  name="social_background"
                  value={filters.social_background || ''}
                  onChange={handleFilterChange}
                  className="bg-white/10 rounded-xl py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  placeholder="Min Income"
                  name="min_income"
                  type="number"
                  value={filters.min_income || ''}
                  onChange={handleFilterChange}
                  className="bg-white/10 rounded-xl py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  placeholder="Max Income"
                  name="max_income"
                  type="number"
                  value={filters.max_income || ''}
                  onChange={handleFilterChange}
                  className="bg-white/10 rounded-xl py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['region', 'social_background', 'income', 'education_level', 'employment_status'].map((field) => (
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

      {/* Records Grid */}
      <section className="container mx-auto px-4 py-12">
        {status === 'loading' && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}
        
        {status === 'failed' && (
          <div className="text-center py-20 text-red-600">
            <p className="text-xl">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((record) => (
            <div key={record.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-purple-600 text-white px-6 py-4">
                <h3 className="text-xl font-bold">{record.region}</h3>
                <p className="text-sm opacity-80">{record.social_background}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Income</p>
                    <p className="text-lg font-bold">${record.income.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Education Level</p>
                    <p className="text-lg">{record.education_level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employment Status</p>
                    <p className="text-lg">{record.employment_status}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => handleEdit(record)}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  
                  <button
                    onClick={() => {
                      setDeleteRecordId(record.id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => dispatch(fetchRecords({ ...filters, page: meta.page - 1 }))}
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
            onClick={() => dispatch(fetchRecords({ ...filters, page: meta.page + 1 }))}
            disabled={meta.page >= meta.total_pages}
            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Create/Edit Modal */}
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
        {editingRecord ? 'Edit Record' : 'Create New Record'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-sm text-gray-500">Region</label>
            <select
            value={formData.region_id}
            onChange={(e) => setFormData({ ...formData, region_id: parseInt(e.target.value) })}
            className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            >
            <option value="">Select region</option>
            {regions.map((region) => (
                <option key={region.id} value={region.id}>
                {region.name}
                </option>
            ))}
            </select>
        </div>
        
        <div>
            <label className="text-sm text-gray-500">Social Background</label>
            <select
            value={formData.social_background_id}
            onChange={(e) => setFormData({ ...formData, social_background_id: parseInt(e.target.value) })}
            className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            >
            <option value="">Select social background</option>
            {socialBackgrounds.map((background) => (
                <option key={background.id} value={background.id}>
                {background.name}
                </option>
            ))}
            </select>
        </div>
        
        <div>
            <label className="text-sm text-gray-500">Income</label>
            <input
            type="number"
            value={formData.income}
            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            />
        </div>
        
        <div>
            <label className="text-sm text-gray-500">Education Level</label>
            <select
            value={formData.education_level}
            onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
            className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            >
            <option value="">Select education level</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="Doctorate">Doctorate</option>
            </select>
        </div>
        
        <div>
            <label className="text-sm text-gray-500">Employment Status</label>
            <select
            value={formData.employment_status}
            onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
            className="w-full rounded-xl border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            >
            <option value="">Select employment status</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Self-employed">Self-employed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
            <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
            {editingRecord ? 'Update' : 'Create'}
            </button>
        </div>
        </form>
    </div>
    </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(deleteRecordId)}
      />
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
    </div>
  );
};

export default RecordsPage;