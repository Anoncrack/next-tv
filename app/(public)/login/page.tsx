'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { login, signup } from './actions';
import { useRouter } from 'next/navigation';

const Icons = {
  ArrowLeft: () => (
    <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
    </svg>
  ),
  Alert: () => (
    <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y2="16"/>
    </svg>
  ),
  Loader: () => (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ),
  Eye: () => (
    <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const router = useRouter(); 

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMsg(null);

    if (!email.includes('@') || !email.includes('.')) {
        setErrorMsg("Please enter a valid email protocol.");
        setIsLoading(false);
        return;
    }
    if (password.length < 6) {
        setErrorMsg("Security Protocol: Passkey must be at least 6 characters.");
        setIsLoading(false);
        return;
    }

    try {
        const action = isLoginMode ? login : signup;
        const result = await action(formData);

        if (result?.error) {
          setErrorMsg(result.error);
          setIsLoading(false);
        } else if (result?.success) {
          router.refresh(); 
          router.push('/account');
        }
    } catch (e) {
        console.error(e);
        setErrorMsg("Connection Error. Try again.");
        setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMsg(null);
    setPassword("");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0f1110]">
      
      <div className="relative hidden lg:block h-full w-full overflow-hidden bg-black">
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoginMode ? 'opacity-60' : 'opacity-0'}`}>
            <Image 
              src="/images/hero/hero4.webp" 
              alt="Solitude" 
              fill 
              className="object-cover grayscale"
              priority
            />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${!isLoginMode ? 'opacity-60' : 'opacity-0'}`}>
            <Image 
              src="/images/hero/hero1.webp" 
              alt="Expedition" 
              fill 
              className="object-cover grayscale"
              priority
            />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0f1110]/20 to-[#0f1110]" />
        
        <div className="absolute bottom-12 left-12 max-w-md z-10">
           <blockquote className="font-serif text-3xl text-ivory italic leading-tight mb-4 transition-all duration-500">
             {isLoginMode ? '"Solitude is the new luxury."' : '"The journey begins with a single decision."'}
           </blockquote>
           <p className="text-white/50 text-xs uppercase tracking-widest">
             ThunderVoyage &copy; 2025
           </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8 md:p-16 relative">
       
        <div className="w-full max-w-md relative z-10">
          
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-terra transition-colors mb-12 text-xs font-bold uppercase tracking-widest">
            <Icons.ArrowLeft /> Return to Base
          </Link>

          <div className="mb-8">
             <div className="relative w-40 h-10 mb-6 opacity-80">
                <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" />
             </div>
             <h1 className="text-4xl font-serif text-ivory mb-2 transition-all duration-300">
                {isLoginMode ? 'Identify Yourself' : 'Initialize Profile'}
             </h1>
             <p className="text-ivory/50 text-sm">
                {isLoginMode ? 'Access your itinerary and bio-preferences.' : 'Join the Inner Circle. Application requires verification.'}
             </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="text-red-400 mt-0.5"><Icons.Alert /></div>
                <div>
                    <span className="text-red-400 text-xs font-bold uppercase tracking-widest block mb-1">Access Denied</span>
                    <p className="text-red-200/80 text-sm leading-snug">{errorMsg}</p>
                </div>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            
            <div className={`space-y-5 overflow-hidden transition-all duration-500 ease-in-out ${isLoginMode ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'}`}>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-terra font-bold">Full Designation</label>
                    <input
                        name="full_name"
                        type="text"
                        placeholder="John Doe"
                        disabled={isLoginMode}
                        className="input-base"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-terra font-bold">Callsign / Nickname</label>
                    <input
                        name="nickname"
                        type="text"
                        placeholder="Maverick"
                        disabled={isLoginMode}
                        className="input-base"
                    />
                </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-terra font-bold">Email Protocol</label>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input-base focus:bg-white/5 rounded-t-sm"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                  <label className="text-[10px] uppercase tracking-widest text-terra font-bold">Passkey</label>
                  {!isLoginMode && (
                      <span className={`text-[9px] uppercase tracking-widest ${password.length >= 6 ? 'text-green-500' : 'text-white/30'}`}>
                          Min 6 Chars
                      </span>
                  )}
              </div>
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base focus:bg-white/5 rounded-t-sm"
              />
            </div>
            
            <div className="pt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full btn-accent py-4 text-xs uppercase tracking-widest shadow-lg shadow-terra/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Icons.Loader /> : (isLoginMode ? 'Connect' : 'Submit Application')}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <p className="text-white/40 text-sm mb-4">
               {isLoginMode ? "First time at Base Camp?" : "Already have clearance?"}
             </p>
             <button 
               onClick={toggleMode}
               className="text-xs font-bold uppercase tracking-widest text-ivory hover:text-terra transition-colors border-b border-white/20 pb-1 hover:border-terra"
             >
                {isLoginMode ? "Initialize New Profile" : "Access Existing Account"}
             </button>
          </div>

          <div className="mt-8 text-center">
             <p className="text-[10px] text-white/20">
               By connecting, you agree to our <Link href="/terms" className="underline hover:text-terra">Guest Protocol</Link>.
             </p>
          </div>

        </div>
      </div>

    </div>
  );
}