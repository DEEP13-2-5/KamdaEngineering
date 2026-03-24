import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ExternalLink,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

const TrackQuote: React.FC = () => {
  const [email, setEmail] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quotes?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setQuotes(data.sort((a: Quote, b: Quote) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setSearched(true);
      } else {
        setError('Failed to fetch quotes. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (quoteId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quotes/${quoteId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Refresh quotes
        const updatedQuotes = quotes.map(q => 
          q.id === quoteId ? { ...q, status, updatedAt: new Date().toISOString() } : q
        );
        setQuotes(updatedQuotes);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return { icon: <Clock className="h-4 w-4" />, text: 'Under Review', color: 'text-orange-600 bg-orange-50 border-orange-100' };
      case 'quoted': return { icon: <MessageSquare className="h-4 w-4" />, text: 'Quote Received', color: 'text-blue-600 bg-blue-50 border-blue-100' };
      case 'approved': return { icon: <CheckCircle2 className="h-4 w-4" />, text: 'Approved', color: 'text-green-600 bg-green-50 border-green-100' };
      case 'rejected': return { icon: <XCircle className="h-4 w-4" />, text: 'Declined', color: 'text-red-600 bg-red-50 border-red-100' };
      default: return { icon: <Clock className="h-4 w-4" />, text: status, color: 'text-gray-600 bg-gray-50 border-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Track Your Quote</h1>
          <p className="mt-3 text-lg text-gray-600">Enter your email address to view the status of your requests</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 mb-10 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Enter your registered email (e.g. john@example.com)"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all disabled:opacity-50 shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center min-w-[140px]"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Find Quotes'
              )}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-600 flex items-center"><XCircle className="h-4 w-4 mr-1" /> {error}</p>}
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {quotes.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No quotes found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any quote requests associated with this email address.</p>
                <Link to="/get-quote" className="mt-6 inline-block text-blue-600 font-bold hover:underline">Request a New Quote</Link>
              </div>
            ) : (
              quotes.map((quote) => {
                const status = getStatusDisplay(quote.status);
                return (
                  <div key={quote.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      {/* Top Row: Product & Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                            <span className="font-mono">{quote.id}</span>
                            <span>•</span>
                            <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">{quote.product}</h2>
                        </div>
                        <div className={`px-4 py-2 rounded-full border flex items-center space-x-2 font-bold text-sm ${status.color}`}>
                          {status.icon}
                          <span className="uppercase tracking-wider">{status.text}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quote Details */}
                        <div className="lg:col-span-2 space-y-6">
                          {quote.adminPrice ? (
                            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 flex items-center">
                                <Shield className="h-4 w-4 mr-2" />
                                Official Pricing Offer
                              </h3>
                              <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                  <p className="text-xs text-blue-600/70 font-bold uppercase mb-1">Total Estimated Cost</p>
                                  <p className="text-3xl font-black text-blue-900">{quote.adminPrice}</p>
                                </div>
                                <div className="flex-[2]">
                                  <p className="text-xs text-blue-600/70 font-bold uppercase mb-1">Expert Note</p>
                                  <p className="text-gray-700 leading-relaxed italic">"{quote.adminNote || 'No additional notes provided.'}"</p>
                                </div>
                              </div>
                              
                              {quote.status === 'quoted' && (
                                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                  <button 
                                    onClick={() => handleUpdateStatus(quote.id, 'approved')}
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center shadow-lg shadow-green-600/20 active:scale-95"
                                  >
                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                    Approve & Proceed
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStatus(quote.id, 'rejected')}
                                    className="flex-1 bg-white text-gray-600 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center active:scale-95"
                                  >
                                    <XCircle className="h-5 w-5 mr-2" />
                                    Decline Offer
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 border-dashed text-center">
                              <Clock className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500 font-medium">Our engineering team is currently reviewing your technical requirements. We will provide a price estimate shortly.</p>
                            </div>
                          )}

                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Original Request</h4>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-gray-700 text-sm leading-relaxed">{quote.description || quote.message}</p>
                            </div>
                          </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                          {quote.photo && (
                            <div>
                              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Attachment</h4>
                              <a 
                                href={`${import.meta.env.VITE_SERVER_URL}${quote.photo}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block relative group rounded-xl overflow-hidden shadow-sm"
                              >
                                <img 
                                  src={`${import.meta.env.VITE_SERVER_URL}${quote.photo}`} 
                                  alt="Machine Photo" 
                                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <ExternalLink className="text-white h-6 w-6" />
                                </div>
                              </a>
                            </div>
                          )}
                          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Customer Info</p>
                              <p className="font-bold text-gray-900">{quote.name}</p>
                              <p className="text-xs text-gray-500">{quote.email}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Company</p>
                              <p className="font-bold text-gray-900">{quote.company || 'Personal Request'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">Quantity</p>
                              <p className="font-bold text-gray-900">{quote.quantity || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackQuote;
