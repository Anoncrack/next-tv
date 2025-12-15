'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import roomsData from '@/app/data/rooms.json';

const Icons = {
  Check: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  ChevronLeft: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Calendar: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  User: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Lock: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Close: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const ADD_ONS = [
  { id: 'gym', title: 'Gym Access', price: 50, amenityKey: 'gym', desc: '24/7 Access to Iron Grove' },
  { id: 'chef', title: 'Personal Chef', price: 200, amenityKey: 'chef', desc: 'Dinner service in-room' },
  { id: 'spa', title: 'Nordic Spa Pass', price: 80, amenityKey: 'pool', desc: 'Sauna & Ice Bath circuit' },
  { id: 'pickup', title: 'Airport Transfer', price: 150, amenityKey: 'transfer', desc: 'Private Tesla X pickup' },
];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0];
};

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guestInfo, setGuestInfo] = useState({ fullName: '', email: '', phone: '', password: '', comments: '' });

  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setGuestInfo(prev => ({ 
          ...prev, 
          email: user.email || '', 
          fullName: user.user_metadata?.full_name || '' 
        }));
      }
    };
    checkUser();

    const roomParam = searchParams.get('room');
    if (roomParam) {
      setSelectedRoomId(Number(roomParam));
    }
  }, [searchParams]);

  const selectedRoom = roomsData.find(r => r.id === selectedRoomId);
  
  const getNights = () => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const start = new Date(dates.checkIn);
    const end = new Date(dates.checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = getNights() || 1;
    let total = selectedRoom.price * nights;
    
    ADD_ONS.forEach(addon => {
      if (selectedAddOns.includes(addon.id)) {
        total += addon.price;
      }
    });

    return total;
  };

  const handleNext = () => {
    if (step === 1) {
       if (!dates.checkIn || !dates.checkOut) return alert("Please select both check-in and check-out dates.");
       if (new Date(dates.checkIn) >= new Date(dates.checkOut)) return alert("Check-out must be after check-in.");
    }
    if (step === 2 && !selectedRoomId) return alert("Please select a room");
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const toggleAddOn = (id: string, isIncluded: boolean) => {
    if (isIncluded) return;
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let finalUserId = user?.id;

    if (!user) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: guestInfo.email,
        password: guestInfo.password,
        options: { data: { full_name: guestInfo.fullName } }
      });

      if (authError) {
        alert("Registration failed: " + authError.message);
        setIsLoading(false);
        return;
      }
      finalUserId = authData.user?.id;
    }

    if (finalUserId && selectedRoom) {
      const { error: bookingError } = await supabase.from('bookings').insert({
        user_id: finalUserId,
        room_id: selectedRoom.id,
        check_in: dates.checkIn,
        check_out: dates.checkOut,
        guests: guests,
        total_price: calculateTotal(),
        status: 'pending',
        details: `Add-ons: ${selectedAddOns.join(', ')}. Note: ${guestInfo.comments}`
      });

      if (bookingError) {
        alert("Booking failed: " + bookingError.message);
        setIsLoading(false);
        return;
      }
      router.push('/account');
    }
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    if (direction === 'prev') newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const clickedString = formatDateForInput(clickedDate);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (clickedDate < today) return;

    if (!dates.checkIn || (dates.checkIn && dates.checkOut)) {
      setDates({ checkIn: clickedString, checkOut: '' });
    } else if (dates.checkIn && !dates.checkOut) {
      if (clickedDate < new Date(dates.checkIn)) {
        setDates({ checkIn: clickedString, checkOut: '' });
      } else {
        setDates(prev => ({ ...prev, checkOut: clickedString }));
      }
    }
  };


  const renderStep1 = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <h2 className="text-3xl font-serif text-ivory text-center mb-8">Select Dates & Guests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-[#1a1c1b] border border-white/5 rounded-2xl p-6 select-none">
             <div className="flex justify-between items-center text-ivory mb-6">
                <span className="font-serif text-xl">{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <div className="flex gap-4">
                   <button onClick={() => handleMonthChange('prev')} className="hover:text-terra transition-colors"><Icons.ChevronLeft /></button>
                   <button onClick={() => handleMonthChange('next')} className="hover:text-terra transition-colors"><Icons.ChevronRight /></button>
                </div>
             </div>
             
             <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/30 mb-2 uppercase tracking-widest font-bold">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
             </div>
             
             <div className="grid grid-cols-7 gap-2 text-center text-sm font-sans">
                {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                
                {[...Array(daysInMonth)].map((_, i) => {
                   const day = i + 1;
                   const current = new Date(year, month, day);
                   const currentStr = formatDateForInput(current);
                   
                   const isToday = current.toDateString() === today.toDateString();
                   const isPast = current < new Date(today.setHours(0,0,0,0));
                   const isTooFar = current > maxDate;
                   const isCheckIn = dates.checkIn === currentStr;
                   const isCheckOut = dates.checkOut === currentStr;
                   const isInRange = dates.checkIn && dates.checkOut && current > new Date(dates.checkIn) && current < new Date(dates.checkOut);

                   return (
                      <div 
                         key={day} 
                         onClick={() => !isPast && !isTooFar && handleDateClick(day)}
                         className={`
                            p-2 rounded-md transition-all duration-200 relative
                            ${isPast || isTooFar ? 'text-white/10 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10 text-ivory'}
                            ${isCheckIn || isCheckOut ? 'bg-terra text-white shadow-lg shadow-terra/20 font-bold z-10' : ''}
                            ${isInRange ? 'bg-terra/20 text-white' : ''}
                            ${isToday && !isCheckIn && !isCheckOut ? 'border border-terra/50' : ''}
                         `}
                      >
                         {day}
                      </div>
                   )
                })}
             </div>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-[10px] uppercase text-terra font-bold mb-2 block">Check In</label>
                   <input 
                      type="date" 
                      className="input-base bg-white/5 rounded-lg border-white/10 p-4"
                      value={dates.checkIn}
                      min={formatDateForInput(new Date())}
                      onChange={(e) => setDates({...dates, checkIn: e.target.value})}
                   />
                </div>
                <div>
                   <label className="text-[10px] uppercase text-terra font-bold mb-2 block">Check Out</label>
                   <input 
                      type="date" 
                      className="input-base bg-white/5 rounded-lg border-white/10 p-4"
                      value={dates.checkOut}
                      min={dates.checkIn || formatDateForInput(new Date())}
                      onChange={(e) => setDates({...dates, checkOut: e.target.value})}
                   />
                </div>
             </div>
             
             <div>
                <label className="text-[10px] uppercase text-terra font-bold mb-2 block">Guests</label>
                <select 
  value={guests}
  onChange={(e) => setGuests(Number(e.target.value))}
  className="input-base bg-white/5 rounded-lg border-white/10 p-4 w-full cursor-pointer"
>
  <option value={1} className="bg-[#1a1c1b] text-white">1 Guest (Solo Mission)</option>
  <option value={2} className="bg-[#1a1c1b] text-white">2 Guests (Duo)</option>
  <option value={3} className="bg-[#1a1c1b] text-white">3 Guests</option>
  <option value={4} className="bg-[#1a1c1b] text-white">4 Guests (Squad)</option>
</select>
             </div>

             <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                <span className="text-white/40 text-xs uppercase tracking-widest">Duration</span>
                <div className="text-2xl font-serif text-ivory mt-1">
                   {getNights()} <span className="text-sm font-sans">Nights</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl font-serif text-ivory text-center mb-2">Choose Your Room</h2>
      <p className="text-white/40 text-center mb-8 text-sm">{dates.checkIn} — {dates.checkOut} • {guests} Guests</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
        {roomsData.map((room) => (
          <div 
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}
            className={`
              relative rounded-xl overflow-hidden border cursor-pointer group transition-all duration-300
              ${selectedRoomId === room.id ? 'border-terra ring-1 ring-terra bg-white/5' : 'border-white/10 bg-[#1a1c1b] opacity-80 hover:opacity-100 hover:border-white/30'}
            `}
          >
             <div className="relative h-40 w-full">
                <Image src={room.images[0]} alt={room.title} fill className="object-cover" />
                {selectedRoomId === room.id && (
                   <div className="absolute top-2 right-2 bg-terra text-white p-1 rounded-full"><Icons.Check /></div>
                )}
             </div>
             <div className="p-4">
                <h3 className="font-serif text-lg text-ivory mb-1">{room.title}</h3>
                <div className="flex justify-between items-end">
                   <span className="text-[10px] text-white/50 uppercase tracking-widest">{room.category}</span>
                   <span className="text-terra font-bold">${room.price}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-3xl font-serif text-ivory text-center mb-8">Enhance Your Stay</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
         {ADD_ONS.map((addon) => {
            const isIncluded = selectedRoom?.amenities.some(a => a.includes(addon.amenityKey));
            const isSelected = selectedAddOns.includes(addon.id) || isIncluded;

            return (
               <div 
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id, !!isIncluded)}
                  className={`
                     flex items-center justify-between p-6 rounded-xl border transition-all cursor-pointer
                     ${isIncluded 
                        ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed' 
                        : isSelected 
                           ? 'bg-terra/10 border-terra' 
                           : 'bg-[#1a1c1b] border-white/10 hover:border-white/30'}
                  `}
               >
                  <div className="flex items-center gap-4">
                     <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-terra border-terra text-white' : 'border-white/20'}`}>
                        {isSelected && <Icons.Check />}
                     </div>
                     <div>
                        <h4 className="font-serif text-lg text-ivory">
                           {addon.title} {isIncluded && <span className="text-[10px] text-terra ml-2 bg-terra/10 px-2 py-0.5 rounded uppercase font-sans">Included in Room</span>}
                        </h4>
                        <p className="text-white/40 text-sm">{addon.desc}</p>
                     </div>
                  </div>
                  <span className="font-bold text-ivory">{isIncluded ? 'Free' : `$${addon.price}`}</span>
               </div>
            )
         })}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-md mx-auto">
       <h2 className="text-3xl font-serif text-ivory text-center mb-8">Guest Identity</h2>
       
       {user ? (
          <div className="bg-terra/10 border border-terra/30 p-6 rounded-xl text-center mb-8">
             <div className="w-16 h-16 bg-terra rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl">
                {user.email[0].toUpperCase()}
             </div>
             <h3 className="text-xl text-ivory font-serif mb-1">Logged in as {guestInfo.fullName}</h3>
             <p className="text-white/50 text-sm mb-4">{user.email}</p>
             <p className="text-xs text-terra uppercase tracking-widest">You can proceed now</p>
          </div>
       ) : (
          <div className="space-y-4">
             <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 text-yellow-200 text-sm mb-4">
                <Icons.User />
                <span>You are booking as a Guest. An account will be created for you to track this mission.</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="First Name" 
                  className="input-base bg-white/5 p-4 rounded-lg border-white/10"
                  onChange={(e) => setGuestInfo({...guestInfo, fullName: e.target.value})}
                />
                <input type="text" placeholder="Last Name" className="input-base bg-white/5 p-4 rounded-lg border-white/10" />
             </div>
             <input 
               type="email" placeholder="Email Protocol" 
               className="input-base bg-white/5 p-4 rounded-lg border-white/10 w-full"
               value={guestInfo.email}
               onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
             />
             <input 
               type="tel" placeholder="Phone (Optional)" 
               className="input-base bg-white/5 p-4 rounded-lg border-white/10 w-full"
               value={guestInfo.phone}
               onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
             />
             <input 
               type="password" placeholder="Create Passkey (Min 6 chars)" 
               className="input-base bg-white/5 p-4 rounded-lg border-white/10 w-full"
               value={guestInfo.password}
               onChange={(e) => setGuestInfo({...guestInfo, password: e.target.value})}
             />
          </div>
       )}
    </div>
  );

  const renderStep5 = () => {
    const nights = getNights();
    
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-lg mx-auto">
         <h2 className="text-3xl font-serif text-ivory text-center mb-1">Mission Summary</h2>
         <p className="text-xs uppercase  text-center tracking-widest mb-8 text-ivory/60">Our manager will contact to you around 4h.</p>
         <div className="bg-ivory text-forest p-8 rounded-sm shadow-2xl relative rotate-1">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/20 backdrop-blur-sm -rotate-1 shadow-sm"></div>
            
            <div className="text-center border-b border-forest/10 pb-6 mb-6">
               <h3 className="font-serif text-2xl font-bold uppercase tracking-widest">ThunderVoyage</h3>
               <p className="text-xs uppercase tracking-widest text-forest/60">Official Reservation</p>
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center">
                  <span className="font-bold">Dates</span>
                  <span>{dates.checkIn} — {dates.checkOut}</span>
               </div>
               <div className="flex justify-between items-center text-sm text-forest/60">
                   <span>Duration</span>
                   <span>{nights} Nights</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="font-bold">Unit</span>
                  <span>{selectedRoom?.title}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="font-bold">Guests</span>
                  <span>{guests}</span>
               </div>
               
               <div className="border-t border-forest/10 pt-4 mt-4 text-sm text-forest/70 space-y-2">
                   <div className="flex justify-between">
                       <span>Room Rate ({nights}x)</span>
                       <span>${(selectedRoom?.price || 0) * nights}</span>
                   </div>
                   {selectedAddOns.map(id => (
                      <div key={id} className="flex justify-between">
                         <span>+ {ADD_ONS.find(a => a.id === id)?.title}</span>
                         <span>${ADD_ONS.find(a => a.id === id)?.price}</span>
                      </div>
                   ))}
               </div>
            </div>

            <div className="border-t-2 border-forest pt-6 flex justify-between items-end">
               <span className="text-xl font-serif font-bold">Total</span>
               <span className="text-3xl font-serif font-bold">${calculateTotal()}</span>
            </div>
         </div>

         <div className="mt-8">
            <textarea 
              placeholder="Special Requests (Dietary protocols, arrival time, etc.)"
              className="w-full bg-[#1a1c1b] border border-white/20 rounded-xl p-4 text-ivory focus:outline-none focus:border-terra h-24 mb-6"
              value={guestInfo.comments}
              onChange={(e) => setGuestInfo({...guestInfo, comments: e.target.value})}
            />
            
            <button 
               onClick={handleSubmit}
               disabled={isLoading}
               className="w-full btn-accent py-5 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(188,93,46,0.4)] disabled:opacity-50"
            >
               {isLoading ? 'Processing...' : 'Confirm & Initialize'}
            </button>
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4">
       
       <div className="fixed inset-0 z-0">
          <Image src="/images/hero/hero4.webp" alt="Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#151816]/95 backdrop-blur-sm" />
       </div>

       <div className="relative z-10 w-full max-w-5xl bg-[#0f1110] border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-175 flex flex-col">
          
          <div className="border-b border-white/10 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
             <Link href="/" className="text-white/40 hover:text-white transition-colors"><Icons.Close /></Link>
             
             <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((s) => (
                   <div key={s} className="flex items-center">
                      <div className={`
                         w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                         ${step === s ? 'bg-terra text-white scale-110' : step > s ? 'bg-white/10 text-terra' : 'bg-transparent border border-white/10 text-white/30'}
                      `}>
                         {step > s ? <Icons.Check /> : s}
                      </div>
                      {s < 5 && <div className={`w-8 h-px mx-2 ${step > s ? 'bg-terra' : 'bg-white/10'}`}></div>}
                   </div>
                ))}
             </div>

             <div className="text-right hidden md:block">
                <div className="text-[10px] uppercase text-terra font-bold">Total</div>
                <div className="text-xl font-serif text-ivory">${calculateTotal()}</div>
             </div>
          </div>

          <div className="flex-1 p-6 md:p-12 overflow-y-auto">
             {step === 1 && renderStep1()}
             {step === 2 && renderStep2()}
             {step === 3 && renderStep3()}
             {step === 4 && renderStep4()}
             {step === 5 && renderStep5()}
          </div>

          <div className="border-t border-white/10 p-6 flex justify-between items-center bg-[#151816]">
             <button 
                onClick={handleBack} 
                disabled={step === 1}
                className="text-xs uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0 transition-colors"
             >
                Back
             </button>

             {step < 5 && (
                <button 
                   onClick={handleNext}
                   className="btn-accent px-10 py-3 text-xs uppercase tracking-widest"
                >
                   Next Step
                </button>
             )}
          </div>

       </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="bg-forest min-h-screen text-ivory flex items-center justify-center">Loading Mission Control...</div>}>
      <BookingContent />
    </Suspense>
  );
}