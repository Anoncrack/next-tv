'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string
  const dob = formData.get('dob') as string

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone, dob }
    })
    
    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath('/account')
  return { success: true }
}