import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.112.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EnquiryRequestBody {
  name: string
  workEmail: string
  company: string
  phone?: string | null
  focusArea: string
  message: string
}

serve(async (req: Request) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body: EnquiryRequestBody = await req.json()
    const name = (body.name || '').trim()
    const workEmail = (body.workEmail || '').trim()
    const company = (body.company || '').trim()
    const phone = (body.phone || '').trim() || null
    const focusArea = (body.focusArea || '').trim()
    const message = (body.message || '').trim()

    // 1. Validation
    if (!name || !workEmail || !company || !focusArea || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'All required fields must be provided.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Database Insert (Existing Supabase public.enquiries table)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || ''
    
    let enquiryId: string | null = null
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      const { data: dbData, error: dbError } = await supabase
        .from('enquiries')
        .insert({
          name,
          work_email: workEmail,
          company,
          phone,
          focus_area: focusArea,
          message,
          status: 'new',
        })
        .select('id')
        .single()

      if (dbError) {
        console.error('[submit-enquiry] Database insert error:', dbError)
        return new Response(
          JSON.stringify({ success: false, error: 'Database error while saving enquiry.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      enquiryId = dbData?.id || null
    }

    // 3. Google Sheets Integration (Server-Side Webhook)
    const sheetsWebhookUrl = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL')
    const sheetsWebhookSecret = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_SECRET') || ''

    if (sheetsWebhookUrl && sheetsWebhookUrl.trim() !== '') {
      try {
        const sheetPayload = {
          name,
          email: workEmail,
          company,
          phone: phone || '',
          service: focusArea,
          message,
          secret: sheetsWebhookSecret,
          enquiryId: enquiryId || '',
        }

        const sheetResponse = await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow',
        })

        if (!sheetResponse.ok) {
          const errorText = await sheetResponse.text()
          console.error('[submit-enquiry] Google Apps Script HTTP error:', sheetResponse.status, errorText)
          return new Response(
            JSON.stringify({ success: false, error: 'Google Sheets sync failed.' }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const sheetResult = await sheetResponse.json().catch(() => null)
        if (sheetResult && sheetResult.success === false) {
          console.error('[submit-enquiry] Google Apps Script returned error:', sheetResult.error)
          return new Response(
            JSON.stringify({ success: false, error: sheetResult.error || 'Google Sheets sync failed.' }),
            { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      } catch (sheetErr) {
        console.error('[submit-enquiry] Failed calling Google Apps Script webhook:', sheetErr)
        return new Response(
          JSON.stringify({ success: false, error: 'Unable to reach Google Sheets webhook.' }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enquiry submitted successfully.',
        id: enquiryId,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error'
    console.error('[submit-enquiry] Unexpected handler error:', errorMsg)
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected server error occurred.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
