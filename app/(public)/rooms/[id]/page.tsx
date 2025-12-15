import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import roomsData from '@/app/data/rooms.json';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

const Icons = {
  ArrowLeft: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  Star: () => <svg className="terra4" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg className="wh5 text-terra" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  User: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Maximize: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>,
  Bed: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
  Eye: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Wifi: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Monitor: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>,
  ArrowRight: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
};

const getAmenityDetails = (id: string) => {
  const map: Record<string, { label: string, icon: any }> = {
    wifi: { label: "Fiber WiFi (1Gbps)", icon: Icons.Wifi },
    ac: { label: "Climate Control", icon: Icons.Check },
    workspace: { label: "Ergonomic Workspace", icon: Icons.Monitor },
    monitor: { label: "4K External Monitor", icon: Icons.Monitor },
    kitchen: { label: "Kitchenette", icon: Icons.Check },
    pool: { label: "Plunge Pool / Ice Bath", icon: Icons.Check },
    soundproof: { label: "Soundproof Walls", icon: Icons.Check },
    pet: { label: "Pet Friendly", icon: Icons.Check },
    coffee: { label: "Barista Station", icon: Icons.Check },
    recovery: { label: "Recovery Gear", icon: Icons.Check },
    fireplace: { label: "Wood Stove", icon: Icons.Check },
    smart_tv: { label: "Smart TV", icon: Icons.Monitor },
    whiteboard: { label: "Ideation Wall", icon: Icons.Check },
    bath: { label: "Soaking Tub", icon: Icons.Check },
  };
  return map[id] || { label: id, icon: Icons.Check };
};

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = roomsData.find((r) => r.id === Number(id));

  if (!room) return notFound();

  const similarRooms = roomsData.filter(r => r.category === room.category && r.id !== room.id).slice(0, 3);

  return (
    <main className="bg-ivory min-h-screen pb-24">
      <Navigation />
      <div className="relative h-[70vh] w-full overflow-hidden group">
        <Image
          src={room.images[0]}
          alt={room.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-8 px-4 sm:px-6">
          <div className="max-w-[1400px] mx-auto w-full">
            <Link 
              href="/#rooms" 
              className="inline-flex items-center gap-2 text-ivory/80 hover:text-terra transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
            >
              <Icons.ArrowLeft /> Back to Accommodations
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
               <span className="bg-terra text-ivory text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-lg">
                 {room.category}
               </span>
               <div className="flex items-center gap-1 text-terra bg-forest/80 backdrop-blur px-3 py-1 rounded-md text-xs font-bold border border-white/10">
                 <Icons.Star /> {room.rating} / 5.0
               </div>
            </div>

            <h1 className="display-hero mb-4 text-white drop-shadow-lg max-w-4xl">
              {room.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-forest/95 backdrop-blur-md border-b border-white/10 text-ivory py-4 px-4 sm:px-6 shadow-xl">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-6 md:gap-12 text-sm">
              <div className="flex items-center gap-2 text-ivory/70">
                <Icons.User /> <span className="font-bold text-ivory">{room.guests} Guests</span>
              </div>
              <div className="flex items-center gap-2 text-ivory/70">
                <Icons.Maximize /> <span className="font-bold text-ivory">{room.size}m²</span>
              </div>
              <div className="flex items-center gap-2 text-ivory/70 hidden sm:flex">
                <Icons.Bed /> <span className="font-bold text-ivory">{room.bed_type}</span>
              </div>
              <div className="flex items-center gap-2 text-ivory/70 hidden md:flex">
                <Icons.Eye /> <span className="font-bold text-ivory">{room.view} View</span>
              </div>
           </div>

           <div className="flex items-center gap-6 ml-auto">
              <div className="text-right hidden sm:block">
                 <span className="block text-xl font-serif font-bold text-terra">${room.price}</span>
                 <span className="block text-[10px] text-ivory/50 uppercase tracking-widest">Per Night</span>
              </div>
              <Link href={`/book?room=${room.id}`}>
                <button className="bg-terra hover:bg-clay text-ivory px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-terra/20 transition-all active:scale-95">
                   Reserve Now
                </button>
              </Link>
           </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-8">
             <div className="mb-12">
                <h2 className="heading-section mb-6">The Experience</h2>
                <div className="prose prose-lg prose-slate max-w-none text-forest/80 leading-relaxed whitespace-pre-line font-sans">
                   {room.long_description || room.description}
                </div>
             </div>

             <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-sm mb-12">
                <h3 className="font-serif text-2xl text-forest mb-6 flex items-center gap-3">
                   <span className="p-2 bg-forest/5 rounded-full text-terra"><Icons.Monitor /></span>
                   Work & Focus Setup
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {(room as any).work_setup ? (
                      (room as any).work_setup.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 text-forest/80 text-sm font-medium">
                           <Icons.Check /> {item}
                        </div>
                      ))
                   ) : (
                      <div className="flex items-center gap-3 text-forest/80 text-sm font-medium">
                         <Icons.Wifi /> High-Speed Workspace Available
                      </div>
                   )}
                </div>
             </div>

             <div>
                <h3 className="heading-section text-2xl mb-6">Room Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {room.amenities.map((amId) => {
                      const { label, icon: Icon } = getAmenityDetails(amId);
                      return (
                        <div key={amId} className="flex items-center gap-3 p-4 rounded-xl bg-ivory border border-forest/5">
                           <div className="text-terra"><Icon /></div>
                           <span className="text-sm font-bold text-forest">{label}</span>
                        </div>
                      )
                   })}
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             {room.images.length > 1 && (
               <div className="grid grid-cols-2 gap-4">
                  {room.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className={`relative rounded-2xl overflow-hidden shadow-md aspect-square ${idx === 0 ? 'col-span-2 aspect-video' : ''}`}>
                       <Image src={img} alt={`Detail ${idx}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                  ))}
               </div>
             )}

             <div className="bg-forest text-ivory p-8 rounded-3xl sticky top-40 shadow-2xl">
                <h3 className="font-serif text-2xl text-terra italic mb-4">Why choose this?</h3>
                <p className="text-ivory/70 text-sm leading-relaxed mb-6">
                   Perfect for {room.category.toLowerCase()} seeking absolute focus.
                </p>
                <div className="space-y-3 pt-6 border-t border-white/10">
                   <div className="flex justify-between text-sm">
                      <span className="text-ivory/50">Noise Level</span>
                      <span className="font-bold">Whisper Quiet</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-ivory/50">Check-in</span>
                      <span className="font-bold">3:00 PM</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      {similarRooms.length > 0 && (
        <section className="bg-white py-20 border-t border-forest/5">
           <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
              <h2 className="heading-section mb-10">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {similarRooms.map((r) => (
                    <Link key={r.id} href={`/rooms/${r.id}`} className="group block">
                       <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                          <Image src={r.images[0]} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-forest">{r.category}</div>
                       </div>
                       <h3 className="font-serif text-xl text-forest group-hover:text-terra transition-colors">{r.title}</h3>
                       <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-forest/60">${r.price} / night</span>
                          <span className="text-xs font-bold text-terra uppercase tracking-widest flex items-center gap-1">View <Icons.ArrowRight /></span>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      )}

      <Footer />
    </main>
  );
}