import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, location, message, marketingConsent } = body

    // Validation
    if (!name || !email || !phone || !location || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email to Zhivam team
    await resend.emails.send({
      from: 'Zhivam Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: #0d1520; padding: 30px; border-radius: 12px; color: white;">
            <h2 style="color: #22d3ee; margin-top: 0;">New Contact Form Submission</h2>
            <hr style="border-color: #334155; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; width: 120px;">Name</td>
                <td style="padding: 10px 0; color: white; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8;">Email</td>
                <td style="padding: 10px 0; color: #22d3ee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8;">Phone</td>
                <td style="padding: 10px 0; color: white;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8;">Company</td>
                <td style="padding: 10px 0; color: white;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8;">Location</td>
                <td style="padding: 10px 0; color: white;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; width: 120px;">Marketing</td>
                <td style="padding: 10px 0; color: ${marketingConsent ? '#22d3ee' : '#64748b'};">
                  ${marketingConsent ? '✓ Opted in for updates' : '✗ No marketing emails'}
                </td>
              </tr>
            </table>
            <hr style="border-color: #334155; margin: 20px 0;" />
            <p style="color: #94a3b8; margin-bottom: 8px;">Message</p>
            <p style="color: white; line-height: 1.6; background: #1e293b; padding: 16px; border-radius: 8px; border-left: 3px solid #22d3ee;">
              ${message.replace(/\n/g, '<br/>')}
            </p>
          </div>
        </div>
      `
    })

    // Send confirmation email to the person who submitted
    await resend.emails.send({
      from: 'Zhivam <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message — Zhivam',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: #0d1520; padding: 30px; border-radius: 12px; color: white;">
            <h2 style="color: #22d3ee; margin-top: 0;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #94a3b8; line-height: 1.6;">
              We've received your message and will get back to you within 24 hours.
            </p>
            ${marketingConsent ? `
            <div style="background: #0f2d1f; border: 1px solid #166534; border-radius: 8px; padding: 12px 16px; margin: 16px 0;">
              <p style="color: #4ade80; margin: 0; font-size: 13px;">
                ✓ You're subscribed to blog updates and research insights from Zhivam.
              </p>
            </div>
            ` : ''}
            <hr style="border-color: #334155; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 13px;">
              This is an automated confirmation. Please do not reply to this email.<br/>
              For urgent queries, contact us at <span style="color: #22d3ee;">info@zhivam.com</span> or call <span style="color: #22d3ee;">+91 833 385 0202</span>
            </p>
          </div>
        </div>
      `
    })

    // Add to Resend Audience if opted in
    if (marketingConsent && process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        })
      } catch (audienceError) {
        // Don't fail the whole request if audience add fails
        console.error('Failed to add to audience:', audienceError)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}