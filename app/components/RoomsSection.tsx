'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Icons = {
  Wifi: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Ac: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  Tv: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  Kitchen: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3"/></svg>,
  Pool: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20c5.5 0 8.5-4 11-4 2.5 0 5.5 4 11 4"/><path d="M11 11.5c-1-2.5-4-3-6-1.5"/></svg>,
  Bath: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1.5C3.5 2 3.5 4 3.5 6"/><path d="M2 12h20"/><path d="M7 19v-7"/><path d="M17 19v-7"/></svg>,
  Pet: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>,
  Work: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  User: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Star: () => <svg className="w-3.5 h-3.5 text-terra fill-terra" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg className="w-3.5 h-3.5 text-ivory" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowRight: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Filter: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  X: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevronLeft: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
 Eye: ({ className }: { className?: string }) => (
    <svg 
      className={className || "wh4"} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

const AMENITIES_CONFIG = [
  { id: 'wifi', label: 'WiFi 6 Mesh', icon: Icons.Wifi },
  { id: 'workspace', label: 'Ergo Desk', icon: Icons.Work },
  { id: 'ac', label: 'Climate', icon: Icons.Ac },
  { id: 'recovery', label: 'Ice Bath', icon: Icons.Pool },
  { id: 'soundproof', label: 'Silence', icon: Icons.Tv },
  { id: 'pet', label: 'Pet Friendly', icon: Icons.Pet },
];

const CATEGORIES = ['All', 'Solo Focus', 'Duo/Partner', 'Team Squad', 'Mentor Luxe'];
const VIEWS = ['All', 'Forest Zen', 'Ocean Breeze', 'Training Grounds'];
const ITEMS_PER_PAGE = 6;

type Room = {
  id: number;
  title: string;
  price: number;
  category: string;
  guests: number;
  size: number;
  view: string;
  rating: number;
  amenities: string[];
  description: string;
  images: string[];
};

type SliderProps = {
  images: string[];
  title: string;
  price: number;
  category: string;
  guests: number;
  size: number;
};

const RoomImageSlider = ({ images, title, price, category, guests, size, id }: SliderProps & { id: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return (
      <Link href={`/rooms/${id}`} className="block relative h-64 w-full bg-forest/10 border-b border-white/5">
         <div className="absolute inset-0 flex items-center justify-center text-ivory/20">
            <span className="text-xs uppercase tracking-widest">No Image</span>
         </div>
         <div className="absolute top-3 left-3 pointer-events-none">
          <span className="bg-forest/80 backdrop-blur border border-white/10 text-ivory text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-terra text-ivory px-3 py-1 rounded-lg text-sm font-bold shadow-lg pointer-events-none font-serif">
           ${price} <span className="text-[10px] font-sans font-normal opacity-90">/ night</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative h-64 w-full overflow-hidden group/slider border-b border-white/5 bg-forest/10">
      <Link href={`/rooms/${id}`} className="block w-full h-full relative">
        <Image
          src={images[currentIndex]} 
          alt={`${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest/90 via-transparent to-transparent pointer-events-none" />
      </Link>

      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="btt2"
          >
            <Icons.ChevronLeft />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="btt  "
          >
            <Icons.ChevronRight />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
            {images.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all duration-300 ${idx === currentIndex ? 'bg-terra w-4' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 left-3 pointer-events-none z-10">
        <span className="bg-forest/80 backdrop-blur border border-white/10 text-ivory text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
          {category}
        </span>
      </div>
      
      <div className="absolute bottom-3 right-3 bg-terra text-ivory px-3 py-1 rounded-lg text-sm font-bold shadow-lg pointer-events-none font-serif z-10">
        ${price} <span className="text-[10px] font-sans font-normal opacity-90">/ night</span>
      </div>
    </div>
  );
};

const RoomSection = ({ rooms }: { rooms: Room[] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeView, setActiveView] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortOption, setSortOption] = useState('recommended');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeView, selectedAmenities, priceRange, sortOption]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setActiveView('All');
    setSelectedAmenities([]);
    setPriceRange(1000);
  };

  const filteredRooms = useMemo(() => {
    if (!rooms || !rooms.length) return [];
    let result = rooms.filter(room => {
      if (activeCategory !== 'All' && room.category !== activeCategory) return false;
      if (activeView !== 'All' && room.view !== activeView) return false;
      if (room.price > priceRange) return false;
      if (selectedAmenities.length > 0) {
        if (!selectedAmenities.every(id => room.amenities.includes(id))) return false;
      }
      return true;
    });
    if (sortOption === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sortOption === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sortOption === 'size_desc') result.sort((a, b) => b.size - a.size);
    return result;
  }, [rooms, activeCategory, activeView, selectedAmenities, priceRange, sortOption]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const FilterContent = () => (
    <div className="space-y-8 text-ivory">
      <div>
        <label className="label-upper text-ivory/50 mb-3 block">Mission Type</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all font-medium 
                ${activeCategory === cat 
                  ? 'bg-terra text-ivory border-terra shadow-lg shadow-terra/20' 
                  : 'bg-transparent text-ivory/60 border-white/10 hover:border-terra hover:text-ivory'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="label-upper text-ivory/50">Max Budget</label>
          <span className="text-xs font-bold text-terra bg-terra/10 px-2 py-1 rounded border border-terra/20">${priceRange}</span>
        </div>
        <input 
          type="range" min="50" max="1000" step="50" 
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))} 
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-terra" 
        />
      </div>

      <div>
        <label className="label-upper text-ivory/50 mb-3 block">Atmosphere</label>
        <div className="relative">
            <select 
                value={activeView} 
                onChange={(e) => setActiveView(e.target.value)} 
                className="w-full p-3 bg-forest border border-white/10 rounded-xl text-sm focus:outline-none focus:border-terra appearance-none text-ivory"
            >
                {VIEWS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/50 pointer-events-none">▼</div>
        </div>
      </div>

      <div>
        <label className="label-upper text-ivory/50 mb-4 block">Essentials</label>
        <div className="space-y-3">
          {AMENITIES_CONFIG.map((am) => {
            const isChecked = selectedAmenities.includes(am.id);
            return (
              <label key={am.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 
                  ${isChecked 
                    ? 'bg-terra border-terra text-ivory' 
                    : 'bg-transparent border-white/20 group-hover:border-terra'
                  }`}>
                  {isChecked && <Icons.Check />}
                </div>
                <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleAmenity(am.id)} />
                <span className={`text-sm flex items-center gap-2 ${isChecked ? 'text-ivory font-bold' : 'text-ivory/60 group-hover:text-ivory'}`}>
                  {am.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-forest min-h-screen py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="max-w-350 mx-auto">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-upper text-terra mb-2 block">Accommodations</span>
            <h2 className="heading-section text-ivory">
              Sleep. Work. <span className="italic text-terra">Conquer.</span>
            </h2>
            <p className="text-body text-ivory/60 mt-4 max-w-xl">
              Optimized spaces for digital nomads. High-speed mesh WiFi and ergonomic setups included.
            </p>
          </div>
          
          <div className="hidden lg:block min-w-50">
             <label className="label-upper text-ivory/50 mb-2 block">Sort By</label>
             <div className="relative">
                <select 
      value={sortOption} 
      onChange={(e) => setSortOption(e.target.value)} 
      className="w-full p-3 bg-forest border border-white/10 rounded-xl text-sm font-medium text-ivory focus:outline-none focus:border-terra appearance-none cursor-pointer"
    >
                    <option value="recommended">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="size_desc">Size: Largest First</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/50 pointer-events-none">▼</div>
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <aside className="hidden lg:block lg:w-1/4 lg:shrink-0">
            <div className="sticky top-32">
              <div className="plate-glass bg-white/5 border border-white/10 p-6">
                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="font-serif text-xl text-ivory flex items-center gap-2">
                        <Icons.Filter /> Filters
                    </h3>
                    <button onClick={handleClearFilters} className="text-xs text-terra font-bold hover:text-clay transition-colors uppercase tracking-wider">Reset</button>
                 </div>
                 <FilterContent />
              </div>
            </div>
          </aside>

          <div className="lg:hidden mb-6 flex gap-3">
             <button onClick={() => setIsMobileFiltersOpen(true)} className="flex-1 btn-outline border-white/20 text-ivory py-3 rounded-xl flex items-center justify-center gap-2">
               <Icons.Filter /> Filters 
               {(selectedAmenities.length > 0 || activeCategory !== 'All') && <span className="bg-terra text-ivory text-[10px] px-1.5 py-0.5 rounded-full">!</span>}
             </button>
             <div className="flex-1 relative">
                <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)} 
                    className="w-full p-3 bg-forest border border-white/20 rounded-xl text-sm font-bold text-ivory focus:outline-none appearance-none"
                >
                    <option value="recommended">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
             </div>
          </div>

          <div className="lg:w-3/4 flex flex-col min-h-125">
            {paginatedRooms.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedRooms.map((room) => (
                    <div 
                        key={room.id} 
                        className="group plate-glass bg-white/5 border border-white/10 hover:border-terra/40 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                    >
                      <RoomImageSlider {...room} />
                      
                      <div className="p-6 flex flex-col grow">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-serif text-xl text-ivory group-hover:text-terra transition-colors">
                               {room.title}
                           </h3>
                           <div className="flex items-center gap-1 text-terra text-xs font-bold bg-terra/10 px-2 py-1 rounded">
                               <Icons.Star /> {room.rating}
                           </div>
                        </div>
                        
                        <div className="text-xs text-ivory/40 font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-terra"></span> {room.view} View
                        </div>
                        
                        <p className="text-body text-ivory/70 text-sm leading-relaxed mb-6 line-clamp-2">
                            {room.description}
                        </p>
                        
                        <div className="flex gap-2 mb-6 mt-auto flex-wrap">
                          {AMENITIES_CONFIG.slice(0, 5).map(am => {
                            if (room.amenities.includes(am.id) && am.icon) {
                              return (
                                <div key={am.id} title={am.label} className="w-8 h-8 flex items-center justify-center bg-white/5 text-ivory/60 rounded-lg border border-white/5 group-hover:border-terra/30 group-hover:text-terra transition-colors">
                                  <am.icon />
                                </div>
                              )
                            }
                            return null;
                          })}
                        </div>

                        <div className="flex gap-3">

                          

                            <Link href={`/book?room=${room.id}`} className="flex-1">
                                <button className="w-full bg-terra cursor-pointer hover:bg-clay text-ivory py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-terra/20 hover:shadow-terra/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    Reserve <Icons.ArrowRight />
                                </button>
                            </Link>
                <Link  
    href={`/rooms/${room.id}`} 
    className="shrink-0"
    title={`View details for ${room.title}`}
  >
    <button className="
    btt3
    ">
      <Icons.Eye className="wh4 text-ivory group-hover:text-terra transition-colors" />
    </button>
  </Link>
                            
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-terra disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                            <Icons.ChevronLeft />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-full font-serif font-bold transition-all
                                    ${currentPage === page 
                                        ? 'bg-terra text-ivory shadow-lg scale-110' 
                                        : 'bg-transparent text-ivory/60 hover:text-ivory border border-transparent hover:border-white/20'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-terra disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                            <Icons.ChevronRight />
                        </button>
                    </div>
                )}
              </>
            ) : (
               <div className="plate-glass bg-white/5 border-dashed border-white/10 p-12 text-center">
                  <div className="w-16 h-16 bg-white/5 text-ivory/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icons.Filter />
                  </div>
                  <h3 className="font-serif text-xl text-ivory mb-2">No matching units</h3>
                  <p className="text-ivory/50 mb-6">Adjust your filters to see more available rooms.</p>
                  <button onClick={handleClearFilters} className="text-terra font-bold uppercase tracking-wider text-xs hover:text-clay transition-colors">Reset Filters</button>
               </div>
            )}
          </div>

        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-forest animate-in slide-in-from-bottom-10 duration-300">
          <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between bg-forest">
            <h3 className="text-lg font-serif text-ivory">Filters</h3>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-white/5 rounded-full text-ivory"><Icons.X /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 pb-24"><FilterContent /></div>
          <div className="p-4 border-t border-white/10 bg-forest absolute bottom-0 w-full flex gap-3">
             <button onClick={handleClearFilters} className="px-6 py-3 rounded-xl border border-white/20 text-ivory font-bold text-sm">Reset</button>
             <button onClick={() => setIsMobileFiltersOpen(false)} className="flex-1 bg-terra text-ivory rounded-xl font-bold text-sm shadow-lg">Show Results</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomSection;