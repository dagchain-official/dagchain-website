import { NextRequest, NextResponse } from 'next/server'
// SUPABASE BACKUP - Uncomment to re-enable Supabase integration
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
// const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    // Get IP address from request headers
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0]?.trim() || realIp || 'unknown'

    // Get user agent and referrer
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || ''

    // Get landing page from request body
    const body = await request.json()
    const landingPage = body.landingPage || '/'

    console.log('Tracking visitor:', { ipAddress, userAgent, landingPage })

    // Skip tracking for localhost/development IPs
    if (ipAddress === 'unknown' || ipAddress === '127.0.0.1' || ipAddress === '::1') {
      console.log('Skipping development IP:', ipAddress)
      return NextResponse.json({ success: true, message: 'Development IP skipped' })
    }

    // Fetch geolocation data with fallback providers
    let geoData: any = {}
    
    // Try ip-api.com first (free, no key required, 45 req/min)
    try {
      console.log('Fetching geolocation for IP:', ipAddress)
      const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,query`)
      
      if (geoResponse.ok) {
        const data = await geoResponse.json()
        console.log('Geolocation API response:', data)
        
        if (data.status === 'success') {
          geoData = {
            city: data.city,
            region: data.regionName,
            country_name: data.country,
            country_code: data.countryCode,
            continent_code: data.continentCode,
            latitude: data.lat,
            longitude: data.lon,
            timezone: data.timezone,
            org: data.isp || data.org,
          }
          console.log('Parsed geolocation data:', geoData)
        } else {
          console.error('Geolocation API returned error:', data.message)
        }
      } else {
        console.error('Geolocation API HTTP error:', geoResponse.status)
      }
    } catch (error) {
      console.error('Geolocation API error:', error)
      
      // Fallback to ipapi.co
      try {
        console.log('Trying fallback geolocation API...')
        const fallbackResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`)
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          geoData = {
            city: fallbackData.city,
            region: fallbackData.region,
            country_name: fallbackData.country_name,
            country_code: fallbackData.country_code,
            continent_code: fallbackData.continent_code,
            latitude: fallbackData.latitude,
            longitude: fallbackData.longitude,
            timezone: fallbackData.timezone,
            org: fallbackData.org,
          }
          console.log('Fallback geolocation data:', geoData)
        }
      } catch (fallbackError) {
        console.error('Fallback geolocation API also failed:', fallbackError)
      }
    }

    // SUPABASE BACKUP - Uncomment to re-enable Supabase integration
    // const { data: existingVisitor } = await supabase
    //   .from('visitor_tracking')
    //   .select('*')
    //   .eq('ip_address', ipAddress)
    //   .single()

    // if (existingVisitor) {
    //   console.log('Updating existing visitor:', ipAddress)
    //   const { error: updateError } = await supabase
    //     .from('visitor_tracking')
    //     .update({
    //       visit_count: existingVisitor.visit_count + 1,
    //       last_visit_at: new Date().toISOString(),
    //       user_agent: userAgent || existingVisitor.user_agent,
    //       referrer: referrer || existingVisitor.referrer,
    //     })
    //     .eq('ip_address', ipAddress)

    //   if (updateError) {
    //     console.error('Supabase update error:', updateError)
    //     return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
    //   }
    // } else {
    //   console.log('Inserting new visitor:', ipAddress)
    //   const { error: insertError } = await supabase
    //     .from('visitor_tracking')
    //     .insert({
    //       ip_address: ipAddress,
    //       city: geoData.city || null,
    //       state: geoData.region || null,
    //       country: geoData.country_name || null,
    //       continent: geoData.continent_code || null,
    //       country_code: geoData.country_code || null,
    //       latitude: geoData.latitude || null,
    //       longitude: geoData.longitude || null,
    //       timezone: geoData.timezone || null,
    //       isp: geoData.org || null,
    //       user_agent: userAgent,
    //       referrer: referrer,
    //       landing_page: landingPage,
    //       visit_count: 1,
    //       first_visit_at: new Date().toISOString(),
    //       last_visit_at: new Date().toISOString(),
    //     })

    //   if (insertError) {
    //     console.error('Supabase insert error:', insertError)
    //     return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    //   }
    // }

    // TODO: Replace with your own database implementation
    console.log('Visitor tracking data:', {
      ip_address: ipAddress,
      city: geoData.city || null,
      state: geoData.region || null,
      country: geoData.country_name || null,
      continent: geoData.continent_code || null,
      country_code: geoData.country_code || null,
      latitude: geoData.latitude || null,
      longitude: geoData.longitude || null,
      timezone: geoData.timezone || null,
      isp: geoData.org || null,
      user_agent: userAgent,
      referrer: referrer,
      landing_page: landingPage,
      timestamp: new Date().toISOString(),
    })

    console.log('Visitor tracked successfully:', ipAddress)

    return NextResponse.json({ 
      success: true, 
      message: 'Visitor tracked successfully',
      ip: ipAddress,
      location: {
        city: geoData.city,
        state: geoData.region,
        country: geoData.country_name,
        continent: geoData.continent_code
      }
    })
  } catch (error: any) {
    console.error('Visitor tracking error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
