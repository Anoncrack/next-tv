'use server'

import { createClient } from '@/utils/supabase/server'

type AuthResult = { error?: string, success?: boolean }

export async function login(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signup(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const nickname = formData.get('nickname') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const data = {
    email,
    password,
    options: {
        data: {
            full_name: fullName || 'Traveler',
            nickname: nickname || '',
        }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}