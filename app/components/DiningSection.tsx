'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import diningData from '@/app/data/dining.json';

const IconArrowRight = () => (
  <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const DiningSection = () => {
  return (
    <section className="bg-forest py-24 md:py-32 relative overflow-hidden">
      
      

      <div className="max-w-386 mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center mb-32">
          <span className="label-upper text-terra mb-4 block">Culinary Alchemy</span>
          <h2 className="heading-section text-ivory">
            A Narrative of <br/> <span className="italic text-terra">Fire & Ice</span>
          </h2>
        </div>

        <div className="flex flex-col gap-32 lg:gap-40">
          {diningData.map((item, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div 
                key={item.id} 
                className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                
                <div className="w-full lg:w-7/12 relative group">
                  <div className="relative aspect-4/3 w-full overflow-hidden shadow-2xl rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-3 border border-white/20 opacity-50 pointer-events-none rounded-xl"></div>
                  </div>
                </div>

                <div className={`
                  w-[90%] lg:w-5/12 relative z-10
                  -mt-16 lg:mt-0
                  ${isEven ? 'lg:-mr-24' : 'lg:-ml-24'} 
                `}>
                  <div className={`
                    bg-forest/95 backdrop-blur-md border border-white/10 p-8 md:p-12 shadow-2xl
                    flex flex-col items-start
                    transition-colors duration-500 hover:border-terra/30
                    
                    /* УНИКАЛЬНАЯ ФОРМА: 
                    ${isEven 
                      ? 'rounded-tl-[4rem] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl' 
                      : 'rounded-tr-[4rem] rounded-bl-2xl rounded-tl-2xl rounded-br-2xl'
                    }
                  `}>
                    
                    <span className="text-terra text-xs font-bold uppercase tracking-widest mb-4">
                      {item.subtitle}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-serif text-ivory mb-6 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-ivory/70 leading-relaxed font-sans mb-8 text-sm md:text-base">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider border border-white/20 text-white/60 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={item.link}>
                      <button className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-ivory hover:text-terra transition-colors">
                        Book Table
                        <div className="w-8 h-px bg-ivory/30 group-hover:bg-terra transition-colors"></div>
                        <IconArrowRight />
                      </button>
                    </Link>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DiningSection;