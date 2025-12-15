'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import faqData from '@/app/data/faq.json';

const Icons = {
  Plus: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Minus: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>,
  
  ArrowRight: ({ className }: { className?: string }) => (
    <svg 
      className={`wh4 ${className || ''}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const featuredFaqs = faqData[0].questions.concat(faqData[1].questions[0]).slice(0, 4);

  return (
    <section className="py-24 bg-forest relative overflow-hidden border-t border-white/5">
      
      

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="label-upper text-terra mb-3 block">Common Queries</span>
          <h2 className="heading-section text-ivory">
            Everything you need <br /> to <span className="italic text-terra">prepare.</span>
          </h2>
        </div>

        <div className="space-y-4 mb-12">
          {featuredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`
                  rounded-2xl transition-all duration-300 border
                  ${isOpen 
                    ? 'bg-white/10 border-terra/50 shadow-lg backdrop-blur-sm' 
                    : 'bg-transparent border-white/10 hover:border-white/30'   
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`text-lg font-serif font-bold transition-colors ${isOpen ? 'text-terra' : 'text-ivory'}`}>
                    {faq.q}
                  </span>
                  <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-terra' : 'text-ivory/50'}`}>
                    {isOpen ? <Icons.Minus /> : <Icons.Plus />}
                  </span>
                </button>
                
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden px-6">
                    <p className="text-ivory/70 leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/guide">
            <button className="
              group inline-flex items-center gap-2 
              border border-ivory/30 text-ivory 
              px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold
              hover:bg-ivory hover:text-forest hover:border-ivory
              transition-all duration-300
            ">
              Open Guest Handbook <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;