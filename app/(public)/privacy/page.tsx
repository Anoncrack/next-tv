'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Icons = {
  Shield: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ArrowLeft: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  Lock: () => <svg className="w-4 h-4 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

const SECTIONS = [
  { id: 'collection', title: '01. Data Collection' },
  { id: 'usage', title: '02. Operational Usage' },
  { id: 'bio-data', title: '03. Biological Data Protocol' },
  { id: 'sharing', title: '04. Third-Party & Sharing' },
  { id: 'security', title: '05. Security Infrastructure' },
  { id: 'rights', title: '06. Your Rights' },
  { id: 'contact', title: '07. Contact Officer' },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collection');

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
            <span className="label-upper text-terra mb-4 block">Privacy Policy</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-ivory">
               Data <span className="text-white/30 italic">Protocol</span>
            </h1>
            <p className="text-lg text-ivory/60 max-w-2xl mx-auto font-light">
               We practice "Data Minimalism." We collect only what is necessary to ensure your safety, comfort, and the personalization of your mission.
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
               </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5 space-y-24">
               
               <section id="collection" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">01.</span> Data Collection
                  </h2>
                  <div className="prose prose-invert prose-lg text-ivory/70 leading-loose">
                     <p>We collect information in three categories:</p>
                     <ul className="list-none space-y-4 pl-0">
                        <li className="bg-[#151816] p-6 rounded-xl border border-white/5">
                           <strong className="block text-white mb-2">Identity Data</strong>
                           Your Name, Email, Phone Number, Date of Birth, and "Callsign" (Nickname). This is used to create your secure account and verify your reservation.
                        </li>
                        <li className="bg-[#151816] p-6 rounded-xl border border-white/5">
                           <strong className="block text-white mb-2">Mission Data</strong>
                           Check-in/out dates, room preferences, and transaction history.
                        </li>
                        <li className="bg-[#151816] p-6 rounded-xl border border-white/5">
                           <strong className="block text-white mb-2">Technical Data</strong>
                           IP address and device information for security logs and ensuring network integrity during your stay.
                        </li>
                     </ul>
                  </div>
               </section>

               <section id="usage" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">02.</span> Operational Usage
                  </h2>
                  <div className="text-ivory/70 space-y-4 text-lg">
                     <p>
                        We do not sell your data. We use it strictly to:
                     </p>
                     <ul className="list-disc pl-5 space-y-2">
                        <li>Process your booking and payments securely.</li>
                        <li>Facilitate check-in (including generating your digital access codes).</li>
                        <li>Communicate important updates regarding your stay (e.g., weather warnings for helicopter transfers).</li>
                        <li>Maintain the safety of our premises.</li>
                     </ul>
                  </div>
               </section>

               <section id="bio-data" className="scroll-mt-32">
                  <div className="bg-terra/10 border border-terra/30 p-8 rounded-2xl">
                     <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                        <span className="text-terra/50 text-xl font-sans">03.</span> Biological & Dietary Protocol
                     </h2>
                     <div className="text-ivory/80 space-y-4">
                        <p>
                           To fulfill our "Metabolic Architecture" service, we may collect sensitive health-related data, such as:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                           <li>Dietary restrictions and allergies.</li>
                           <li>Specific nutritional protocols (Keto, Paleo, Vegan).</li>
                           <li>Sleep preferences (temperature settings).</li>
                        </ul>
                        <p className="mt-4 text-sm border-t border-terra/20 pt-4">
                           <strong className="text-white">Storage Policy:</strong> This data is stored locally within your guest profile for the duration of your membership. It is never shared with third-party advertisers. It is accessible only to our Concierge and Executive Chef teams for service delivery.
                        </p>
                     </div>
                  </div>
               </section>

               <section id="sharing" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">04.</span> Third-Party & Sharing
                  </h2>
                  <div className="text-ivory/70 text-lg leading-loose">
                     <p>
                        We share data only when operationally necessary:
                     </p>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
                        <li className="bg-[#151816] p-4 rounded-lg border border-white/5">
                           <strong className="block text-white mb-1">Payment Processors</strong>
                           To securely process credit card transactions (we do not store full card numbers).
                        </li>
                        <li className="bg-[#151816] p-4 rounded-lg border border-white/5">
                           <strong className="block text-white mb-1">Search & Rescue</strong>
                           In an emergency, your itinerary and last known location (via Garmin/Starlink) may be shared with emergency services.
                        </li>
                        <li className="bg-[#151816] p-4 rounded-lg border border-white/5">
                           <strong className="block text-white mb-1">Cloud Infrastructure</strong>
                           We use secure cloud providers (Supabase) to host our encrypted database.
                        </li>
                     </ul>
                  </div>
               </section>

               <section id="security" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">05.</span> Security Infrastructure
                  </h2>
                  <div className="flex items-start gap-4 bg-[#151816] p-6 rounded-xl border border-white/10">
                     <div className="p-3 bg-white/5 rounded-full text-terra"><Icons.Lock /></div>
                     <div>
                        <h4 className="font-bold text-ivory mb-2">Encryption Standards</h4>
                        <p className="text-sm text-ivory/60 leading-relaxed">
                           All data in transit is encrypted via TLS 1.3. User passwords and sensitive tokens are hashed and salted using industry-standard algorithms (Argon2 via Supabase Auth). We employ strict Row Level Security (RLS) to ensure you can only access your own data.
                        </p>
                     </div>
                  </div>
               </section>

               <section id="rights" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">06.</span> Your Rights
                  </h2>
                  <div className="prose prose-invert prose-lg text-ivory/70 leading-loose">
                     <p>
                        You retain full sovereignty over your data. You have the right to:
                     </p>
                     <ul className="list-disc pl-5">
                        <li>Request a copy of all data we hold about you.</li>
                        <li>Request correction of any inaccurate data.</li>
                        <li>Request the "Right to be Forgotten" (complete deletion of your account and history), subject to legal record-keeping requirements (e.g., tax laws).</li>
                     </ul>
                  </div>
               </section>

               <section id="contact" className="scroll-mt-32">
                  <h2 className="text-3xl font-serif text-terra mb-6 flex items-center gap-4">
                     <span className="text-white/20 text-xl font-sans">07.</span> Contact Privacy Officer
                  </h2>
                  <p className="text-ivory/70 leading-loose mb-6">
                     If you have any questions regarding this protocol or wish to exercise your rights, please contact our dedicated team.
                  </p>
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
                  </div>
               </section>

            </div>

         </div>
      </div>

    </main>
  );
}