import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Building } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function TestimonialsSlider({ theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLight = theme === 'light';

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PLANT_DATA.testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PLANT_DATA.testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = PLANT_DATA.testimonials[currentIndex];

  return (
    <section className={`py-16 lg:py-24 border-t relative overflow-hidden transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Verified Client Reviews
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Trusted by <span className="text-gradient-cyan">500+ Water Brands</span> Nationwide
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Hear directly from factory owners, entrepreneurs, and industrial bottlers across India.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl relative transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-lg' : 'glass-panel border-cyan-500/30'
          }`}>
            <Quote className="w-16 h-16 text-cyan-500/10 absolute top-6 left-6 pointer-events-none" />

            <div className="flex text-amber-500 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className={`text-lg sm:text-xl font-medium leading-relaxed italic mb-8 relative z-10 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>
              "{current.review}"
            </p>

            <div className={`flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t gap-4 ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div>
                <h4 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{current.name}</h4>
                <div className="flex items-center space-x-3 text-xs mt-1">
                  <span className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold">
                    <Building className="w-3.5 h-3.5 mr-1" />
                    {current.company}
                  </span>
                  <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {current.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className={`inline-flex items-center px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  Setup: {current.capacity}
                </div>

                {/* Slider Navigation Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                      isLight ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                      isLight ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {PLANT_DATA.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === i ? 'w-8 bg-cyan-600' : 'w-2 bg-slate-300 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
