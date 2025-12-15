'use client'; 
 
import Navigation from '@/app/components/Navigation';
import HeroSection from '@/app/components/HeroSection';
import WhySection from '@/app/components/WhySection';
import ActivitiesSection from '@/app/components/ActivitiesSection';
import RoomsSection from '@/app/components/RoomsSection'; 

import NewsSection from '@/app/components/NewsSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import FAQSection from '@/app/components/FAQSection';
import Footer from '@/app/components/Footer';
import DiningSection from '@/app/components/DiningSection';

import roomsData from '@/app/data/rooms.json';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <HeroSection />
       
        <section id="activities">
          <ActivitiesSection />
        </section>
        
        <section id="rooms">
          <RoomsSection rooms={roomsData} />
        </section>
         <WhySection />
        
        <section id="news">
          <NewsSection />
        </section>

        <TestimonialsSection />

        <section id="dining">
          <DiningSection />
        </section>
        
        <section id="faq">
          <FAQSection />
        </section>
      </main>
      <Footer />
    </>
  );
}