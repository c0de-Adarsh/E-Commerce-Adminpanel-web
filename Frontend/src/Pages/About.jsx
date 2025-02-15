import React from 'react';
import { Heart, Star, Package, Clock } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Crafting Beautiful
            <span className="text-rose-600"> Shopping </span>
            Experiences
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe in making your shopping journey as delightful as the products you discover. 
            Every detail is thoughtfully curated to bring you joy and satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-purple-200 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
                  alt="Our boutique store"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="font-bold text-2xl text-gray-900">15K+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Why Choose Us?</h3>
              <p className="text-gray-600 leading-relaxed">
                With years of dedication to excellence, we've built a reputation for 
                exceptional service and quality products that speak to your style.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: 'Curated with Love',
                  desc: 'Each product is handpicked for quality and style',
                  color: 'rose'
                },
                {
                  icon: Package,
                  title: 'Premium Quality',
                  desc: 'Only the finest materials and craftsmanship',
                  color: 'purple'
                },
                {
                  icon: Clock,
                  title: 'Fast Delivery',
                  desc: 'Swift and secure shipping nationwide',
                  color: 'indigo'
                },
                {
                  icon: Star,
                  title: '5-Star Service',
                  desc: 'Dedicated support for your satisfaction',
                  color: 'amber'
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-full bg-${item.color}-50 flex items-center justify-center mb-4`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}