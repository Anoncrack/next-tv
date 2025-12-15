'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signout, updateProfile } from './actions';
import { createClient } from '@/utils/supabase/client';
import roomsData from '@/app/data/rooms.json';

const Icons = {
  LogOut: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  ArrowLeft: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  Edit: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Lock: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  
  Calendar: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  User: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Map: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,

  Spa: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22C12 22 17 18 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 18 12 22 12 22Z"/><path d="M12 7V3"/><path d="M16.5 8.5L19.5 5.5"/><path d="M7.5 8.5L4.5 5.5"/></svg>,
  Chef: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>,
  Gym: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>,
  Car: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>,

  Wifi: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  Ac: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
  Work: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Coffee: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>,
  Pet: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg>,
  Check: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
};

const getLabelForId = (id: string) => {
  const map: Record<string, string> = {
    wifi: "Fiber WiFi",
    ac: "Climate Control",
    workspace: "Ergo Desk",
    kitchen: "Kitchenette",
    soundproof: "Acoustic Walls",
    pet: "Pet Friendly",
    coffee: "Barista Station",
    gym: "Gym Access",
    chef: "Private Chef",
    spa: "Nordic Spa",
    pickup: "Tesla Transfer",
    transfer: "Airport Transfer"
  };
  return map[id.toLowerCase()] || id;
}

const getIconForId = (id: string) => {
  const key = id.toLowerCase().trim();
  if (key.includes('spa') || key.includes('pool')) return Icons.Spa;
  if (key.includes('chef') || key.includes('food')) return Icons.Chef;
  if (key.includes('gym') || key.includes('fitness')) return Icons.Gym;
  if (key.includes('transfer') || key.includes('pickup')) return Icons.Car;
  if (key.includes('wifi')) return Icons.Wifi;
  if (key.includes('ac') || key.includes('climate')) return Icons.Ac;
  if (key.includes('work') || key.includes('desk')) return Icons.Work;
  if (key.includes('pet')) return Icons.Pet;
  if (key.includes('coffee')) return Icons.Coffee;
  return Icons.Check;
};

