import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.112.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EnquiryRequestBody {
  name: string
  workEmail?: string
  email?: string
  company: string
  phone?: string | null
  focusArea?: string
  service?: string
  message: string
}

Deno.serve(async (req: Request) => {
  // 1. Handle OPTIONS preflight request immediately with HTTP 200 and CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    const body: EnquiryRequestBody = await req.json()
    const name = (body.name || '').trim()
    const workEmail = (body.workEmail || body.email || '').trim()
    const company = (body.company || '').trim()
    const phone = (body.phone || '').trim() || ''
    const service = (body.focusArea || body.service || '').trim()
    const message = (body.message || '').trim()

    // 2. Validate required fields
    if (!name || !workEmail || !company || !service || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'All required fields must be provided.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 3. Database Insert into existing public.enquiries table
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      const { error: dbError } = await supabase.from('enquiries').insert({
        name,
        work_email: workEmail,
        company,
        phone: phone || null,
        focus_area: service,
        message,
        status: 'new',
      })

      if (dbError) {
        console.error('[submit-enquiry] Database insert error:', dbError.message)
        return new Response(
          JSON.stringify({ success: false, error: "We couldn't submit your enquiry right now. Please try again." }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
    }

    // 4. Google Sheets Integration via Google Apps Script Web App
    const sheetsWebhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL') || ''
    const sheetsWebhookSecret = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_SECRET') || ''

    if (!sheetsWebhookUrl || sheetsWebhookUrl.trim() === '') {
      console.error('[submit-enquiry] Missing GOOGLE_SHEETS_WEBHOOK_URL in environment.')
      return new Response(
        JSON.stringify({ success: false, error: "We couldn't submit your enquiry right now. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const sheetPayload = {
      secret: sheetsWebhookSecret,
      name,
      email: workEmail,
      company,
      phone,
      service,
      message,
    }

    const googleResponse = await fetch(sheetsWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetPayload),
      redirect: 'follow',
    })

    if (!googleResponse.ok) {
      console.error('[submit-enquiry] Google Apps Script HTTP status:', googleResponse.status)
      return new Response(
        JSON.stringify({ success: false, error: "We couldn't submit your enquiry right now. Please try again." }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const sheetResult = await googleResponse.json().catch(() => null)
    if (!sheetResult || sheetResult.success !== true) {
      console.error('[submit-enquiry] Google Apps Script response:', sheetResult)
      return new Response(
        JSON.stringify({ success: false, error: "We couldn't submit your enquiry right now. Please try again." }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 5. Return success response with CORS headers
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enquiry submitted successfully.',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error'
    console.error('[submit-enquiry] Handler exception:', errorMsg)
    return new Response(
      JSON.stringify({ success: false, error: "We couldn't submit your enquiry right now. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
