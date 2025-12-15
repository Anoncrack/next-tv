'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconVoyageArrow } from './icons/tvicons';

import roomsData from '@/app/data/rooms.json';

const IconQuote = () => (
  <svg className="w-8 h-8 md:w-12 md:h-12 text-terra/40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.896 14.325 15.992 14.941 15.288C15.557 14.584 16.746 13.923 18.508 13.305L18.736 12.632C17.551 12.395 16.791 11.907 16.455 11.168C16.119 10.429 15.951 9.388 15.951 8.045C15.951 7.218 16.037 6.362 16.209 5.477L13.829 6.012C13.63 7.042 13.531 8.045 13.531 9.021C13.531 10.887 13.911 12.355 14.671 13.424C15.431 14.493 16.212 15.209 17.015 15.571C16.326 15.907 15.656 16.49 15.005 17.321C14.354 18.152 14.025 19.378 14.017 21ZM5.525 21L5.525 18C5.525 16.896 5.833 15.992 6.449 15.288C7.065 14.584 8.254 13.923 10.016 13.305L10.244 12.632C9.059 12.395 8.299 11.907 7.963 11.168C7.627 10.429 7.459 9.388 7.459 8.045C7.459 7.218 7.545 6.362 7.717 5.477L5.337 6.012C5.138 7.042 5.039 8.045 5.039 9.021C5.039 10.887 5.419 12.355 6.179 13.424C6.939 14.493 7.72 15.209 8.523 15.571C7.834 15.907 7.164 16.49 6.513 17.321C5.862 18.152 5.533 19.378 5.525 21Z"/></svg>
);

const IconStar = () => (
  <svg className="terra4" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder, TechFlow',
    image: '/images/testimonials/u1.webp',
    quote: 'I shipped more code in one week at ThunderVoyage than I did in a month back home. The isolation is a feature, not a bug.',
    roomId: 101
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Pro Cyclist',
    image: '/images/testimonials/u2.webp',
    quote: 'The recovery facilities rival elite training centers. My FTP jumped 8% after using the altitude chamber daily.',
    roomId: 202
  },
  {
    id: 3,
    name: 'Elena & Mark',
    role: 'Architects',
    image: '/images/testimonials/u3.webp',
    quote: 'We needed a place to finish our blueprints without distraction. The "Monk Mode" cabin was exactly what we needed.',
    roomId: 103
  },
  {
    id: 4,
    name: 'Team Horizon',
    role: 'Esports Squad',
    image: '/images/testimonials/u4.webp',
    quote: 'Zero lag. Zero noise. Just pure focus. The dedicated fiber line and scrim room setups are world-class.',
    roomId: 402
  },
  {
    id: 5,
    name: 'Julian V.',
    role: 'Bio-Hacker',
    image: '/images/testimonials/u5.webp',
    quote: 'The sleep tracking bed and infrared sauna in the penthouse changed my entire morning routine. I have never slept deeper.',
    roomId: 302
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = TESTIMONIALS[activeIndex];
  const linkedRoom = roomsData.find(r => r.id === activeReview.roomId);

  return (
    <section className="bg-forest py-24 overflow-hidden relative">
      
      

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-20">
          <span className="label-upper text-terra/80 mb-3 block">Community Stories</span>
          <h2 className="heading-section text-ivory">
            Trusted by <span className="italic text-terra">Peak Performers</span>
          </h2>
        </div>

        <div className="relative h-[500px] md:h-[400px] flex items-center justify-center mb-12">
          
          {TESTIMONIALS.map((item, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1);
            const isNext = index === (activeIndex === TESTIMONIALS.length - 1 ? 0 : activeIndex + 1);
            
            let positionClass = 'z-0 opacity-0 scale-75 pointer-events-none translate-x-0';
            
            if (isActive) {
              positionClass = 'z-20 opacity-100 scale-100 translate-x-0 pointer-events-auto';
            } else if (isPrev) {
              positionClass = 'z-10 opacity-40 scale-90 -translate-x-[20%] md:-translate-x-[60%] cursor-pointer pointer-events-auto hover:opacity-60';
            } else if (isNext) {
              positionClass = 'z-10 opacity-40 scale-90 translate-x-[20%] md:translate-x-[60%] cursor-pointer pointer-events-auto hover:opacity-60';
            }

            const cardInnerStyle = isActive 
              ? 'bg-white/5 backdrop-blur-md'
              : 'bg-white/[0.02] backdrop-blur-sm';

            return (
              <div 
                key={item.id}
                onClick={() => {
                  if (isPrev || isNext) setActiveIndex(index);
                }}
                className={`
                  absolute top-0 
                  w-full max-w-3xl 
                  transition-[background-color,backdrop-filter] transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)
                  ${positionClass}
                `}
              >
                <div className={`
                  border border-white/10 rounded-3xl p-8 md:p-12 text-center md:text-left shadow-2xl
                  transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)
                  ${cardInnerStyle}
                `}>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-terra/50 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-forest text-terra p-2 rounded-full border border-white/10">
                        <IconQuote />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[1,2,3,4,5].map(s => <IconStar key={s} />)}
                      </div>
                      <blockquote className="font-serif text-xl md:text-2xl text-ivory italic leading-relaxed mb-6">
                        "{item.quote}"
                      </blockquote>
                      <div>
                        <h4 className="font-bold text-terra text-lg">{item.name}</h4>
                        <p className="text-white/40 text-sm uppercase tracking-wider">{item.role}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>

        <div className="flex justify-center gap-2 mb-16">
          {TESTIMONIALS.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-8 bg-terra' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {linkedRoom && (
          <div className="max-w-4xl mx-auto animate-[fadeInUp_0.7s_ease-out]" key={linkedRoom.id}>
            
            <div className="flex items-center gap-4 mb-6 opacity-60">
              <div className="h-[1px] flex-1 bg-white/20"></div>
              <span className="text-white/60 text-xs uppercase tracking-widest font-medium">
                Stays in
              </span>
              <div className="h-[1px] flex-1 bg-white/20"></div>
            </div>

            <div className="bg-ivory rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group">
              
              <div className="md:w-1/2 relative min-h-[250px] overflow-hidden">
                <Image 
                  src={linkedRoom.images[0]} 
                  alt={linkedRoom.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-forest shadow-sm">
                  {linkedRoom.category}
                </div>
              </div>

              <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-ivory to-white">
                <h3 className="font-serif text-2xl text-forest mb-3 leading-tight">
                  {linkedRoom.title}
                </h3>
                <p className="text-forest/70 text-sm line-clamp-2 mb-8 leading-relaxed">
                  {linkedRoom.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-forest/10">
                  <div className="text-forest flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${linkedRoom.price}</span>
                    <span className="text-xs text-forest/60 font-medium">/ night</span>
                  </div>
                  
                  <Link href={`/book?room=${linkedRoom.id}`} className="group/btn flex items-center gap-2 text-terra font-bold text-sm uppercase tracking-wider bg-terra/10 px-4 py-2 rounded-full hover:bg-terra/20 transition-colors">
                    Book Now 
                    <IconVoyageArrow className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;