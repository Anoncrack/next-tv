'use client';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import React, { useState } from 'react';
import Link from 'next/link';
import faqData from '@/app/data/faq.json';



const Icons = {
  MapPin: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Check: () => <svg className="wh4 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Minus: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>,
  Download: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
};

const PACKING_LIST = [
  "Broken-in Hiking boots (It gets muddy)",
  "USB-C adapters (We have spares, but still)",
  "Swimwear (For the cold plunge/sauna)",
  "Rain shell / Windbreaker (Gore-Tex)",
  "Kindle or physical books (Library on site)",
  "Personal nootropic stack / supplements"
];

export default function GuidePage() {
  const [openCategory, setOpenCategory] = useState<string | null>("Tech & Connectivity");

  return (
    <main className="bg-ivory min-h-screen pb-24">
      <Navigation />
      <div className="bg-forest text-ivory pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <span className="label-upper text-terra mb-4 block">Guest Handbook</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Prepare for <span className="italic text-terra">Arrival</span>
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Everything you need to know about getting here, settling in, and making the most of your deep work session.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-12 relative z-20 mb-24">
        <div className="bg-white rounded-3xl p-4 shadow-2xl shadow-forest/10 grid grid-cols-1 lg:grid-cols-3 gap-4 border border-forest/5">
           
           <div className="bg-forest text-ivory p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-terra/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

              <h3 className="font-serif text-2xl text-terra mb-6 relative z-10">Base Coordinates</h3>
              <div className="space-y-5 font-sans text-sm relative z-10">
                 <div className="flex items-start gap-4">
                    <div className="mt-1 text-terra"><Icons.MapPin /></div>
                    <p className="opacity-80 leading-relaxed">
                       306 Bow Valley Trail,<br/>
                       Unit 201B,<br/>
                       Canmore, AB T1W 0N2
                    </p>
                 </div>
                 <div className="pt-5 border-t border-white/10 space-y-2">
                    <p className="flex justify-between">
                        <span className="text-terra font-bold">From YYC Airport:</span>
                        <span className="opacity-70">~1.5h Drive</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-terra font-bold">Helipad Code:</span>
                        <span className="opacity-70">CEW9</span>
                    </p>
                 </div>
                 <button className="w-full mt-2 btn-glass border-white/20 hover:bg-white/10 text-xs py-3">
                    Open in Google Maps
                 </button>
              </div>
           </div>

           <div className="lg:col-span-2 bg-slate-200 rounded-2xl overflow-hidden relative min-h-[300px] group">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                style={{ backgroundImage: 'url("/images/map.webp")' }}
              ></div>
              <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-500"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                 <div className="relative">
                    <span className="absolute w-full h-full bg-terra rounded-full animate-ping opacity-75"></span>
                    <span className="relative wh4 bg-terra rounded-full border-2 border-white block"></span>
                 </div>
                 <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-forest font-bold text-xs uppercase tracking-widest translate-y-2">
                    Base Camp
                 </div>
              </div>
           </div>

        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
               <h3 className="heading-section text-2xl mb-6 flex items-center gap-3">
                  The Packing List
               </h3>
               <ul className="space-y-3">
                  {PACKING_LIST.map((item, i) => (
                     <li key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-forest/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-1 bg-ivory rounded-full"><Icons.Check /></div>
                        <span className="text-forest/80 font-medium text-sm">{item}</span>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-forest/5 shadow-sm flex flex-col h-full">
               <h3 className="heading-section text-2xl mb-6">Code of Conduct</h3>
               <div className="space-y-6 text-forest/70 leading-relaxed font-sans text-sm flex-1">
                  <p>
                     <strong className="text-forest block mb-1 text-base">Silence is Golden</strong>
                     Communal workspaces operate under "Library Rules". Please take calls in phone booths or your private room.
                  </p>
                  <p>
                     <strong className="text-forest block mb-1 text-base">Respect the Wild</strong>
                     We share this land with wildlife. Never leave food outside. Secure all trash in designated bear-proof bins.
                  </p>
                  <p>
                     <strong className="text-forest block mb-1 text-base">Digital Hygiene</strong>
                     The Nordic Spa and Dining Hall are strictly phone-free zones. We encourage being present.
                  </p>
               </div>
             
            </div>

         </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
         <div className="text-center mb-12">
            <span className="label-upper text-terra mb-2 block">Knowledge Base</span>
            <h2 className="heading-section">Frequently Asked Questions</h2>
         </div>

         <div className="space-y-4">
            {faqData.map((category, catIndex) => (
               <div key={catIndex} className="bg-white rounded-2xl overflow-hidden border border-forest/5 shadow-sm transition-all duration-300">
                  
                  <button 
                     onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                     className={`w-full px-8 py-6 flex items-center justify-between text-left transition-colors duration-300 ${openCategory === category.category ? 'bg-forest text-ivory' : 'bg-white hover:bg-forest/5'}`}
                  >
                     <span className="font-serif text-xl font-bold tracking-tight">{category.category}</span>
                     <span className={openCategory === category.category ? 'text-terra' : 'text-forest/30'}>
                        {openCategory === category.category ? <Icons.Minus /> : <Icons.Plus />}
                     </span>
                  </button>

                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategory === category.category ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="px-8 py-2 bg-ivory/30">
                        <div className="divide-y divide-forest/10">
                           {category.questions.map((q, qIndex) => (
                              <div key={qIndex} className="py-6">
                                 <h4 className="font-bold text-forest mb-2 text-base">{q.q}</h4>
                                 <p className="text-forest/70 leading-relaxed text-sm">{q.a}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-20 text-center border-t border-forest/10 pt-10">
            <p className="text-forest/50 mb-3 text-sm">Still have questions?</p>
            <a href="mailto:book@thundervoyage.com" className="text-xl md:text-2xl font-serif text-forest border-b border-terra/30 hover:border-terra hover:text-terra transition-all">
               book@thundervoyage.com
            </a>
         </div>
      </div>

      <Footer />
    </main>
  );
}