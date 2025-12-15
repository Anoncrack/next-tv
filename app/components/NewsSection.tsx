'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import newsData from '@/app/data/news.json';

const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Calendar: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Clock: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Eye: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
};

const NewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredArticle = newsData[0];
  const otherArticles = newsData.slice(1);

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!featuredArticle) return null;

  return (
    <section className="bg-forest py-24 px-4 sm:px-6 lg:px-8 text-ivory overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="label-upper text-terra mb-3 block">The Journal</span>
            <h2 className="heading-section text-ivory">Latest Dispatches</h2>
          </div>
          
          <div className="hidden lg:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-terra hover:border-terra hover:text-white transition-all duration-300 active:scale-95"
            >
              <Icons.ArrowLeft />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-terra hover:border-terra hover:text-white transition-all duration-300 active:scale-95"
            >
              <Icons.ArrowRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-auto lg:h-[600px]">
          
          <Link 
            href={featuredArticle.link}
            className="lg:col-span-5 relative group rounded-3xl overflow-hidden shadow-2xl h-[500px] lg:h-full cursor-pointer"
          >
            <Image
             src={featuredArticle.images?.[0] || ''}
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end items-start">
              
              <div className="flex items-center gap-3 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="bg-terra text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Featured
                </span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest border-l border-white/30 pl-3">
                  {featuredArticle.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-terra text-sm font-bold mb-3">
                <Icons.Calendar />
                <span>{featuredArticle.date}</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-4 group-hover:text-terra transition-colors duration-300">
                {featuredArticle.title}
              </h3>
              
              <p className="text-white/70 line-clamp-3 mb-6 max-w-md hidden md:block">
                {featuredArticle.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-1 group-hover:border-terra group-hover:text-terra transition-all">
                Read Story <Icons.ArrowRight />
              </span>
            </div>
          </Link>


          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div 
              ref={scrollRef}
              className="
                flex gap-6 overflow-x-auto snap-x snap-mandatory 
                pb-8 pt-4 px-1
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
              "
            >
              {otherArticles.map((item) => (
                <Link 
                  key={item.id}
                  href={item.link}
                  className="
                    relative group flex-shrink-0
                    w-[280px] md:w-[320px] 
                    h-[400px] lg:h-[450px]
                    snap-start
                    flex flex-col
                  "
                >
                  <div className="relative h-3/5 w-full rounded-2xl overflow-hidden mb-5">
                    <Image
                     src={item.images?.[0] || ''}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-white/50 text-xs mb-3 font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Icons.Calendar /> {item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-terra"><Icons.Clock /> {item.read_time || '3 min'}</span>
                    </div>

                    <h3 className="text-xl font-serif text-ivory leading-tight mb-3 group-hover:text-terra transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-ivory transition-colors">
                      <Icons.Eye /> Read Article
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="w-1 flex-shrink-0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsSection;