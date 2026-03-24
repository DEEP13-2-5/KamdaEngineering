import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Factory, Settings, FlaskConical, Container, Wrench, Award, Users, Clock, Shield } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'ISO certified manufacturing with stringent quality controls',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '25+ years of experience in industrial machinery',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'On-time delivery with comprehensive after-sales support',
    },
    {
      icon: Shield,
      title: 'Warranty',
      description: 'Comprehensive warranty and maintenance services',
    },
  ];

  const productCategories = [
    {
      icon: Settings,
      title: 'Conveyor Systems',
      description: 'Robust and efficient material handling solutions',
      image: 'https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      link: '/products/conveyor-systems',
    },
    {
      icon: Factory,
      title: 'Mixing Agitators',
      description: 'High-performance mixing solutions for various industries',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      link: '/products/mixing-agitators',
    },
    {
      icon: FlaskConical,
      title: 'Laboratory Furniture',
      description: 'Precision-engineered lab furniture and workstations',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      link: '/products/laboratory-furniture',
    },
    {
      icon: Container,
      title: 'Storage Tanks',
      description: 'Chemical-resistant stainless steel storage solutions',
      image: 'https://images.pexels.com/photos/4846084/pexels-photo-4846084.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      link: '/products/storage-tanks',
    },
    {
      icon: Wrench,
      title: 'Clamping Solutions',
      description: 'Precision clamping systems for industrial applications',
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      link: '/products/clamping-solutions',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Industrial Excellence in
                  <span className="text-orange-400 block">Stainless Steel</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Premier manufacturer of pharmaceutical machinery and industrial stainless steel fabrication products. 
                  Delivering precision, quality, and reliability for over 25 years.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 group"
                >
                  Explore Products
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  Get Custom Quote
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">500+</div>
                  <div className="text-sm text-blue-200">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">25+</div>
                  <div className="text-sm text-blue-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">100%</div>
                  <div className="text-sm text-blue-200">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <img
                  src="https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Industrial Machinery"
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-orange-600 p-4 rounded-xl shadow-lg">
                  <Factory className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why Choose Kamda Engineering?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine decades of expertise with cutting-edge technology to deliver unmatched quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-900 rounded-xl mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Product Range</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for pharmaceutical, chemical, and industrial applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={category.link}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-900" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <span className="inline-flex items-center text-blue-900 font-medium group-hover:text-orange-600 transition-colors">
                      Learn More
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-900 text-white text-lg font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              View All Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our experts for customized solutions and competitive quotes. 
              We're here to help you find the perfect industrial equipment for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Call Now: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;