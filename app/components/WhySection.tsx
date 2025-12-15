'use client';

import React from 'react';
import Image from 'next/image';
import { 
  IconBolt, 
  IconLeaf, 
  IconShield, 
  IconNetwork 
} from './icons/tvicons';

const FEATURES = [
  {
    id: 1,
    title: "Hyper-Fast Connectivity",
    desc: "Dedicated fiber line with Starlink backup. Guaranteed 1Gbps symmetrical speeds.",
    stat: "1 Gbps",
    icon: IconBolt,
  },
  {
    id: 2,
    title: "Deep Work Environment",
    desc: "Acoustically treated pods and 'Monk Mode' cabins designed for absolute focus.",
    stat: "0 dB",
    icon: IconShield,
  },
  {
    id: 3,
    title: "Untouched Wilderness",
    desc: "50 acres of private forest. Nature isn't just a view here; it's your living room.",
    stat: "50 Acres",
    icon: IconLeaf,
  },
  {
    id: 4,
    title: "Curated Community",
    desc: "We vet every guest. Connect with founders and creators who are here to build.",
    stat: "Top 1%",
    icon: IconNetwork,
  }
];

const WhySection = () => {
  return (
    <section className="bg-forest py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      
      <div className="max-w-350 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              
              <span className="label-upper text-terra mb-4 block">
                Why ThunderVoyage
              </span>

              <h2 className="heading-section text-ivory mb-8 max-w-md">
                Designed for the <span className="italic text-terra">Modern</span> <br/>
                Digital Athlete.
              </h2>

              <p className="text-body text-ivory/80 mb-12 max-w-sm">
                We bridge the gap between a 5-star wilderness resort and a high-performance tech campus.
              </p>

              <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                 <Image 
                   src="/images/why-cabin.webp"
                   alt="Cabin in woods"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-forest/90 via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                    <p className="font-serif italic text-ivory text-xl">
                      "The perfect balance of grind and grounding."
                    </p>
                 </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-9 pt-0 lg:pt-36">
            
            {FEATURES.map((feature) => (
              <div 
                key={feature.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center rounded-3xl group hover:bg-white/10 hover:border-terra/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-moss text-ivory flex items-center justify-center shrink-0 group-hover:bg-terra group-hover:text-ivory transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>

                <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-2xl text-ivory group-hover:text-terra transition-colors">
                        {feature.title}
                      </h3>
                      <span className="hidden md:block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-ivory/60 group-hover:text-terra group-hover:border-terra/30 transition-colors">
                        {feature.stat}
                      </span>
                   </div>
                   
                   <p className="text-body text-ivory/70 text-sm md:text-base">
                     {feature.desc}
                   </p>

                   <div className="mt-4 md:hidden">
                      <span className="text-terra font-bold text-sm uppercase tracking-wider">
                        {feature.stat}
                      </span>
                   </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhySection;