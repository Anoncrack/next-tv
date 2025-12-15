'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { logCookieConsent } from '@/app/(public)/actions/cookie-log' 

type ConsentSettings = {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [settings, setSettings] = useState<ConsentSettings>({
    essential: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const savedConsent = localStorage.getItem('tv_cookie_consent')
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const fullConsent = { essential: true, analytics: true, marketing: true }
    saveConsent(fullConsent)
  }

  const handleSavePreferences = () => {
    saveConsent(settings)
  }

  const handleReject = () => {
    const minConsent = { essential: true, analytics: false, marketing: false }
    saveConsent(minConsent)
  }

  const saveConsent = async (finalSettings: ConsentSettings) => {
    localStorage.setItem('tv_cookie_consent', JSON.stringify(finalSettings))
    setIsVisible(false)

    await logCookieConsent(finalSettings)

    if (finalSettings.analytics) {
      console.log('Initializing Analytics...')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 flex justify-center items-end pointer-events-none">
      <div className="w-full max-w-4xl bg-[#0f1110]/95 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 rounded-sm pointer-events-auto transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in">
        
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-ivory font-serif text-lg">Communication Protocol</h3>
              <p className="text-white/60 text-xs leading-relaxed max-w-2xl">
                We use tracking technologies to enhance your expedition experience, analyze base camp traffic, and personalize mission briefings. 
                According to the <Link href="/privacy" className="text-terra hover:underline">Privacy Charter</Link>, you have the right to define your privacy parameters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowDetails(true)}
                className="px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-sm"
              >
                Customize
              </button>
              <button 
                onClick={handleReject}
                className="px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-ivory bg-white/5 hover:bg-white/10 transition-colors rounded-sm"
              >
                Essential Only
              </button>
              <button 
                onClick={handleAcceptAll}
                className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-[#0f1110] bg-terra hover:bg-terra/90 transition-colors rounded-sm shadow-[0_0_15px_rgba(199,81,64,0.3)]"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-ivory font-serif text-xl mb-2">Privacy Parameters</h3>
              <p className="text-white/40 text-xs">Customize which data modules you wish to activate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-terra/30 bg-terra/5 rounded-sm opacity-70 cursor-not-allowed">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-terra text-xs font-bold uppercase tracking-widest">Core Systems</span>
                  <div className="w-2 h-2 rounded-full bg-terra shadow-[0_0_5px_rgba(199,81,64,0.8)]"></div>
                </div>
                <p className="text-white/30 text-[10px]">Required for authentication and security. Cannot be disabled.</p>
              </div>

              <label className={`p-4 border rounded-sm cursor-pointer transition-all ${settings.analytics ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ivory text-xs font-bold uppercase tracking-widest">Telemetry</span>
                  <input 
                    type="checkbox" 
                    checked={settings.analytics}
                    onChange={(e) => setSettings({...settings, analytics: e.target.checked})}
                    className="accent-terra w-4 h-4"
                  />
                </div>
                <p className="text-white/40 text-[10px]">Helps us analyze map usage and improve navigation flows.</p>
              </label>

              <label className={`p-4 border rounded-sm cursor-pointer transition-all ${settings.marketing ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-ivory text-xs font-bold uppercase tracking-widest">Communications</span>
                  <input 
                    type="checkbox" 
                    checked={settings.marketing}
                    onChange={(e) => setSettings({...settings, marketing: e.target.checked})}
                    className="accent-terra w-4 h-4"
                  />
                </div>
                <p className="text-white/40 text-[10px]">Allows personalized mission offers and external signal tracking.</p>
              </label>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button 
                onClick={() => setShowDetails(false)}
                className="text-white/40 hover:text-white text-xs uppercase tracking-widest mr-auto"
              >
                Back
              </button>
              <button 
                onClick={handleReject}
                className="px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-ivory bg-white/5 hover:bg-white/10 transition-colors rounded-sm"
              >
                Reject All
              </button>
              <button 
                onClick={handleSavePreferences}
                className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-[#0f1110] bg-white hover:bg-white/90 transition-colors rounded-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}