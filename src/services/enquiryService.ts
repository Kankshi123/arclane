import { supabase, isSupabaseConfigured } from '../lib/supabase'

export type EnquiryInput = {
  name: string
  workEmail: string
  company: string
  phone?: string | null
  focusArea: string
  message: string
}

export async function submitEnquiry(data: EnquiryInput) {
  if (!isSupabaseConfigured || !supabase) {
    const configError = new Error('Supabase is not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.')
    console.error('[Arclane enquiryService]', configError.message)
    throw configError
  }

  const payload = {
    name: data.name.trim(),
    work_email: data.workEmail.trim(),
    company: data.company.trim(),
    phone: data.phone?.trim() || null,
    focus_area: data.focusArea.trim(),
    message: data.message.trim(),
  }

  const { error, status, statusText } = await supabase.from('enquiries').insert(payload)

  if (error) {
    console.error('[Arclane enquiryService] Supabase insert failed:', {
      status,
      statusText,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    })
    throw new Error(error.message || 'Failed to submit enquiry to database.')
  }
}
