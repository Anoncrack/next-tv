'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

const Icons = {
  User: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Menu: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
};

const NAV_LINKS = [
  { label: 'Accommodations', href: '/#rooms', desc: 'Suites & Pods' },
  { label: 'Expeditions', href: '/#activities', desc: 'Guided Tours' },
  { label: 'The Club', href: '/membership', desc: 'Strategy Club' },
  { label: 'Dining', href: '/#dining', desc: 'Foraged Menu' },
  { label: 'Journal', href: '/#news', desc: 'Latest Stories' },
  { label: 'FAQ & Guide', href: '/guide', desc: 'Q&A' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-[#0f1110]/90 backdrop-blur-md border-white/10 py-4 shadow-2xl'
            : 'bg-transparent border-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-400 mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 group text-ivory hover:text-terra transition-colors"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className="w-full h-px bg-current transition-all group-hover:w-full"></span>
                <span className="w-2/3 h-px bg-current transition-all group-hover:w-full"></span>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold hidden sm:block">
                Menu
              </span>
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
              <div className={`relative w-32 h-8 md:w-40 md:h-10 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}>
                <Image 
                  src="/images/logo.svg" 
                  alt="Thunder Voyage" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="flex items-center gap-6">
              
              {user ? (
                <Link href="/account" className="hidden lg:flex items-center gap-3 group text-left">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-terra bg-white/5 group-hover:border-terra transition-colors">
                      <Icons.User />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 group-hover:text-terra transition-colors whitespace-nowrap">
                        It&apos;s all for you,
                      </span>
                      <span className="text-xs font-bold text-ivory group-hover:text-white transition-colors">
                        {user.user_metadata?.full_name?.split(' ')[0] || 'Member'}
                      </span>
                   </div>
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="hidden lg:block text-xs font-bold uppercase tracking-widest text-ivory/60 hover:text-white transition-colors"
                >
                  Log In
                </Link>
              )}

              <Link href="/book">
                <button className={`
                  btn-accent px-6 py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg
                  ${isScrolled ? 'bg-terra text-white' : 'bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-terra hover:border-terra'}
                `}>
                  Book Stay
                </button>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-60 bg-[#0f1110] text-ivory flex flex-col animate-in fade-in duration-300">
           
           <div className="flex justify-between items-center px-6 md:px-12 py-6 md:py-8 border-b border-white/5">
              <span className="text-xs uppercase tracking-widest text-white/40">Navigation Protocol</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-terra hover:text-white transition-colors group"
              >
                <div className="group-hover:rotate-90 transition-transform duration-300">
                   <Icons.Close />
                </div>
              </button>
           </div>

           <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-400 mx-auto w-full h-full">
              
              <div className="flex flex-col justify-center px-6 md:px-12 py-8 overflow-y-auto">
                 <nav className="flex flex-col gap-6 md:gap-8">
                    {NAV_LINKS.map((link) => (
                       <Link 
                          key={link.label} 
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-center gap-6"
                       >
                          <div className="flex flex-col">
                             <span className="block text-4xl md:text-6xl font-serif text-ivory group-hover:text-terra group-hover:translate-x-4 transition-all duration-300">
                                {link.label}
                             </span>
                             <span className="block text-xs uppercase tracking-widest text-white/30 group-hover:text-white/60 group-hover:translate-x-4 transition-all duration-500 delay-75 mt-1">
                                {link.desc}
                             </span>
                          </div>
                       </Link>
                    ))}
                 </nav>
              </div>

              <div className="flex flex-col justify-end lg:justify-center px-6 md:px-12 py-12 lg:border-l border-white/5 bg-[#151816]/50">
                 
                 <div className="bg-[#1a1c1b] border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-terra/5 rounded-full blur-2xl group-hover:bg-terra/10 transition-colors"></div>
                    
                    <span className="label-upper text-white/30 mb-6 block">Operator Profile</span>

                    {user ? (
                       <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-full bg-terra flex items-center justify-center text-ivory text-2xl font-serif">
                                {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                             </div>
                             <div>
                                <h3 className="text-2xl font-serif text-ivory">
                                   {user.user_metadata?.full_name || 'Valued Guest'}
                                </h3>
                                <p className="text-white/50 text-sm">{user.email}</p>
                             </div>
                          </div>
                          
                          <div className="h-px bg-white/10 w-full"></div>

                          <div className="flex gap-4">
                             <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex-1">
                                <button className="w-full btn-primary py-3 text-xs bg-white text-black hover:bg-ivory shadow-none">
                                   Dashboard
                                </button>
                             </Link>
                             <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex-1">
                                <button className="w-full btn-outline py-3 text-xs border-white/10 text-white/60 hover:text-white hover:border-white/30">
                                   Reservations
                                </button>
                             </Link>
                          </div>
                       </div>
                    ) : (
                       <div>
                          <h3 className="text-3xl font-serif text-ivory mb-2">Initialize Session</h3>
                          <p className="text-white/50 text-sm mb-8 leading-relaxed">
                             Access your itinerary, bio-preferences, and exclusive member benefits.
                          </p>
                          <div className="flex gap-4">
                             <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1">
                                <button className="w-full btn-outline py-4 text-xs border-white/20 text-ivory hover:bg-white/5">
                                   Log In
                                </button>
                             </Link>
                             <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1">
                                <button className="w-full btn-accent py-4 text-xs shadow-lg shadow-terra/10">
                                   Sign Up
                                </button>
                             </Link>
                          </div>
                       </div>
                    )}
                 </div>

                 <div className="mt-12 flex flex-wrap gap-8 text-xs uppercase tracking-widest text-white/30">
                    <Link href="/guide" onClick={() => setIsMenuOpen(false)} className="hover:text-terra transition-colors">Guest Guide</Link>
                    <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-terra transition-colors">Privacy Protocol</Link>
                    <a href="mailto:book@thundervoyage.com" className="hover:text-terra transition-colors">Contact HQ</a>
                 </div>

              </div>

           </div>
        </div>
      )}
    </>
  );
};

export default Navigation;