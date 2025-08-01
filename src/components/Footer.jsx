import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/white.png';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaHeart
} from 'react-icons/fa';
import { MdPets, MdEmergency } from 'react-icons/md';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Veterinarians', path: '/veterinarians' },
    { name: 'Emergency Care', path: '/emergency' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contactus' }
  ];

  const services = [
    'General Checkups',
    'Vaccinations',
    'Surgery',
    'Emergency Care',
    'Dental Care',
    'Grooming'
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-500' },
    { icon: FaLinkedinIn, href: '#', color: 'hover:text-blue-700' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/50">
                  <img src={profilePic} alt="My Pet Doctor Logo" className="w-full h-full object-cover" />
                </div>
                <MdPets className="absolute -top-1 -right-1 text-blue-400 text-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  My Pet Doctor
                </h3>
                <p className="text-gray-300 text-sm">Caring for your companions</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Providing exceptional veterinary care with compassion and expertise. 
              Your pet's health and happiness is our top priority.
            </p>
            
            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <MdEmergency className="text-2xl text-white" />
                <div>
                  <p className="font-semibold text-white">24/7 Emergency</p>
                  <p className="text-red-100 text-sm">(555) 911-PETS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-center space-x-2">
                  <MdPets className="text-blue-400 text-sm flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Get in Touch</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Pet Care Street</p>
                  <p>Downtown, City 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>(555) 123-PETS</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>info@mypetdoctor.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaClock className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Mon-Fri: 8:00 AM - 8:00 PM</p>
                  <p>Sat-Sun: 9:00 AM - 6:00 PM</p>
                  <p className="text-red-300 font-medium">Emergency: 24/7</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="font-semibold text-white mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={`Follow us on ${social.icon.name}`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300">Get pet care tips and health updates delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 lg:w-64"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} My Pet Doctor. Made with</span>
              <FaHeart className="text-red-500 text-sm" />
              <span>for pets and their families.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
