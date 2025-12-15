'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import membershipData from '@/app/data/membership.json';

const Icons = {
  Crown: () => <svg className="w-6 h-6 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>,
  ArrowDown: () => <svg className="wh5 text-ivory/70 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,
  ArrowRight: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Check: () => <svg className="wh4 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Star: () => <svg className="wh4 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Key: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  Cloud: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3s1.3 3 3 3h11c1.7 0 3-1.3 3-3z"/><path d="M17.5 19a6 6 0 0 0 2.6-11.4A8 8 0 0 0 3.7 12.4"/></svg>,
  Chef: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>,
  Music: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
};

export default function MembershipPage() {
  const [club, sky, chef, music] = membershipData;

  return (
    <main className="bg-forest min-h-screen text-ivory selection:bg-terra selection:text-white">
      <div className="absolute top-0 w-full z-50">
        <Navigation />
      </div>

      <section className="relative h-screen w-full overflow-hidden bg-[#0f1110] flex flex-col justify-center items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/vip/hero-membership.webp"
            alt="ThunderVoyage Inner Circle" 
            fill 
            priority
            className="object-cover opacity-30"
            style={{ transform: 'scale(1.02)', transition: 'transform 10s ease-in-out' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-forest/60 to-forest" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 mt-12 animate-[fadeInUp_1s_ease-out]">
          <div className="flex justify-center mb-6">
             <div className="w-14 h-14 rounded-full border border-white/10 bg-forest/80 backdrop-blur-sm flex items-center justify-center">
                <Icons.Crown />
             </div>
          </div>
          <span className="label-upper text-terra/90 mb-4 block tracking-[0.3em]">The ThunderVoyage Club</span>
          <h1 className="display-hero mb-6 text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
            Access Beyond <br/> <span className="text-terra italic">The Ordinary</span>
          </h1>
          <p className="text-lg md:text-xl text-ivory/90 font-sans font-light max-w-xl mx-auto leading-relaxed">
            A private membership for those who need absolute privacy, unscripted logistics, and unfiltered nature.
          </p>
          <div className="mt-10">
             <Link href="#club">
               <button className="btn-accent  mx-auto py-4 text-sm tracking-widest shadow-lg shadow-terra/20 hover:shadow-terra/40 hover:-translate-y-1 transition-all duration-300">
                 Explore Privileges
               </button>
             </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-70">
          <Icons.ArrowDown />
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 relative bg-[#0f1110] border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="label-upper text-terra mb-4 block">Our Message</span>
            <h2 className="text-3xl md:text-5xl font-serif text-ivory leading-tight">
              The Luxury of <span className="italic text-terra">Invisible Logistics</span>
            </h2>
            <div className="text-lg md:text-xl text-ivory/80 font-serif leading-loose">
              <p>We created this tier for the founders building the next decade, the artists finishing their magnum opus, and the leaders who need to disappear to reappear stronger. Welcome to the quietest place on earth.</p>
            </div>
        </div>
      </section>

      <section id="club" className="py-32 px-4 sm:px-6 bg-[#0f1110] relative overflow-hidden border-t border-white/5">
         <div className="max-w-[1400px] mx-auto">
            
            <div className="flex justify-center mb-12">
               <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-white/60">
                  <span className="flex items-center gap-2"> Private Salon</span>
                  <span className="w-px h-3 bg-white/10"></span>
                  <span>Physical Access Only</span>
                  <span className="w-px h-3 bg-white/10"></span>
                  <span>Canmore Lodge</span>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 items-end">
               <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="w-8 h-8 rounded-full border border-terra/30 bg-terra/10 flex items-center justify-center text-terra">
                        <Icons.Key />
                     </span>
                     <span className="text-terra text-xs font-bold uppercase tracking-widest"></span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif text-ivory mb-6 leading-none">
                     The Strategy <span className="text-terra italic">Community</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/50 font-serif italic max-w-2xl">
                     &quot;Analog fortune in a digital world.&quot;
                  </p>
               </div>
               <div className="lg:col-span-5">
                  <p className="text-ivory/70 leading-relaxed text-lg border-l border-white/10 pl-6">
                     A private gaming salon located exclusively within the ThunderVoyage lodge. From the tactile click of a <strong>Slot Machine</strong> to the silence of a poker bluff, this room is soundproofed to -60dB. 
                     <br/><br/>
                     <span className="text-xs text-white/40 uppercase tracking-widest">
                        *Access is restricted to registered guests physically present on the property.
                     </span>
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
               
               <div className="lg:col-span-7 relative h-[600px] lg:h-auto min-h-[600px] rounded-2xl overflow-hidden group border border-white/10">
                  <Image 
                     src={club.image} 
                     alt="Private Gaming Room Interior" 
                     fill 
                     className="object-cover transition-transform duration-[3s] group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1110] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-8 left-8 max-w-md">
                     <h4 className="text-white font-serif text-2xl mb-2">The Atmosphere</h4>
                     <p className="text-white/60 text-sm">
                       No neon, no windows, no digital noise. Just the sound of heavy clay chips and the mechanical rhythm of vintage reels.
                     </p>
                  </div>
               </div>

               <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  <div className="flex-1 bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-terra/30 transition-colors group/card">
                     <div className="mb-4 text-terra flex justify-between items-center">
                        <Icons.Crown />
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Live Dealer</span>
                     </div>
                     <h4 className="text-xl font-serif text-ivory mb-2">The Green Felt</h4>
                     <p className="text-white/50 text-sm mb-4">
                       Professional tables hosted by NDA-bound dealers. Strictly offline, high-limit play.
                     </p>
                     <ul className="space-y-2 text-xs uppercase tracking-widest text-ivory/70">
                        <li className="flex gap-2"><span className="text-terra">•</span> Texas Hold&apos;em (No Limit)</li>
                        <li className="flex gap-2"><span className="text-terra">•</span> Blackjack (Single Deck)</li>
                        <li className="flex gap-2"><span className="text-terra">•</span> European Roulette</li>
                     </ul>
                  </div>

                  <div className="flex-1 bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-terra/30 transition-colors group/card relative overflow-hidden">
                     <div className="mb-4 text-terra flex justify-between items-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z"/><path d="M6 10v4"/><path d="M10 10v4"/><path d="M14 10v4"/><path d="M18 10v4"/></svg>
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Mechanical</span>
                     </div>
                     <h4 className="text-xl font-serif text-ivory mb-2">Slot Machine Gallery</h4>
                     <p className="text-white/50 text-sm mb-4">
                       A curated row of restored mechanical <strong>Slot Machines</strong>. Feel the tactile weight of the lever with every pull.
                     </p>
                     <ul className="space-y-2 text-xs uppercase tracking-widest text-ivory/70">
                        <li className="flex gap-2"><span className="text-terra">•</span> Classic 3-Reel </li>
                        <li className="flex gap-2"><span className="text-terra">•</span> How Spins Works</li>
                        <li className="flex gap-2"><span className="text-terra">•</span> Physical Token Only</li>
                     </ul>
                  </div>

                  <div className="flex-1 bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-terra/30 transition-colors group/card">
                     <div className="mb-4 text-terra flex justify-between items-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 22h8M12 22v-9M12 13a5 5 0 0 0 5-5V3H7v5a5 5 0 0 0 5 5z"/></svg>
                        <span className="text-[10px] uppercase tracking-widest text-white/20">Elixir</span>
                     </div>
                     <h4 className="text-xl font-serif text-ivory mb-2">Comped Service</h4>
                     <p className="text-white/50 text-sm mb-4">
                       Premium spirits served complimentary to active players on the floor.
                     </p>
                     <div className="flex gap-2">
                        <span className="px-2 py-1 border border-white/10 rounded text-[10px] text-white/60 uppercase">Yamazaki 18</span>
                        <span className="px-2 py-1 border border-white/10 rounded text-[10px] text-white/60 uppercase">Louis XIII</span>
                     </div>
                  </div>

               </div>
            </div>

            <div className="bg-[#151816] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 justify-between items-center text-sm">
               <div className="max-w-2xl">
                  <h4 className="text-terra font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                     <Icons.Check /> Regulatory Notice
                  </h4>
                  <p className="text-white/40 leading-relaxed text-xs">
                     ThunderVoyage operates under a private gaming license in accordance with Alberta Gaming (AGLC) regulations. 
                     <strong> This experience is available exclusively in-person</strong> at our Canmore venue. 
                     We do not offer online gambling or remote betting services.
                  </p>
               </div>
               
               <div className="flex flex-col items-end gap-4 min-w-[200px]">
                  <div className="flex gap-4 text-white/30 text-xs font-bold uppercase tracking-widest">
                     <span>18+ To Enter</span>
                     <span>|</span>
                     <span>Play Responsibly</span>
                  </div>
                  <Link href="/book?inquiry=membership" className="w-full">
                     <button className="btn-outline w-full py-3 px-6 border-white/10 hover:bg-white/5 text-white/60 hover:text-white text-xs uppercase tracking-widest">
                        Check Eligibility
                     </button>
                  </Link>
               </div>
            </div>

         </div>
      </section>

      <section id="sky" className="py-32 px-4 sm:px-6 relative bg-[#0f1110] text-ivory overflow-hidden border-t border-white/5">
         <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-terra/5 to-transparent pointer-events-none"></div>
        

         <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="w-8 h-8 rounded-full border border-terra/30 bg-terra/10 flex items-center justify-center text-terra">
                        <Icons.Cloud />
                     </span>
                     <span className="text-terra text-xs font-bold uppercase tracking-widest"></span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-serif text-ivory mb-6 leading-none">
                     Aerial <span className="text-terra italic">Reconnaissance</span>
                  </h2>
                  <p className="text-xl text-white/50 font-serif italic max-w-xl">
                     &quot;{sky.quote}&quot;
                  </p>
               </div>
               
               <div className="hidden md:block p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                     <div className="text-[10px] uppercase tracking-widest text-terra font-bold">Flight Conditions</div>
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div>
                        <span className="block text-2xl font-bold text-ivory font-serif">5 <span className="text-sm font-sans font-normal text-white/40">km/h</span></span>
                        <span className="text-xs text-white/40">Wind NE</span>
                     </div>
                     <div className="h-8 w-px bg-white/10"></div>
                     <div>
                        <span className="block text-2xl font-bold text-ivory font-serif">100%</span>
                        <span className="text-xs text-white/40">Visibility</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
               <div className="lg:col-span-7 flex flex-col gap-8">
                  <div className="relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                     <Image 
                        src={sky.image} 
                        alt={sky.title} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-[3s]" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f1110] via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-ivory border border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-terra rounded-full"></div>
                        Altitude: 3,000 ft
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-white/5 border border-white/5 p-6 rounded-xl shadow-sm hover:border-terra/30 hover:bg-white/10 transition-all duration-300 group">
                        <h4 className="font-serif text-xl text-ivory mb-2 group-hover:text-terra transition-colors">Silent Flight</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                           Unlike helicopters, there is no vibration or mechanical noise. Just the wind.
                        </p>
                     </div>
                     <div className="bg-white/5 border border-white/5 p-6 rounded-xl shadow-sm hover:border-terra/30 hover:bg-white/10 transition-all duration-300 group">
                        <h4 className="font-serif text-xl text-ivory mb-2 group-hover:text-terra transition-colors">The Pilot</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                           Flown by Captain Miller (25 years exp). Precision landings in remote clearings.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-5 flex flex-col h-full justify-between">
                  <div className="mb-12 pt-4">
                     <h3 className="label-upper text-white/30 mb-10 pl-2">Expedition Timeline</h3>
                     <div className="space-y-0 border-l border-white/10 ml-2">
                        <div className="relative pl-8 pb-12 group">
                           <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-terra shadow-[0_0_10px_rgba(188,93,46,0.5)]"></div>
                           <span className="text-xs font-bold text-terra mb-1 block">05:30 AM</span>
                           <h4 className="text-lg font-bold text-ivory group-hover:text-terra transition-colors">Pre-Flight Coffee</h4>
                           <p className="text-sm text-white/50 mt-2 leading-relaxed">
                              Espresso and light carbs provided on the North Lawn.
                           </p>
                        </div>

                        <div className="relative pl-8 pb-12 group">
                           <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white/20 bg-[#0f1110] group-hover:border-terra transition-colors"></div>
                           <span className="text-xs font-bold text-white/40 mb-1 block">06:00 AM</span>
                           <h4 className="text-lg font-bold text-ivory group-hover:text-terra transition-colors">Ascension</h4>
                           <p className="text-sm text-white/50 mt-2 leading-relaxed">
                              Ascend with the sunrise. 60-90 minutes of flight time.
                           </p>
                        </div>

                        <div className="relative pl-8 group">
                           <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white/20 bg-[#0f1110] group-hover:border-terra transition-colors"></div>
                           <span className="text-xs font-bold text-white/40 mb-1 block">08:00 AM</span>
                           <h4 className="text-lg font-bold text-ivory group-hover:text-terra transition-colors">Champagne Landing</h4>
                           <p className="text-sm text-white/50 mt-2 leading-relaxed">
                              Touch down in a secluded meadow. Breakfast service awaits.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#1a1c1b] border border-white/5 p-8 rounded-2xl shadow-2xl hover:border-terra/20 transition-colors">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Private Charter</div>
                           <div className="text-3xl font-serif text-terra">$1,200</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Capacity</div>
                           <div className="text-lg font-bold text-ivory">Max 4 Guests</div>
                        </div>
                     </div>
                     <Link href="/book?experience=balloon" className="block w-full">
                        <button className="w-full btn-accent py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 group">
                           Reserve Expedition 
                           <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span>
                        </button>
                     </Link>
                     <p className="text-[10px] text-white/20 text-center mt-4">
                        *Fully refundable if cancelled by pilot due to weather.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section id="chef" className="py-32 px-4 sm:px-6 bg-[#0f1110] relative border-t border-white/5 scroll-mt-20">
         <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="inline-flex text-terra items-center gap-2 mb-6 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                  <Icons.Chef />
                 
               </div>
               <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-6">
                  Metabolic <span className="text-terra italic">Architecture</span>
               </h2>
               <p className="text-xl text-ivory/60 font-serif leading-relaxed">
                  &quot;Food is not just entertainment; it is code for your biology. We program your menu to match your cognitive demands.&quot;
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
               <div className="space-y-8">
                  <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-white/10">
                     <Image 
                        src={chef.image} 
                        alt={chef.title} 
                        fill 
                        className="object-cover transition-transform duration-[3s] group-hover:scale-105" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f1110] via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div className="bg-black/80 backdrop-blur px-4 py-3 rounded-xl border border-white/10">
                           <div className="text-[10px] uppercase tracking-widest text-terra mb-1">Current Menu</div>
                           <div className="text-white font-serif text-lg">Late Autumn Forage</div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                     <div className="bg-white/5 border border-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
                        <div className="text-3xl font-serif text-ivory mb-1">100<span className="text-sm">km</span></div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Sourcing Radius</div>
                     </div>
                     <div className="bg-white/5 border border-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
                        <div className="text-3xl font-serif text-ivory mb-1">0<span className="text-sm">%</span></div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Seed Oils</div>
                     </div>
                     <div className="bg-white/5 border border-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
                        <div className="text-3xl font-serif text-ivory mb-1">24<span className="text-sm">h</span></div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Notice Required</div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-10">
                  <div>
                     <h3 className="text-2xl font-serif text-ivory mb-4">Hyper-Personalized Fueling</h3>
                     <p className="text-ivory/70 leading-relaxed text-lg">
                        Bypass the main dining hall. Your dedicated chef designs a menu based on your preferences or blood work analysis. Whether you are prepping for a marathon or a board meeting, the kitchen adapts to your physiology.
                     </p>
                  </div>

                  <div>
                     <h4 className="label-upper text-terra mb-6">Supported Protocols</h4>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-default group">
                           <span className="text-lg text-ivory group-hover:text-terra transition-colors font-serif">Ketogenic Cognitive Drive</span>
                           <span className="text-xs text-white/40 uppercase tracking-widest">High Fat / Low Carb</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-default group">
                           <span className="text-lg text-ivory group-hover:text-terra transition-colors font-serif">Anti-Inflammatory Recovery</span>
                           <span className="text-xs text-white/40 uppercase tracking-widest">No Nightshades / Gluten</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-default group">
                           <span className="text-lg text-ivory group-hover:text-terra transition-colors font-serif">The Carnivore Reset</span>
                           <span className="text-xs text-white/40 uppercase tracking-widest">Nose-to-Tail</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#EAEBE8] text-forest p-8 rounded-sm shadow-xl relative rotate-1 hover:rotate-0 transition-transform duration-500">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#d0d1ce]/50 rounded-b-lg"></div> 
                     
                     <div className="text-center border-b border-forest/10 pb-4 mb-6">
                        <div className="text-xs uppercase tracking-[0.3em] text-forest/60 mb-1">Sample Day</div>
                        <div className="font-serif text-xl font-bold italic">&quot;Focus & Flow&quot;</div>
                     </div>

                     <div className="space-y-6 text-sm">
                        <div>
                           <span className="block font-bold text-xs uppercase text-terra mb-1">08:00 AM</span>
                           <p className="font-serif text-lg leading-tight">Elk Bone Broth with Ginger & Turmeric.</p>
                        </div>
                        <div>
                           <span className="block font-bold text-xs uppercase text-terra mb-1">01:00 PM</span>
                           <p className="font-serif text-lg leading-tight">Seared Arctic Char, Fermented Asparagus, Miso Glaze.</p>
                        </div>
                        <div>
                           <span className="block font-bold text-xs uppercase text-terra mb-1">07:00 PM</span>
                           <p className="font-serif text-lg leading-tight">Bison Ribeye, Tallow-Roasted Root Vegetables.</p>
                        </div>
                     </div>
                     
                     <div className="mt-8 pt-4 border-t border-forest/10 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-forest/40">Chef de Cuisine: Marco V.</p>
                     </div>
                  </div>

                  <div className="pt-4">
                     <Link href="/book?experience=chef">
                        <button className="flex items-center gap-3 text-terra font-bold uppercase tracking-widest hover:text-white transition-colors group">
                           Configure Your Menu 
                           <span className="group-hover:translate-x-2 transition-transform"><Icons.ArrowRight /></span>
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section id="sound" className="py-32 px-4 sm:px-6 bg-[#161210] relative overflow-hidden border-t border-white/5">
        
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
               
               <h2 className="text-5xl md:text-8xl font-serif text-ivory mb-6 tracking-tight">
                  Acoustic <span className="text-terra italic">Fireside</span>
               </h2>
               <p className="text-xl text-white/50 font-serif italic max-w-2xl mx-auto">
                  &quot;{music.quote}&quot;
               </p>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-center">
               <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-full aspect-[5/6] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(234,88,12,0.15)] border border-white/5 group">
                     <Image 
                        src={music.image} 
                        alt={music.title} 
                        fill 
                        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]" 
                     />
                     <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#120f0e]/80" />
                     <div className="absolute bottom-8 left-8 right-8 text-center">
                        <div className="inline-block border border-white/20 bg-black/40 backdrop-blur px-4 py-2 rounded-full mb-4">
                           <span className="text-[10px] uppercase tracking-widest text-white/80">Tonight&apos;s Mood</span>
                        </div>
                        <p className="font-serif text-2xl text-ivory">Raw & Unplugged</p>
                     </div>
                  </div>
               </div>

               <div className="w-full md:w-1/2 space-y-12">
                  <div>
                     <h3 className="text-3xl font-serif text-ivory mb-4">The Anti-Concert</h3>
                     <p className="text-ivory/70 leading-relaxed text-lg">
                        Music returned to its roots. We curate private performances by visiting artists around the central fire pit or inside the Great Hall. No amplifiers, no microphones, no phones. Just raw talent, the crackle of burning pine, and the company of the TV Club.
                     </p>
                  </div>

                  <div className="bg-white/5 border plate-glass border-white/5 p-8 rounded-2xl">
                     <h4 className="label-upper text-terra mb-6">The Setup</h4>
                     <ul className="space-y-4">
                        <li className="flex items-start gap-4 group cursor-default">
                           <span className="text-white/20 font-serif text-xl group-hover:text-terra transition-colors">01.</span>
                           <div>
                              <strong className="block text-ivory text-lg font-serif">Digital Detox Enforced</strong>
                              <span className="text-sm text-white/40">Phones are deposited at the entrance. Full presence required.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-4 group cursor-default">
                           <span className="text-white/20 font-serif text-xl group-hover:text-terra transition-colors">02.</span>
                           <div>
                              <strong className="block text-ivory text-lg font-serif">Curated Talent</strong>
                              <span className="text-sm text-white/40">From classical cellists to indie folk songwriters.</span>
                           </div>
                        </li>
                     </ul>
                  </div>

                  <div className="pt-4 flex gap-4">
                     <Link href="/book?experience=music">
                        <button className="btn-accent bg-terra hover:bg-orange-600 border-none px-8 py-4 text-sm tracking-widest shadow-lg shadow-orange-900/20">
                           Check Schedule
                        </button>
                     </Link>
                     <Link href="/book?inquiry=private_event">
                        <button className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-white/30">
                           Book Private Event
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 px-4 sm:px-6 bg-[#0f1110] border-t border-white/10 relative">
         <div className="max-w-4xl mx-auto text-center">
            <span className="label-upper text-terra mb-4 block">Initialization</span>
            <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-16">Membership Status</h2>
            
            <div className="bg-[#181a19] border border-terra/30 rounded-[2rem] p-12 md:p-16 relative overflow-hidden group hover:border-terra/60 transition-colors duration-500 shadow-2xl">
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-terra/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-terra/10 transition-colors"></div>
               <div className="absolute top-0 right-0 bg-terra text-white text-xs font-bold px-6 py-3 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                  Application Only
               </div>
               
               <div className="text-left mb-10">
                  <h3 className="text-5xl md:text-6xl font-serif text-white mb-2">The ThunderVoyage Club</h3>
                  <p className="text-sm uppercase tracking-widest text-terra">Annual Access Pass</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-3xl mx-auto mb-12 border-t border-white/5 pt-10">
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> 24/7 Personal Concierge</li>
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> Priority Booking Window</li>
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> Access to &quot;The Club&quot;</li>
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> Helipad Landing Rights</li>
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> Private Off-Menu Dining</li>
                  <li className="flex gap-4 text-ivory text-lg items-center"><Icons.Check /> Guest Anonymity Protocol</li>
               </div>

               <div id="apply" className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-10">
                 
                  <Link href="/book?type=membership_application" className="w-full md:w-auto">
                     <button className="w-full md:w-auto btn-accent px-12 py-5 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(188,93,46,0.3)] hover:shadow-[0_0_50px_rgba(188,93,46,0.5)]">
                        Begin Application
                     </button>
                  </Link>
               </div>
               
               <p className="text-[10px] text-left text-ivory/30 mt-6 max-w-lg">
                  *Many of our members expense this as a &quot;Co-working & Wellness Stipend&quot; or &quot;Business Development&quot; cost. Consult your CPA.
               </p>
            </div>
            
            <p className="mt-16 text-ivory/40 text-sm">
               Existing member? <a href="/login" className="text-terra underline decoration-terra/30 underline-offset-4 hover:decoration-terra hover:text-white transition-colors">Login to Concierge Portal</a>
            </p>
         </div>
      </section>

      <Footer />
    </main>
  );
}