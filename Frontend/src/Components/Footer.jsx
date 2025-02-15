import React, { useState } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Clock,
  Heart,
  ArrowRight,
  Globe,
  Award,
  Gift,
  Link
} from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Features Section with Gradient Background */}
      {/* <div className=" bg-blue-800 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered('shipping')}
              onMouseLeave={() => setIsHovered('')}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Truck className={`w-8 h-8 text-white transition-all duration-300 ${isHovered === 'shipping' ? 'rotate-12' : ''}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Express Shipping</h3>
                  <p className="text-white/80">Free on orders over $100</p>
                </div>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered('security')}
              onMouseLeave={() => setIsHovered('')}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Shield className={`w-8 h-8 text-white transition-all duration-300 ${isHovered === 'security' ? 'rotate-12' : ''}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Secure Shopping</h3>
                  <p className="text-white/80">100% Protected Checkout</p>
                </div>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered('support')}
              onMouseLeave={() => setIsHovered('')}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Clock className={`w-8 h-8 text-white transition-all duration-300 ${isHovered === 'support' ? 'rotate-12' : ''}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">24/7 VIP Support</h3>
                  <p className="text-white/80">Dedicated Assistance</p>
                </div>
              </div>
            </div>
            <div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered('payment')}
              onMouseLeave={() => setIsHovered('')}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <CreditCard className={`w-8 h-8 text-white transition-all duration-300 ${isHovered === 'payment' ? 'rotate-12' : ''}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Flexible Payment</h3>
                  <p className="text-white/80">Multiple Options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2560')] opacity-5"></div>
        
        {/* Newsletter Section */}
        <div className="relative border-b border-gray-800 ">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-3">Join Our Elite Circle</h3>
                <p className="text-gray-400 text-lg max-w-md">
                  Subscribe for exclusive offers, early access, and VIP treatment
                </p>
              </div>
              <div className="w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 pr-4 py-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 w-full"
                    />
                  </div>
                  <button className="group px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-indigo-500/25">
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-8 h-8 text-indigo-500" />
                <h4 className="text-2xl font-bold text-white">ShopMart</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Elevating your shopping experience with curated ShopMartproducts and unparalleled service. Your satisfaction is our highest priority.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="group">
                  <div className="bg-gray-800 p-3 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-indigo-600">
                    <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="bg-gray-800 p-3 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-indigo-600">
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="bg-gray-800 p-3 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-indigo-600">
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </a>
                <a href="#" className="group">
                  <div className="bg-gray-800 p-3 rounded-lg transform hover:scale-110 transition-all duration-300 hover:bg-indigo-600">
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Award className="w-5 h-5 text-indigo-500" />
                <span>Quick Links</span>
              </h4>
              <ul className="space-y-4">
                {['About Us', 'Contact Us', 'Terms & Conditions', 'Privacy Policy', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-indigo-500" />
                <span>Customer Care</span>
              </h4>
              <ul className="space-y-4">
                {['My Account', 'Track Order', 'Wishlist', 'Shopping Cart', 'Returns'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Gift className="w-5 h-5 text-indigo-500" />
                <span>Get In Touch</span>
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 group">
                  <div className="bg-gray-800 p-3 rounded-lg transform group-hover:scale-110 transition-all duration-300 group-hover:bg-indigo-600">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-400 flex-1">
                    123 ShopMartAvenue<br />
                    Fashion District<br />
                    New York, NY 10001
                  </span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="bg-gray-800 p-3 rounded-lg transform group-hover:scale-110 transition-all duration-300 group-hover:bg-indigo-600">
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-400">+1 (888) ShopMart</span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="bg-gray-800/80 p-3 rounded-lg transform group-hover:scale-110 transition-all duration-300 group-hover:bg-indigo-600">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-400">vip@ShopMart.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative border-t border-gray-800 bg-black/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <p className="text-gray-400 text-sm">
                  © 2025 ShopMart. All rights reserved. Designed and developed by <a className='underline' href="https://adarsh-web-portfolio.netlify.app/">Adarsh</a>
                </p>
                
              </div>
              <div className="flex flex-wrap justify-center gap-6">
               
                <img src="/pay.png" alt="Mastercard" className="h-8 hover:opacity-80 transition-opacity duration-300" />
                <img src="/master.png" alt="American Express" className="h-8 hover:opacity-80 transition-opacity duration-300" />
                <img src="/visa.png" alt="PayPal" className="h-8 hover:opacity-80 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;