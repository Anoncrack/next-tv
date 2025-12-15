'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import activitiesData from '@/app/data/activities.json';

import { 
  IconBoat, 
  IconTrophy, 
  IconSpa, 
  IconHiking, 
  IconDining,
  IconVoyageArrow 
} from './icons/tvicons';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'boat': IconBoat,
  'trophy': IconTrophy,
  'spa': IconSpa,
  'hiking': IconHiking,
  'dining': IconDining,
  'default': IconVoyageArrow,
};

const ActivitiesSection = () => {
  return (
    <section className="bg-forest py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-350 mx-auto">
        
        <div className="text-center mb-16">
          <span className="label-upper text-terra mb-3 block">
            Discover
          </span>
          <h2 className="heading-section text-ivory mb-4">
            Choose Your <span className="italic text-terra">Flow State</span>
          </h2>
          <p className="text-body max-w-xl mx-auto">
            From high-octane training to deep relaxation, our facilities are designed to optimize your performance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-75 w-full">
          
          {activitiesData.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || ICON_MAP['default'];

            return (
              <Link 
                key={item.id} 
                href={`/activities/${item.id}`} 
                className={`
                  group relative 
                  flex-1 
                  min-h-75 lg:min-h-0
                  overflow-hidden rounded-3xl cursor-pointer
                  transition-all duration-700 ease-out
                  lg:hover:grow-2 hover:shadow-2xl hover:shadow-forest/20
                `}
              >
                <Image
                  src={item.hero_image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-forest/30 group-hover:bg-forest/60 transition-colors duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  
                  <div className="
                    text-ivory/90 mb-4 
                    transform transition-all duration-500
                    group-hover:text-terra group-hover:scale-125 group-hover:-translate-y-2
                  ">
                    <IconComponent className="w-12 h-12" />
                  </div>

                  <div className="overflow-hidden">
                    <h3 className={`
                      font-serif text-3xl text-ivory
                      transform transition-all duration-500 ease-out
                      translate-y-8 opacity-0 
                      group-hover:translate-y-0 group-hover:opacity-100
                    `}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="
                    mt-4 opacity-0 transform translate-y-4 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-700 delay-100
                  ">
                    <span className="text-xs font-bold uppercase tracking-widest text-ivory border-b border-terra pb-1">
                      Explore
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default ActivitiesSection;