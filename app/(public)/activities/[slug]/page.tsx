import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

import activitiesData from '@/app/data/activities.json';

const Icons = {
  ArrowLeft: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  ArrowRight: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Check: () => <svg className="wh5 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  
  Users: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Clock: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Wifi: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Star: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,

  Anchor: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>,
  
  Chef: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 13v8"/><path d="M12 3a3 3 0 0 0-3 3v.89a1.01 1.01 0 0 1-.22.63 4.22 4.22 0 0 0 1.47 6.46"/><path d="M12 3a3 3 0 0 1 3 3v.89a1.01 1.01 0 0 0 .22.63 4.22 4.22 0 0 1-1.47 6.46"/><path d="M8 15h8"/><path d="M12 15v3"/></svg>,
  Wine: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/></svg>,
  Leaf: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,

  Mountain: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
  Dumbbell: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>,
  
  Thermometer: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>,
  
  Shield: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Lock: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

const getSpecIcon = (key: string) => {
  const k = key.toLowerCase();
  
  if (k.includes('capacity') || k.includes('guest') || k.includes('crew') || k.includes('seating')) return <Icons.Users />;
  if (k.includes('duration') || k.includes('time') || k.includes('session')) return <Icons.Clock />;
  if (k.includes('internet') || k.includes('wifi') || k.includes('connect')) return <Icons.Wifi />;
  
  if (k.includes('vessel') || k.includes('boat')) return <Icons.Anchor />;
  
  if (k.includes('food') || k.includes('dining') || k.includes('dietary')) return <Icons.Chef />;
  if (k.includes('wine')) return <Icons.Wine />;
  if (k.includes('sourcing') || k.includes('environment')) return <Icons.Leaf />;
  
  if (k.includes('equipment') || k.includes('gym')) return <Icons.Dumbbell />;
  if (k.includes('difficulty') || k.includes('elevation') || k.includes('distance') || k.includes('gear')) return <Icons.Mountain />;
  
  if (k.includes('temp')) return <Icons.Thermometer />;
  
  if (k.includes('access') || k.includes('safety') || k.includes('guide') || k.includes('coach')) return <Icons.Shield />;
  if (k.includes('etiquette') || k.includes('open')) return <Icons.Lock />;

  return <Icons.Star />;
};

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activitiesData.find((item) => item.id === slug);

  if (!activity) return notFound();

  const otherActivities = activitiesData
    .filter((a) => a.id !== slug)
    .slice(0, 3);

  const { title, subtitle, hero_image, full_content, gallery, features, specs } = activity;

  return (
    <main className="bg-ivory min-h-screen">
      <Navigation />
      
      <div className="relative h-[65vh] w-full overflow-hidden">
        <Image src={hero_image} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto w-full">
            <Link 
              href="/#activities" 
              className="inline-flex items-center gap-2 text-ivory/80 hover:text-terra transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <Icons.ArrowLeft /> Back to Explore
            </Link>
            <h1 className="display-hero mb-4 text-white drop-shadow-lg">{title}</h1>
            <p className="text-xl md:text-3xl text-ivory/90 font-serif italic max-w-3xl leading-snug">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 -mt-12 relative z-10 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-forest/5 border border-forest/5">
            <div 
              className="
                prose prose-lg prose-slate max-w-none
                prose-headings:font-serif prose-headings:text-forest prose-headings:text-3xl prose-headings:mt-8 prose-headings:mb-6
                prose-p:text-forest/80 prose-p:leading-loose prose-p:text-lg prose-p:mb-6
                prose-li:text-forest/80 prose-ul:my-6
                prose-strong:text-forest prose-strong:font-bold
              "
              dangerouslySetInnerHTML={{ __html: full_content || '<p>Details coming soon.</p>' }} 
            />

            {features && features.length > 0 && (
              <div className="mt-12 pt-12 border-t border-slate-100">
                <h3 className="font-serif text-2xl text-forest mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center group-hover:bg-terra/10 transition-colors">
                        <Icons.Check />
                      </div>
                      <span className="font-bold text-forest text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-forest text-ivory p-8 md:p-10 rounded-3xl sticky top-32 shadow-2xl border border-white/5">
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="font-serif text-3xl text-terra italic mb-2">Specifications</h3>
                <p className="text-white/60 text-sm">Vital details for your mission planning.</p>
              </div>
              
              {specs && Object.keys(specs).length > 0 ? (
                <div className="grid grid-cols-1 gap-6 mb-12">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-terra border border-white/5 shadow-inner shrink-0">
                        {getSpecIcon(key)}
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">{key}</span>
                        <span className="font-bold text-lg text-ivory font-serif">{String(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 italic mb-8">Details available on request.</p>
              )}

              <Link href="/book" className="block w-full">
                <button className="btn-accent w-full py-5 text-sm md:text-base">
                  Reserve This Experience
                </button>
              </Link>
              
              <div className="mt-6 flex justify-center items-center gap-2 text-white/40 text-xs">
                <Icons.Wifi />
                <span>Live availability check enabled</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. GALLERY SECTION */}
      {gallery && gallery.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-32">
          <div className="flex items-end justify-between mb-8">
             <h3 className="heading-section">Visual Journal</h3>
             <span className="hidden md:block text-xs uppercase tracking-widest text-forest/50 font-bold">Captured on location</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
            <div className="md:col-span-8 relative rounded-3xl overflow-hidden group h-[300px] md:h-full">
               <Image 
                 src={gallery[0]} 
                 alt="Gallery Main" 
                 fill 
                 className="object-cover transition-transform duration-1000 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="md:col-span-4 flex flex-col gap-6 h-full">
              {gallery.slice(1, 3).map((img, idx) => (
                <div key={idx} className="relative flex-1 rounded-3xl overflow-hidden group min-h-[200px]">
                  <Image 
                    src={img} 
                    alt={`Gallery ${idx}`} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. OTHER ACTIVITIES (SEE ALSO) */}
      <section className="bg-white border-t border-forest/5 py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="label-upper text-terra mb-2 block">Curate Your Stay</span>
              <h2 className="heading-section">Continue Your Journey</h2>
            </div>
            <Link href="/#activities" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-terra transition-colors">
              View All <Icons.ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherActivities.map((item) => (
              <Link key={item.id} href={`/activities/${item.id}`} className="group cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src={item.hero_image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  
                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center text-ivory border border-ivory/30">
                       <Icons.ArrowRight />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                   <h3 className="text-2xl font-serif text-forest group-hover:text-terra transition-colors mb-2">
                     {item.title}
                   </h3>
                   <p className="text-forest/60 text-sm line-clamp-2">
                     {item.subtitle}
                   </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="mt-12 text-center md:hidden">
            <Link href="/#activities" className="btn-outline inline-flex">
              View All Activities
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}