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

  const cleanData = {
    name: data.name.trim(),
    workEmail: data.workEmail.trim(),
    company: data.company.trim(),
    phone: data.phone?.trim() || null,
    focusArea: data.focusArea.trim(),
    message: data.message.trim(),
  }

  // 1. Preferred Flow: Existing Backend Edge Function (handles DB insert + Google Sheets server-side)
  try {
    const { data: funcData, error: funcError } = await supabase.functions.invoke('submit-enquiry', {
      body: cleanData,
    })

    if (!funcError && funcData) {
      if (funcData.success === false) {
        throw new Error(funcData.error || 'Failed to process enquiry.')
      }
      return funcData
    }

    // If function returned an application error, rethrow
    if (funcError && funcError.context?.status && funcError.context.status >= 400 && funcError.context.status !== 404) {
      throw new Error(funcError.message || 'Submission failed on server.')
    }
  } catch (fnErr: unknown) {
    // If the error was an intentional server validation / sync error, bubble it up
    if (fnErr instanceof Error && fnErr.message !== 'Failed to send a request to the Edge Function' && !fnErr.message.includes('FunctionsFetchError') && !fnErr.message.includes('404')) {
      throw fnErr
    }
    // Otherwise, fall back to direct DB insert
  }

  // 2. Direct Database Fallback (when Edge Function is not yet deployed)
  const dbPayload = {
    name: cleanData.name,
    work_email: cleanData.workEmail,
    company: cleanData.company,
    phone: cleanData.phone,
    focus_area: cleanData.focusArea,
    message: cleanData.message,
  }

  const { error, status, statusText } = await supabase.from('enquiries').insert(dbPayload)

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
