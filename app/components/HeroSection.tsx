'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import roomsData from '@/app/data/rooms.json';

import { 
  IconCalendar, 
  IconGuest, 
} from './icons/tvicons';

const IconBed = ({ className }: { className?: string }) => (
  <svg 
    className={className || "wh4"} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);

const IconChevronDown = ({ className }: { className?: string }) => (
  <svg 
    className={className || "wh4"} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const HERO_IMAGES = [
  "/images/hero/hero1.webp",
  "/images/hero/hero2.webp",
  "/images/hero/hero3.webp",
  "/images/hero/hero4.webp"
];

const HERO_LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Activities', href: '#activities' },
  { label: 'Dining', href: '#dining' },
  { label: 'Journal', href: '#news' }
];

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isRoomPickerOpen, setIsRoomPickerOpen] = useState(false);

  const selectedRoom = roomsData.find(r => r.id === selectedRoomId);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRoomPickerOpen) { 
        setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isRoomPickerOpen]);

  const changeSlide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    } else {
      setCurrentBg((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden bg-forest">
      
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1500 ease-in-out ${index === currentBg ? 'opacity-50' : 'opacity-0'}`}
        >
          <Image 
            src={img}
            alt="Thunder Voyage Hero"
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-forest/90" />
        </div>
      ))}

      <button 
        onClick={() => changeSlide('prev')}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 group p-4"
      >
        <div className="w-1.5 h-16 rounded-full bg-terra/60 cursor-pointer backdrop-blur-sm group-hover:bg-terra transition-all duration-500 group-hover:h-24 group-hover:w-2 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse group-hover:animate-none"></div>
      </button>
      
      <button 
        onClick={() => changeSlide('next')}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 group p-4"
      >
        <div className="w-1.5 h-16 rounded-full bg-terra/60 backdrop-blur-sm cursor-pointer group-hover:bg-terra transition-all duration-500 group-hover:h-24 group-hover:w-2 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse group-hover:animate-none"></div>
      </button>


      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 animate-[fadeInUp_1s_ease-out]">
        
        <span className="label-upper text-ivory/80 mb-6 tracking-[0.3em] border border-ivory/20 px-4 py-1 rounded-full bg-forest/20 backdrop-blur-sm">
          Welcome to Paradise
        </span>

        <h1 className="display-hero max-w-5xl text-ivory drop-shadow-2xl">
          <span className='text-terra' >Experience </span> Nature <br />
          <span className="not-italic font-light font-sans text-4xl md:text-6xl lg:text-7xl block mt-4 tracking-tight">
            in Luxury
          </span>
        </h1>

        <div className="hidden md:flex gap-10 mt-12 border-t border-ivory/20 pt-8">
           {HERO_LINKS.map((item) => (
             <a 
               key={item.label} 
               href={item.href} 
               className="text-xs font-sans uppercase tracking-[0.2em] text-ivory/70 hover:text-terra transition-colors font-bold"
             >
               {item.label}
             </a>
           ))}
        </div>
      </div>

      <div className="relative z-30 w-full px-4 flex justify-center animate-[fadeInUp_1.2s_ease-out_forwards] opacity-0 translate-y-4">
        
        <div className="relative w-full max-w-5xl">
          
          <div className="plate-glass p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 bg-forest/80 backdrop-blur-xl border border-white/10 shadow-2xl relative z-20">
            
            <div className="flex-1 w-full md:w-auto px-6 py-4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center cursor-pointer hover:bg-white/5 transition-colors rounded-2xl">
              <div className="flex items-center gap-3 mb-1">
                <IconCalendar className="wh4 text-terra" />
                <span className="label-upper text-[10px] text-ivory/50">Dates</span>
              </div>
              <div className="pl-7 text-sm font-sans text-ivory font-bold">Select Dates</div>
            </div>

            <div 
              className="flex-1 w-full md:w-auto px-6 py-4 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center cursor-pointer hover:bg-white/5 transition-colors rounded-2xl relative"
              onClick={() => setIsRoomPickerOpen(!isRoomPickerOpen)}
            >
              <div className="flex items-center gap-3 mb-1">
                <IconBed className="wh4 text-terra" />
                <span className="label-upper text-[10px] text-ivory/50">Room Type</span>
              </div>
              <div className="pl-7 flex items-center justify-between">
                <span className="text-sm font-sans text-ivory font-bold truncate max-w-[150px]">
                  {selectedRoom ? selectedRoom.title : "Choose a Room"}
                </span>
                <IconChevronDown className={`w-3 h-3 text-ivory/50 transition-transform ${isRoomPickerOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            <div className="flex-1 w-full md:w-auto px-6 py-4 flex flex-col justify-center cursor-pointer hover:bg-white/5 transition-colors rounded-2xl">
              <div className="flex items-center gap-3 mb-1">
                <IconGuest className="wh4 text-terra" />
                <span className="label-upper text-[10px] text-ivory/50">Guests</span>
              </div>
              <div className="pl-7 text-sm font-sans text-ivory font-bold">2 Guests</div>
            </div>

            <div className="p-2 w-full md:w-auto">
              <Link href={selectedRoom ? `/book?room=${selectedRoom.id}` : '/book'}>
                <button className="btn-accent w-full md:w-auto text-lg px-10 py-5 font-serif italic normal-case tracking-normal shadow-lg shadow-terra/20">
                  Check Availability
                </button>
              </Link>
            </div>

          </div>

          {isRoomPickerOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-4 z-10 animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-forest/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
                
                <div className="flex items-center justify-between mb-4 px-2">
                   <span className="text-xs font-bold uppercase tracking-widest text-terra">Select your Sanctuary</span>
                   <button onClick={(e) => { e.stopPropagation(); setIsRoomPickerOpen(false); }} className="text-ivory/50 hover:text-ivory text-xs">Close [x]</button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  <div 
                    onClick={() => { setSelectedRoomId(null); setIsRoomPickerOpen(false); }}
                    className={`
                      flex-shrink-0 w-32 p-4 rounded-xl border cursor-pointer transition-all snap-start flex items-center justify-center
                      ${selectedRoomId === null ? 'bg-terra text-ivory border-terra' : 'bg-white/5 border-white/10 text-ivory hover:border-terra/50'}
                    `}
                  >
                    <span className="text-sm font-bold">Any Room</span>
                  </div>

                  {roomsData.map((room) => (
                    <div 
                      key={room.id}
                      onClick={() => { setSelectedRoomId(room.id); setIsRoomPickerOpen(false); }}
                      className={`
                        flex-shrink-0 w-64 p-3 rounded-xl border cursor-pointer transition-all snap-start flex gap-3 items-center group
                        ${selectedRoomId === room.id ? 'bg-white/10 border-terra ring-1 ring-terra' : 'bg-white/5 border-white/10 hover:bg-white/10'}
                      `}
                    >
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={room.images[0]} alt={room.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-ivory truncate group-hover:text-terra transition-colors">{room.title}</span>
                        <span className="text-[10px] text-ivory/50 uppercase tracking-wider">{room.category}</span>
                        <span className="text-xs text-terra font-bold mt-1">${room.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};

export default HeroSection;