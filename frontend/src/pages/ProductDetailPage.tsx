import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data (in real app, fetch based on id)
  const product = {
    id: 1,
    name: 'SS Belt Conveyor System',
    category: 'Conveyor Systems',
    price: '₹2,50,000',
    rating: 4.8,
    reviews: 24,
    images: [
      'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    description: 'Heavy-duty stainless steel belt conveyor system designed for pharmaceutical and food processing applications. Features variable speed drive, food-grade belting, and corrosion-resistant SS316 construction.',
    specifications: {
      material: 'SS316',
      capacity: '500 kg/hr',
      beltWidth: '600mm',
      length: '3000mm',
      motorPower: '2 HP',
      speed: '5-25 m/min',
      warranty: '2 Years',
      certification: 'CE, ISO',
    },
    features: [
      'SS316 stainless steel construction',
      'Variable speed drive with inverter',
      'Food-grade PU belt',
      'Emergency stop controls',
      'Height adjustable legs',
      'Easy cleaning design',
      'Corrosion resistant',
      'Low maintenance operation',
    ],
    technicalDrawing: 'https://images.pexels.com/photos/4846084/pexels-photo-4846084.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    datasheet: '#',
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Roller Conveyor System',
      price: '₹1,85,000',
      image: 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Chain Conveyor System',
      price: '₹3,25,000',
      image: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
  ];

  const handleInquiry = () => {
    // Handle inquiry submission
    alert('Inquiry sent! Our team will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-900">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-900">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/products"
          className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-900' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-blue-900 font-medium">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-900">{product.price}</div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Specifications</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-600">Material:</div>
                <div className="font-medium">{product.specifications.material}</div>
                <div className="text-gray-600">Capacity:</div>
                <div className="font-medium">{product.specifications.capacity}</div>
                <div className="text-gray-600">Belt Width:</div>
                <div className="font-medium">{product.specifications.beltWidth}</div>
                <div className="text-gray-600">Length:</div>
                <div className="font-medium">{product.specifications.length}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleInquiry}
                  className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  Send Inquiry
                </button>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  Get Quote
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="flex flex-col items-center space-y-1">
                  <TruckIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-600">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <CheckCircleIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-600">Certified Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-16 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 text-sm font-medium text-blue-900 border-b-2 border-blue-900">
                Specifications
              </button>
              <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Features
              </button>
              <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Documentation
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <table className="w-full text-sm">
                  <tbody className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="py-2 text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</td>
                        <td className="py-2 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Drawing</h3>
                <img
                  src={product.technicalDrawing}
                  alt="Technical Drawing"
                  className="w-full h-64 object-cover rounded-lg border"
                />
                <button className="mt-4 text-blue-900 hover:text-blue-700 text-sm font-medium">
                  Download Datasheet (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-blue-900 font-bold mt-2">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;