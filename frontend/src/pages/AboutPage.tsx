import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Factory, Award, Users, Clock, Target, Shield } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '25+', label: 'Years Experience', icon: Clock },
    { number: '500+', label: 'Projects Completed', icon: Target },
    { number: '50+', label: 'Expert Engineers', icon: Users },
    { number: '100%', label: 'Client Satisfaction', icon: Award },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We maintain stringent quality controls throughout our manufacturing process to ensure every product meets international standards.',
    },
    {
      icon: Factory,
      title: 'Innovation',
      description: 'Continuous research and development drive our innovative solutions for complex industrial challenges.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our dedicated team works closely with clients to deliver customized solutions that exceed expectations.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from design to delivery and after-sales support.',
    },
  ];

  const certifications = [
    'ISO 9001:2015 Quality Management',
    'ISO 14001:2015 Environmental Management',
    'OHSAS 18001:2007 Occupational Health & Safety',
    'CE Marking Compliance',
    'FDA Approved Materials',
    'ASME Pressure Vessel Code',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Engineering Excellence
                <span className="text-orange-400 block">Since 1999</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Kamda Engineering Works has been at the forefront of pharmaceutical machinery and 
                industrial stainless steel fabrication for over two decades, delivering precision 
                engineering solutions to clients worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 2).map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-2">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-orange-400">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Manufacturing Facility"
                className="w-full h-80 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">ISO 9001</div>
                  <div className="text-sm text-gray-600">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-900 rounded-xl mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1999 by a team of experienced engineers, Kamda Engineering Works began as a 
                  small fabrication shop with a vision to provide high-quality stainless steel solutions 
                  to the growing pharmaceutical industry.
                </p>
                <p>
                  Over the years, we have evolved into a comprehensive manufacturing facility specializing 
                  in pharmaceutical machinery, laboratory furniture, and industrial equipment. Our commitment 
                  to innovation and quality has earned us recognition as a trusted partner for companies 
                  across various industries.
                </p>
                <p>
                  Today, we operate from a state-of-the-art facility equipped with modern machinery and 
                  employ over 50 skilled professionals who share our passion for engineering excellence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-900">1999</div>
                  <div className="text-sm text-gray-600">Company Founded</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-900">2025</div>
                  <div className="text-sm text-gray-600">Industry Leader</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/4491443/pexels-photo-4491443.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                alt="Manufacturing Process"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
                alt="Quality Control"
                className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our relationships with clients, 
              partners, and the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-900 rounded-xl mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Certifications & Standards</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our commitment to quality is validated by industry-leading certifications and 
                adherence to international standards.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">ISO 9001</div>
                  <div className="text-sm text-gray-600">Quality Management</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">ISO 14001</div>
                  <div className="text-sm text-gray-600">Environmental</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">OHSAS 18001</div>
                  <div className="text-sm text-gray-600">Health & Safety</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">CE Mark</div>
                  <div className="text-sm text-gray-600">European Conformity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Ready to Work with Us?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the difference that 25+ years of engineering excellence can make for your project. 
              Let's discuss your requirements and create the perfect solution together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Contact Our Team
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;