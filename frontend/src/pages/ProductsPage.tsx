import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Settings, Factory, FlaskConical, Container, Wrench } from 'lucide-react';
import { useListings } from '../context/ListingsContext';

const ProductsPage = () => {
  const { category } = useParams();
  const { listings } = useListings();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: category || '',
    material: '',
    capacity: '',
    priceRange: '',
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: Squares2X2Icon },
    { id: 'conveyor-systems', name: 'Conveyor Systems', icon: Settings },
    { id: 'mixing-agitators', name: 'Mixing Agitators', icon: Factory },
    { id: 'laboratory-furniture', name: 'Laboratory Furniture', icon: FlaskConical },
    { id: 'storage-tanks', name: 'Storage Tanks', icon: Container },
    { id: 'clamping-solutions', name: 'Clamping Solutions', icon: Wrench },
  ];

  const filteredProducts = useMemo(() => {
    return listings.filter(product => {
      if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      if (filters.material && product.material !== filters.material) {
        return false;
      }
      return true;
    });
  }, [filters, listings]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {category ? categories.find(c => c.id === category)?.name || 'Products' : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-900 text-white' : 'text-gray-400'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-900 text-white' : 'text-gray-400'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          filters.category === cat.id || (cat.id === 'all' && !filters.category)
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Material</h4>
                <div className="space-y-2">
                  {['All', 'SS304', 'SS316', 'SS316L'].map((material) => (
                    <button
                      key={material}
                      onClick={() => setFilters(prev => ({ ...prev, material: material === 'All' ? '' : material }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        (material === 'All' && !filters.material) || filters.material === material
                          ? 'bg-blue-50 text-blue-900 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({ category: '', material: '', capacity: '', priceRange: '' })}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium text-gray-700">
                        {product.material}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">Capacity: {product.capacity}</span>
                        <span className="text-lg font-bold text-blue-900">{product.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.specifications.slice(0, 2).map((spec, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-6 flex items-center space-x-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Material: {product.material}</span>
                          <span>Capacity: {product.capacity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-900 mb-2">{product.price}</div>
                        <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => setFilters({ category: '', material: '', capacity: '', priceRange: '' })}
                  className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;