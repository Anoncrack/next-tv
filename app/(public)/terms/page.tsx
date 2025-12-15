'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Icons = {
  Scale: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  Check: () => <svg className="w-4 h-4 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Hash: () => <svg className="w-4 h-4 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>,
};

const SECTIONS = [
  { id: 'mission', title: '01. The Mission' },
  { id: 'booking', title: '02. Reservations & Finance' },
  { id: 'conduct', title: '03. Code of Conduct' },
  { id: 'club', title: '04. The Strategy Club Policy' },
  { id: 'liability', title: '05. Wilderness Liability' },
  { id: 'digital', title: '06. Digital & Network Use' },
  { id: 'contact', title: '07. Legal Contact' },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('mission');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-[#0f1110] min-h-screen text-ivory selection:bg-terra selection:text-white">
      
      <section className="pt-32 pb-16 px-4 sm:px-6 relative border-b border-white/5">
         
         
         <div className="max-w-[1400px] mx-auto text-center">
            <span className="label-upper text-terra mb-4 block">Legal Framework</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-ivory">
               Guest Protocol & <span className="text-white/30 italic">Terms</span>
            </h1>
            <p className="text-lg text-ivory/60 max-w-2xl mx-auto font-light">
               ThunderVoyage is not a typical hotel. It is a high-performance environment. 
               These terms ensure the integrity of the experience for all members and guests.
            </p>
            <div className="mt-8">
               <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terra hover:text-white transition-colors">
                  <Icons.ArrowLeft /> Return to Base
               </Link>
            </div>
         </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="hidden lg:block lg:col-span-3">
               <div className="sticky top-32 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 mb-4 block pl-4">Table of Contents</span>
                  {SECTIONS.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`block w-full text-left py-3 pl-4 border-l-2 text-sm transition-all duration-300 ${
                           activeSection === item.id 
                              ? 'border-terra text-white font-bold bg-white/5' 
                              : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
                        }`}
                     >
                        {item.title}
                     </button>
                  ))}
                  
                  <div className="pt-12 pl-4">
                     <p className="text-[10px] text-white/20">
                        Last Updated: <br/> March 15, 2025
                     </p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5 space-y-24">
               
               <section id="mission" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">01.</span> The Mission
                  </h2>
                  <div className="prose prose-invert prose-lg text-ivory/70 leading-loose">
                     <p>
                        By entering ThunderVoyage, you acknowledge that this is a sanctuary designed for <strong>Deep Work</strong> and <strong>Biological Optimization</strong>. Unlike standard hospitality venues, we prioritize silence, privacy, and focus above all else.
                     </p>
                     <p>
                        Your presence here is an agreement to respect the cognitive sovereignty of other guests. We operate on a system of implicit trust and explicit boundaries.
                     </p>
                  </div>
               </section>

               <section id="booking" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">02.</span> Reservations & Finance
                  </h2>
                  <div className="bg-[#151816] p-8 rounded-2xl border border-white/5 space-y-6">
                     <div>
                        <h4 className="font-bold text-ivory mb-2">Payment Protocol</h4>
                        <p className="text-sm text-ivory/60">
                           Full payment is required 7 days prior to arrival for Standard guests. Inner Circle members are billed monthly or annually according to their contract. We accept all major credit cards and wire transfers for bookings over $10,000.
                        </p>
                     </div>
                     <div className="w-full h-px bg-white/5"></div>
                     <div>
                        <h4 className="font-bold text-ivory mb-2">Cancellation Policy</h4>
                        <ul className="space-y-2 text-sm text-ivory/60">
                           <li className="flex gap-3"><Icons.Check /> <strong>14+ Days Out:</strong> 100% Refundable.</li>
                           <li className="flex gap-3"><Icons.Check /> <strong>7-13 Days Out:</strong> 50% Refundable or Full Credit.</li>
                           <li className="flex gap-3"><Icons.Check /> <strong>&lt; 7 Days:</strong> Non-refundable.</li>
                        </ul>
                     </div>
                  </div>
               </section>

               <section id="conduct" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">03.</span> Code of Conduct
                  </h2>
                  <div className="space-y-8 text-ivory/70 text-lg">
                     <div>
                        <strong className="block text-ivory mb-2">Acoustic Integrity</strong>
                        <p>
                           Our "Silent Zones" (Library, Spa, Co-working Hub) are strictly enforced. Phone calls must be taken in designated booths or private cabins. Use of headphones is mandatory for all media in public spaces.
                        </p>
                     </div>
                     <div>
                        <strong className="block text-ivory mb-2">Privacy & Photography</strong>
                        <p>
                           To protect the anonymity of our high-profile guests, photography of other guests is strictly prohibited. You may film yourself or the landscape, but any content featuring other patrons without their explicit consent will result in immediate expulsion.
                        </p>
                     </div>
                  </div>
               </section>

               <section id="club" className="scroll-mt-32">
                  <div className="bg-terra/10 border border-terra/30 p-8 rounded-2xl">
                     <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                        <span className="text-terra/50 text-xl font-sans">04.</span> The Strategy Club Policy
                     </h2>
                     <div className="text-ivory/80 space-y-4">
                        <p>
                           "The Strategy Club" (also referred to as The Vault) is a private social lounge for the enjoyment of strategy games such as Poker, Chess, and Backgammon.
                        </p>
                        <p className="font-bold text-white">Google Ads & Legal Compliance Notice:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                           <li>ThunderVoyage <strong>does not</strong> operate a commercial casino.</li>
                           <li>There is <strong>no "House Bank"</strong> or rake taken from games.</li>
                           <li>All gaming is strictly social and peer-to-peer among members.</li>
                           <li>Access is restricted to guests aged 21+.</li>
                        </ul>
                     </div>
                  </div>
               </section>

               <section id="liability" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">05.</span> Wilderness Liability
                  </h2>
                  <div className="prose prose-invert prose-lg text-ivory/70 leading-loose">
                     <p>
                        ThunderVoyage is located in active bear country on the edge of the Canadian wilderness. While we employ perimeter security and provide safety equipment (Garmin InReach, Bear Spray), interaction with nature carries inherent risks.
                     </p>
                     <p>
                        By staying with us, you acknowledge these risks. Guests are responsible for their own safety on unguided trails. We are not liable for injuries sustained during unauthorized off-trail expeditions.
                     </p>
                  </div>
               </section>

               <section id="digital" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">06.</span> Digital & Network Use
                  </h2>
                  <div className="text-ivory/70 space-y-4">
                     <p>
                        We provide enterprise-grade Fiber and Starlink connectivity (1Gbps+). This network is optimized for video conferencing, large data transfers, and secure communication.
                     </p>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <li className="bg-[#151816] p-4 rounded-lg border border-white/5 text-sm">
                           <strong className="block text-white mb-1">Allowed</strong>
                           VPN use, Encrypted messaging, High-bandwidth work tasks.
                        </li>
                        <li className="bg-[#151816] p-4 rounded-lg border border-white/5 text-sm">
                           <strong className="block text-white mb-1">Prohibited</strong>
                           Crypto mining on hotel hardware, Illegal content distribution, Network probing.
                        </li>
                     </ul>
                  </div>
               </section>

               <section id="contact" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">07.</span> Legal Contact
                  </h2>
                  <div className="bg-[#151816] p-8 rounded-2xl border border-white/5">
                     <p className="text-white font-bold mb-2">ThunderVoyage HQ</p>
                     <p className="text-ivory/60 text-sm leading-relaxed">
                        306 Bow Valley Trail, Unit 201B<br/>
                        Canmore, AB T1W 0N2<br/>
                        Canada
                     </p>
                     <p className="mt-4">
                        <a href="mailto:book@thundervoyage.com" className="text-terra underline underline-offset-4 hover:text-white transition-colors">
                           book@thundervoyage.com
                        </a>
                     </p>
                     <div className="mt-6 flex gap-4 text-xs uppercase tracking-widest text-white/30">
                        <Link href="/privacy" className="hover:text-terra transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link href="/" className="hover:text-terra transition-colors">Home</Link>
                     </div>
                  </div>
               </section>

            </div>

         </div>
      </div>

    </main>
  );
}