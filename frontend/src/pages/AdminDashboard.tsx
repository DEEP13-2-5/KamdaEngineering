import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import {
  Plus,
  Trash2,
  Package,
  Search,
  Shield,
  LayoutDashboard,
  X,
  ImageIcon,
  Tag,
  DollarSign,
  FileText,
  Layers,
  Ruler,
  Wrench,
  MessageSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  email: string;
  company?: string;
  product: string;
  quantity?: string;
  description?: string;
  message?: string;
  photo?: string;
  status: 'pending' | 'quoted' | 'approved' | 'rejected';
  adminPrice?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { listings, addListing, deleteListing } = useListings();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'conveyor-systems',
    price: '',
    image: '',
    material: 'SS304',
    capacity: '',
    description: '',
    specifications: '',
  });

  const [activeTab, setActiveTab] = useState<'listings' | 'quotes'>('quotes');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyData, setReplyData] = useState({ price: '', note: '' });

  React.useEffect(() => {
    fetchQuotes();
  }, []);

  React.useEffect(() => {
    if (activeTab === 'quotes') {
      fetchQuotes();
    }
  }, [activeTab]);

  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quotes`);
      const data = await response.json();
      setQuotes(data.sort((a: Quote, b: Quote) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoadingQuotes(false);
    }
  };

  // Redirect non-admin users
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredListings = listings.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    addListing({
      name: formData.name,
      category: formData.category,
      price: formData.price,
      image: formData.image || 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      material: formData.material,
      capacity: formData.capacity,
      description: formData.description,
      specifications: formData.specifications.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setFormData({
      name: '',
      category: 'conveyor-systems',
      price: '',
      image: '',
      material: 'SS304',
      capacity: '',
      description: '',
      specifications: '',
    });
    setShowCreateModal(false);
  };

  const handleDelete = (id: string) => {
    deleteListing(id);
    setDeleteConfirmId(null);
  };

  const categories = [
    { value: 'conveyor-systems', label: 'Conveyor Systems' },
    { value: 'mixing-agitators', label: 'Mixing Agitators' },
    { value: 'laboratory-furniture', label: 'Laboratory Furniture' },
    { value: 'storage-tanks', label: 'Storage Tanks' },
    { value: 'clamping-solutions', label: 'Clamping Solutions' },
  ];

  const materials = ['SS304', 'SS316', 'SS316L', 'MS', 'Aluminum'];

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'conveyor-systems': 'bg-blue-100 text-blue-800',
      'mixing-agitators': 'bg-purple-100 text-purple-800',
      'laboratory-furniture': 'bg-green-100 text-green-800',
      'storage-tanks': 'bg-amber-100 text-amber-800',
      'clamping-solutions': 'bg-rose-100 text-rose-800',
    };
    return colors[cat] || 'bg-gray-100 text-gray-800';
  };

  const handleReplySubmit = async (quoteId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quotes/${quoteId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyData),
      });

      if (response.ok) {
        setReplyingTo(null);
        setReplyData({ price: '', note: '' });
        fetchQuotes();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'quoted': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-15 backdrop-blur-sm p-3 rounded-xl">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-blue-200 mt-1 flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Welcome, {user.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-600/30"
            >
              <Plus className="h-5 w-5" />
              <span>New Listing</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-300" />
                <div>
                  <p className="text-2xl font-bold">{listings.length}</p>
                  <p className="text-blue-200 text-sm">Total Listings</p>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Layers className="h-8 w-8 text-green-300" />
                <div>
                  <p className="text-2xl font-bold">
                    {new Set(listings.map((l) => l.category)).size}
                  </p>
                  <p className="text-blue-200 text-sm">Categories</p>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Wrench className="h-8 w-8 text-amber-300" />
                <div>
                  <p className="text-2xl font-bold">
                    {new Set(listings.map((l) => l.material)).size}
                  </p>
                  <p className="text-blue-200 text-sm">Materials</p>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-orange-300" />
                <div>
                  <p className="text-2xl font-bold">Admin</p>
                  <p className="text-blue-200 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-8 bg-white bg-opacity-10 backdrop-blur-sm p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'listings'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Manage Listings
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'quotes'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <span>Quote Requests</span>
              {quotes.filter(q => q.status === 'pending').length > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                  {quotes.filter(q => q.status === 'pending').length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'listings' ? (
          <>
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings by name, category, material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <p className="text-sm text-gray-500">
                Showing {filteredListings.length} of {listings.length} listings
              </p>
            </div>

            {/* Listings Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredListings.map((listing) => (
                      <tr
                        key={listing.id}
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={listing.image}
                              alt={listing.name}
                              className="w-14 h-14 rounded-lg object-cover ring-1 ring-gray-200"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">{listing.name}</p>
                              <p className="text-sm text-gray-500 max-w-xs truncate">
                                {listing.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              listing.category
                            )}`}
                          >
                            {categories.find((c) => c.value === listing.category)?.label ||
                              listing.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-medium">{listing.material}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-blue-900">{listing.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{listing.createdAt}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {deleteConfirmId === listing.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <span className="text-xs text-red-600 font-medium">Delete?</span>
                              <button
                                onClick={() => handleDelete(listing.id)}
                                className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors font-medium"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors font-medium"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(listing.id)}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="text-sm font-medium">Delete</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No listings found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchQuery ? 'Try a different search term' : 'Create your first listing to get started'}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-4 inline-flex items-center space-x-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Create Listing</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {loadingQuotes ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading requests...</p>
              </div>
            ) : quotes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No quote requests yet</h3>
                <p className="text-gray-500 mt-2">New requests from customers will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {quotes.map((quote) => (
                  <div key={quote.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                      {/* Photo Section */}
                      <div className="md:col-span-1 bg-gray-50 flex items-center justify-center p-4 border-r border-gray-100">
                        {quote.photo ? (
                          <a 
                            href={`${import.meta.env.VITE_SERVER_URL}${quote.photo}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="relative group block"
                          >
                            <img 
                              src={`${import.meta.env.VITE_SERVER_URL}${quote.photo}`} 
                              alt="Quote attachment" 
                              className="w-full h-40 object-cover rounded-lg shadow-sm group-hover:opacity-75 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="h-8 w-8 text-white drop-shadow-lg" />
                            </div>
                          </a>
                        ) : (
                          <div className="w-full h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="h-10 w-10 mb-2" />
                            <span className="text-xs">No photo attached</span>
                          </div>
                        )}
                      </div>

                      {/* Info Section */}
                      <div className="md:col-span-3 lg:col-span-4 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-2 lg:space-y-0">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{quote.name}</h3>
                            <p className="text-blue-600 font-medium">{quote.email}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(quote.status)}`}>
                              {quote.status}
                            </span>
                            <span className="flex items-center text-gray-400 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(quote.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Company</p>
                            <p className="text-gray-700 font-medium">{quote.company || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Product</p>
                            <p className="text-gray-900 font-bold">{quote.product}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Quantity</p>
                            <p className="text-gray-700 font-medium">{quote.quantity || 'Not specified'}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Message / Description</p>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {quote.description || quote.message}
                          </p>
                        </div>

                        {/* Admin Action / Reply Area */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          {quote.status === 'pending' || replyingTo === quote.id ? (
                            replyingTo === quote.id ? (
                              <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-bold text-blue-900 flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Prepare Quote Response
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs font-bold text-blue-700 uppercase mb-1">Estimated Price</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. ₹5,50,000"
                                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                      value={replyData.price}
                                      onChange={(e) => setReplyData({...replyData, price: e.target.value})}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-blue-700 uppercase mb-1">Admin Notes</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Valid for 30 days"
                                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                      value={replyData.note}
                                      onChange={(e) => setReplyData({...replyData, note: e.target.value})}
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <button 
                                    onClick={() => setReplyingTo(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    onClick={() => handleReplySubmit(quote.id)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
                                  >
                                    Send Quote to User
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  setReplyingTo(quote.id);
                                  setReplyData({ price: quote.adminPrice || '', note: quote.adminNote || '' });
                                }}
                                className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Reply with Quote
                              </button>
                            )
                          ) : (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                <h4 className="font-bold text-gray-900 flex items-center">
                                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                                  Your Official Response
                                </h4>
                                <span className="text-[10px] text-gray-400 uppercase font-bold bg-white px-2 py-0.5 rounded border border-gray-100">
                                  Last Updated: {quote.updatedAt ? new Date(quote.updatedAt).toLocaleDateString() : 'N/A'}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Quoted Price</p>
                                  <p className="text-blue-700 text-lg font-bold">{quote.adminPrice}</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Admin Note</p>
                                  <p className="text-gray-700 text-sm leading-relaxed">{quote.adminNote || 'No notes provided'}</p>
                                </div>
                              </div>
                              {quote.status === 'quoted' && (
                                <div className="mt-4 flex items-center">
                                  <div className="animate-pulse bg-blue-500 h-2 w-2 rounded-full mr-2"></div>
                                  <p className="text-xs text-blue-600 font-semibold italic">
                                    Waiting for user to approve or reject this offer...
                                  </p>
                                </div>
                              )}
                              {quote.status === 'approved' && (
                                <div className="mt-4 flex items-center text-green-600">
                                  <div className="bg-green-100 p-1 rounded-full mr-2">
                                    <Plus className="h-3 w-3" />
                                  </div>
                                  <p className="text-xs font-bold uppercase tracking-wider">
                                    Quote Approved by Customer
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-15 p-2 rounded-lg">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Create New Listing</h3>
                    <p className="text-blue-200 text-sm">Add a new product to the catalog</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
                <form onSubmit={handleCreateListing} className="space-y-5">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="SS Belt Conveyor System"
                      />
                    </div>
                  </div>

                  {/* Category & Material Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material *
                      </label>
                      <select
                        required
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        {materials.map((mat) => (
                          <option key={mat} value={mat}>
                            {mat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price & Capacity Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="₹2,50,000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacity *
                      </label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={formData.capacity}
                          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="500 kg/hr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg (optional)"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Heavy-duty stainless steel belt conveyor for pharmaceutical applications"
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specifications (comma-separated)
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        rows={2}
                        value={formData.specifications}
                        onChange={(e) =>
                          setFormData({ ...formData, specifications: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="SS316 Construction, Variable Speed Drive, Food Grade Belt"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 font-medium transform hover:scale-105"
                    >
                      Create Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