type BookingDisplay = {
  id: string;
  roomTitle: string;
  roomImage: string;
  dates: string;
  guests: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  details: string | null;
  addOns: string[];
  note: string;
  roomAmenities: string[];
  created_at: string;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'status' | 'profile'>('reservations');
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<BookingDisplay[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        setProfileForm({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          dob: user.user_metadata?.dob || ''
        });

        const { data: bookingData, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (bookingData && !error) {
          const formattedBookings: BookingDisplay[] = bookingData.map((b) => {
            const roomInfo = roomsData.find(r => r.id === b.room_id);
            
            let addOns: string[] = [];
            let note = "";
            const detailsStr = b.details || "";
            const addonsMatch = detailsStr.match(/Add-ons: (.*?)\./);
            if (addonsMatch && addonsMatch[1]) {
               addOns = addonsMatch[1].split(',').map((s: string) => s.trim()).filter(Boolean);
            }
            const noteMatch = detailsStr.match(/Note: (.*)/);
            if (noteMatch && noteMatch[1]) {
               note = noteMatch[1].trim();
            }

            return {
              id: b.id,
              roomTitle: roomInfo ? roomInfo.title : `Room #${b.room_id}`,
              roomImage: roomInfo ? roomInfo.images[0] : '/images/hero/hero4.webp',
              dates: `${new Date(b.check_in).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(b.check_out).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
              guests: b.guests,
              price: b.total_price,
              status: b.status,
              details: b.details,
              addOns: addOns,
              note: note,
              roomAmenities: roomInfo ? roomInfo.amenities.slice(0, 4) : [],
              created_at: b.created_at
            };
          });
          setBookings(formattedBookings);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    const formData = new FormData();
    formData.append('fullName', profileForm.fullName);
    formData.append('phone', profileForm.phone);
    formData.append('dob', profileForm.dob);
    await updateProfile(formData);
  };

  if (isLoading) return (
    <div className="min-h-screen bg-dim flex items-center justify-center text-ivory">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-terra border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs uppercase tracking-widest text-white/40">Loading Protocol...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-dim min-h-screen text-ivory pb-24">
      
      <header className="sticky top-0 z-40 bg-dim/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="relative w-32 h-8 opacity-80 hover:opacity-100 transition-opacity">
            <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
            <div className="w-4 h-4"><Icons.ArrowLeft /></div> <span className="hidden sm:inline">Return to Site</span>
          </Link>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <button onClick={() => signout()} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-terra transition-colors">
            <div className="w-4 h-4"><Icons.LogOut /></div> <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        <div className="mb-12">
           <span className="text-terra text-xs font-bold uppercase tracking-widest mb-2 block">Mission Control</span>
           <h1 className="text-4xl md:text-6xl font-serif text-ivory mb-2">
             Welcome back, <span className="italic text-white/60">{profileForm.fullName || user?.email?.split('@')[0]}</span>
           </h1>
        </div>

        <div className="flex gap-8 border-b border-white/10 mb-10 overflow-x-auto">
          <button onClick={() => setActiveTab('reservations')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'reservations' ? 'text-terra border-b-2 border-terra' : 'text-white/40 hover:text-white'}`}>My Reservations</button>
          <button onClick={() => setActiveTab('status')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'status' ? 'text-terra border-b-2 border-terra' : 'text-white/40 hover:text-white'}`}>Client Status</button>
          <button onClick={() => setActiveTab('profile')} className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'text-terra border-b-2 border-terra' : 'text-white/40 hover:text-white'}`}>Account Info</button>
        </div>

        {activeTab === 'reservations' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {bookings.length > 0 ? (
              bookings.map((res) => (
                <div key={res.id} className="bg-[#151816] rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row group hover:border-terra/30 transition-colors">
                  
                  <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0">
                    <Image src={res.roomImage} alt={res.roomTitle} fill className="object-cover" />
                    <div className="absolute top-4 left-4 md:hidden">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-[#0f1110]/80 backdrop-blur ${
                          res.status === 'pending' ? 'text-yellow-500 border-yellow-500/20' : 
                          res.status === 'confirmed' ? 'text-green-500 border-green-500/20' : 
                          'text-red-500 border-red-500/20'
                        }`}>
                          {res.status === 'pending' ? 'Pending' : res.status}
                       </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-serif text-ivory mb-2">{res.roomTitle}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-white/50 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Icons.Calendar /> {res.dates}</span>
                          <span className="flex items-center gap-2"><Icons.User /> {res.guests} Guests</span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          res.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          res.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {res.status === 'pending' ? 'Review Pending' : res.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6 mb-6">
                       
                       <div>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3 block">Included Amenities</span>
                          <div className="grid grid-cols-2 gap-3">
                             {res.roomAmenities.map((am) => {
                                const IconComponent = getIconForId(am);
                                return (
                                   <div key={am} className="flex items-center gap-3 group/icon">
                                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-terra/80 group-hover/icon:text-terra group-hover/icon:bg-terra/10 transition-colors">
                                         <div className="w-4 h-4"><IconComponent /></div>
                                      </div>
                                      <span className="text-xs font-bold text-ivory/70 capitalize">{getLabelForId(am)}</span>
                                   </div>
                                )
                             })}
                          </div>
                       </div>

                       {res.addOns.length > 0 && (
                          <div>
                             <span className="text-[10px] text-terra uppercase tracking-widest font-bold mb-3 block">Selected Upgrades</span>
                             <div className="grid grid-cols-2 gap-3">
                                {res.addOns.map((addon) => {
                                   const IconComponent = getIconForId(addon);
                                   return (
                                      <div key={addon} className="flex items-center gap-3 group/icon">
                                         <div className="w-8 h-8 rounded-lg bg-terra/10 border border-terra/30 flex items-center justify-center text-terra shadow-[0_0_10px_rgba(188,93,46,0.1)]">
                                            <div className="w-4 h-4"><IconComponent /></div>
                                         </div>
                                         <span className="text-xs font-bold text-ivory capitalize">{getLabelForId(addon)}</span>
                                      </div>
                                   )
                                })}
                             </div>
                          </div>
                       )}
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                       <div className="max-w-[50%]">
                          {res.note && (
                             <p className="text-xs text-white/40 italic leading-relaxed border-l-2 border-white/10 pl-3">
                                "{res.note}"
                             </p>
                          )}
                       </div>
                       <div className="text-right">
                          <div className="text-3xl font-serif text-ivory">${res.price}</div>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">Total Value</span>
                       </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-white/10 rounded-3xl bg-white/2">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-terra mb-6">
                    <div className="w-8 h-8"><Icons.Map /></div>
                 </div>
                 <h3 className="text-xl font-serif text-ivory mb-2">You have no reservations yet</h3>
                 <p className="text-white/50 max-w-md mb-8 leading-relaxed">
                    Browse our catalog to select your sanctuary.
                 </p>
                 <Link href="/#rooms">
                    <button className="btn-accent px-8 py-3 text-xs uppercase tracking-widest shadow-lg shadow-terra/10">
                       Explore Catalog
                    </button>
                 </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'status' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
             <div className="bg-[#1a1c1b] p-8 md:p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-terra/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                   <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 uppercase tracking-widest mb-6">Current Status</span>
                   <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6">Standard Guest</h2>
                   <p className="text-ivory/70 leading-relaxed mb-8">We look forward to welcoming you to ThunderVoyage.</p>
                   <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                         <span className="block text-[10px] uppercase text-white/30 mb-1">Visits</span>
                         <span className="text-xl font-bold text-ivory">{bookings.length}</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                         <span className="block text-[10px] uppercase text-white/30 mb-1">Total Spent</span>
                         <span className="text-xl font-bold text-ivory">${bookings.filter(b => b.status === 'confirmed').reduce((acc, curr) => acc + curr.price, 0)}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
             <div className="bg-[#151816] p-8 rounded-3xl border border-white/10">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-serif text-2xl text-ivory">Personal Information</h3>
                   {!isEditing && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-xs font-bold text-terra uppercase tracking-widest hover:text-white transition-colors">
                         <div className="w-4 h-4"><Icons.Edit /></div> Edit
                      </button>
                   )}
                </div>
                <form onSubmit={handleProfileSave} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 block">Full Name</label>
                      <input type="text" value={profileForm.fullName} onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})} disabled={!isEditing} className={`w-full bg-transparent border-b py-2 text-ivory focus:outline-none transition-colors ${isEditing ? 'border-white/30 focus:border-terra' : 'border-white/5 text-white/60'}`} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 block">Email</label>
                      <input type="email" value={profileForm.email} disabled className="w-full bg-transparent border-b border-white/5 py-2 text-white/40 cursor-not-allowed" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 block">Phone</label>
                      <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} disabled={!isEditing} className={`w-full bg-transparent border-b py-2 text-ivory focus:outline-none transition-colors ${isEditing ? 'border-white/30 focus:border-terra' : 'border-white/5 text-white/60'}`} />
                   </div>
                   {isEditing && (
                      <div className="flex gap-4 pt-4">
                         <button type="submit" className="btn-accent py-3 px-8 text-xs uppercase tracking-widest">Save</button>
                         <button type="button" onClick={() => setIsEditing(false)} className="btn-outline py-3 px-8 text-xs uppercase tracking-widest border-white/10">Cancel</button>
                      </div>
                   )}
                </form>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}