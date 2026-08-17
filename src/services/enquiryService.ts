import { supabase } from '../lib/supabase'

export type EnquiryInput = {
  name: string
  workEmail: string
  company: string
  phone: string
  focusArea: string
  message: string
}

export async function submitEnquiry(data: EnquiryInput) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  const { error } = await supabase.from('enquiries').insert({
    name: data.name,
    work_email: data.workEmail,
    company: data.company,
    phone: data.phone || null,
    focus_area: data.focusArea,
    message: data.message,
  })

  if (error) {
    throw new Error('Unable to submit enquiry')
  }
}
