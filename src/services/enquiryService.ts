import { supabase, isSupabaseConfigured } from '../lib/supabase'

export type EnquiryInput = {
  name: string
  workEmail: string
  company: string
  phone?: string | null
  focusArea: string
  message: string
}

const SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbyNLIx7199tD85zZ4d_dBNnvS28R_FThK17beM0eKvnlZg0NOm7GXtKbKg2JwUuBYkEZg/exec'
const SHEETS_WEBHOOK_SECRET = 'arclane_global'

export async function submitEnquiry(data: EnquiryInput): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    console.error('[Arclane enquiryService] Supabase is not configured.')
    throw new Error("We couldn't submit your enquiry right now. Please try again.")
  }

  const cleanData = {
    name: data.name.trim(),
    workEmail: data.workEmail.trim(),
    company: data.company.trim(),
    phone: data.phone?.trim() || '',
    focusArea: data.focusArea.trim(),
    message: data.message.trim(),
  }

  // ── 1. Insert directly into public.enquiries (Admin Dashboard source of truth) ──
  const { error: dbError } = await supabase.from('enquiries').insert({
    name: cleanData.name,
    work_email: cleanData.workEmail,
    company: cleanData.company,
    phone: cleanData.phone || null,
    focus_area: cleanData.focusArea,
    message: cleanData.message,
    status: 'new',
  })

  if (dbError) {
    console.error('[Arclane enquiryService] DB insert error:', dbError.message)
    throw new Error("We couldn't submit your enquiry right now. Please try again.")
  }

  // ── 2. Forward to Google Sheets via Apps Script Web App (fire-and-forget) ──
  // Google Apps Script Web Apps don't support arbitrary CORS preflight, so we
  // use mode: 'no-cors'. The POST still reaches the script and appends the row —
  // we just cannot read the response body. This is intentional and correct.
  try {
    // Use application/x-www-form-urlencoded — a true "simple" CORS request.
    // Browsers send this without a preflight even in no-cors mode.
    // Google's infrastructure accepts form-encoded POSTs without Content-Length issues.
    // The JSON payload is passed as the value of the 'data' field.
    const formPayload = new URLSearchParams({
      data: JSON.stringify({
        secret: SHEETS_WEBHOOK_SECRET,
        name: cleanData.name,
        email: cleanData.workEmail,
        company: cleanData.company,
        phone: cleanData.phone,
        service: cleanData.focusArea,
        message: cleanData.message,
      }),
    })

    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formPayload.toString(),
    })
  } catch (sheetsErr) {
    // Non-fatal: DB insert already succeeded. Log but don't block the success state.
    console.warn('[Arclane enquiryService] Google Sheets ping failed (non-fatal):', sheetsErr)
  }
  // DB insert succeeded → caller shows Thank You screen
}

