import { supabase, isSupabaseConfigured } from '../lib/supabase'

export async function signInWithEmailPassword(email: string, password: string) {
  if (!supabase || !isSupabaseConfigured) throw new Error('Supabase is not configured')
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  if (!supabase || !isSupabaseConfigured) throw new Error('Supabase is not configured')
  return supabase.auth.signOut()
}

export async function getSession() {
  if (!supabase || !isSupabaseConfigured) return { data: { session: null }, error: null }
  return supabase.auth.getSession()
}

export function onAuthChange(callback: Parameters<NonNullable<typeof supabase>['auth']['onAuthStateChange']>[0]) {
  if (!supabase || !isSupabaseConfigured) {
    return { data: { subscription: { unsubscribe() {} } } }
  }

  return supabase.auth.onAuthStateChange(callback)
}
