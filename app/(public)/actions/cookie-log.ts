'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function logCookieConsent(consentData: any) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const headerStore = await headers()
  const ip = headerStore.get('x-forwarded-for') || 'unknown'
  const userAgent = headerStore.get('user-agent') || 'unknown'

  try {
    await supabase.from('cookie_consents').insert({
      user_id: user?.id || null,
      ip_address: ip,
      user_agent: userAgent,
      consent_level: consentData
    })
    return { success: true }
  } catch (error) {
    console.error('Error logging consent:', error)
    return { success: false }
  }
}