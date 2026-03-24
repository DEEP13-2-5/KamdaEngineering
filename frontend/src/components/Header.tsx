import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Factory, Settings, FlaskConical, Container, Wrench, Shield, LogOut, LayoutDashboard, UserCircle, ChevronDown } from 'lucide-react';
import AuthPanel from './AuthPanel';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authPanelOpen, setAuthPanelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Products', href: '/products', current: location.pathname.startsWith('/products') },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
    { name: 'Track Quote', href: '/track-quote', current: location.pathname === '/track-quote' },
  ];

  const productCategories = [
    { name: 'Conveyor Systems', href: '/products/conveyor-systems', icon: Settings },
    { name: 'Mixing Agitators', href: '/products/mixing-agitators', icon: Factory },
    { name: 'Laboratory Furniture', href: '/products/laboratory-furniture', icon: FlaskConical },
    { name: 'Storage Tanks', href: '/products/storage-tanks', icon: Container },
    { name: 'Clamping Solutions', href: '/products/clamping-solutions', icon: Wrench },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <span>📧 info@kamdaengineering.com</span>
              <span>📞 +91 98765 43210</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>🕒 Mon-Sat: 9:00 AM - 6:00 PM</span>
              {isAuthenticated && user && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isAdmin
                    ? 'bg-orange-500 text-white'
                    : 'bg-blue-400 bg-opacity-30 text-blue-100'
                }`}>
                  {isAdmin ? '⚡ Admin' : '👤 User'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-900 p-2 rounded-lg">
              <Factory className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kamda Engineering</h1>
              <p className="text-sm text-gray-600">Industrial Solutions</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors ${
                  item.current
                    ? 'text-blue-900 border-b-2 border-blue-900'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Admin Dashboard Link */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-base font-medium transition-colors flex items-center space-x-1 ${
                  location.pathname === '/admin'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-orange-600 hover:text-orange-700'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Auth Area */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                /* Logged-in User Menu */
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className={`p-1 rounded-full ${
                      isAdmin ? 'bg-orange-100' : 'bg-blue-100'
                    }`}>
                      {isAdmin ? (
                        <Shield className={`h-5 w-5 text-orange-600`} />
                      ) : (
                        <UserCircle className={`h-5 w-5 text-blue-600`} />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</p>
                      <p className="text-xs text-gray-500 leading-tight">{user.role}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <span className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            isAdmin
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isAdmin ? (
                              <><Shield className="h-3 w-3 mr-1" /> Admin</>
                            ) : (
                              <><UserCircle className="h-3 w-3 mr-1" /> User</>
                            )}
                          </span>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Not Logged In */
                <button
                  onClick={() => setAuthPanelOpen(true)}
                  className="text-gray-700 hover:text-blue-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  Login
                </button>
              )}
              <Link
                to="/track-quote"
                className="text-gray-700 hover:text-blue-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-200"
              >
                Track Quote
              </Link>
              <Link
                to="/get-quote"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-sm"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${isAdmin ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  {isAdmin ? (
                    <Shield className="h-4 w-4 text-orange-600" />
                  ) : (
                    <UserCircle className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name.split(' ')[0]}</span>
              </div>
            ) : (
              <button
                onClick={() => setAuthPanelOpen(true)}
                className="text-gray-700 hover:text-blue-900 font-medium px-2 py-1 rounded hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Product categories bar */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-2">
            {productCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.name}
                  to={category.href}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-900 whitespace-nowrap py-2 transition-colors"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthPanelOpen(true);
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                Login / Sign Up
              </button>
            )}
            <Link
              to="/get-quote"
              className="block w-full text-center bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}

      {/* Auth Panel */}
      <AuthPanel isOpen={authPanelOpen} onClose={() => setAuthPanelOpen(false)} />
    </header>
  );
};

export default Header;