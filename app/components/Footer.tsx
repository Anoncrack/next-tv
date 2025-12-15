'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Icons = {
  Instagram: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Twitter: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5 .2 5s3.6 1 7.2-2.1c-6.8-1-7.1-7.6-7.1-7.6s2.3.9 3.3 0C.7 4.1 2.2.8 2.2.8s1.8 1.1 3.5 1.1a7.6 7.6 0 0 1 16.3-1.5z"/></svg>,
  Linkedin: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  ArrowRight: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
};

const NAV_LINKS = [
  { id: 'I', label: 'Accommodations', href: '/#rooms' },
  { id: 'II', label: 'Wellness & Spa', href: '/activities/spa' },
  { id: 'III', label: 'Expeditions', href: '/#activities' },
  { id: 'IV', label: 'Dining', href: '/#dining' },
  { id: 'V', label: 'The Journal', href: '/#news' },
  { id: 'VI', label: 'Guest Handbook', href: '/guide' },
];

const Footer = () => {
  return (
    <footer className="bg-forest text-ivory relative overflow-hidden border-t border-white/10">
      
      <div className="max-w-550 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative">
            
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-terra/5 rounded-tr-full blur-3xl pointer-events-none"></div>

            <nav className="flex flex-col gap-8 relative z-10">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.id} 
                  href={link.href}
                  className="group flex items-baseline gap-8 md:gap-12"
                >
                  <span className="text-xs font-serif text-white/30 w-6 text-right group-hover:text-terra transition-colors">
                    {link.id}
                  </span>
                  <span className="text-3xl md:text-5xl font-serif text-ivory group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-24">
               <p className="text-white/30 text-xs uppercase tracking-widest">
                 © 2025 ThunderVoyage Inc. All rights reserved.
               </p>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 md:p-16 flex flex-col justify-between relative bg-black/10">
            
            <div className="mb-12">
               <div className="relative w-32 h-10 mb-6">
                 <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" />
               </div>
               <p className="text-ivory/60 text-sm leading-relaxed max-w-xs font-sans">
                 A sanctuary for deep work and biological optimization in the heart of the Canadian wilderness.
               </p>
            </div>

            <div className="space-y-12">
              
              <div>
                <h4 className="font-serif text-xl text-ivory mb-6">Booking & Support</h4>
                <ul className="space-y-3 text-sm text-ivory/70 font-sans">
                  <li><Link href="/guide" className="hover:text-terra transition-colors flex items-center gap-2"><Icons.ArrowRight /> Manage My Booking</Link></li>
                  <li><Link href="/guide" className="hover:text-terra transition-colors flex items-center gap-2"><Icons.ArrowRight /> Guest Handbook</Link></li>
                  <li><Link href="/terms" className="hover:text-terra transition-colors flex items-center gap-2"><Icons.ArrowRight /> Terms & Conditions</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-xl text-ivory mb-4">Base Camp</h4>
                <p className="text-ivory/60 text-sm font-sans leading-relaxed">
                  306 Bow Valley Trail,<br/>
                  Unit 201B,<br/>
                  Canmore, AB T1W 0N2
                </p>
              </div>

              <div>
                <h4 className="font-serif text-xl text-ivory mb-4">Contact</h4>
                <a href="tel:+14036092292" className="block text-ivory/60 text-sm hover:text-terra mb-1">+1 (403) 609-2292</a>
                <a href="mailto:book@thundervoyage.com" className="block text-ivory/60 text-sm hover:text-terra">book@thundervoyage.com</a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;