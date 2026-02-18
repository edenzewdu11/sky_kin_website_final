import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('=== API Route Called ===');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check SMTP configuration
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    console.log('SMTP Config:', {
      host: smtpConfig.host,
      port: smtpConfig.port,
      user: smtpConfig.auth.user,
    });

    if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport(smtpConfig);

    console.log('Sending email...');
    const info = await transporter.sendMail({
      from: `"SKYKIN Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This email was sent from the SKYKIN Technologies contact form at skykin.tech
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from the SKYKIN Technologies contact form at skykin.tech
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('=== ERROR CAUGHT ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error?.message);
    console.error('Full error:', error);
    
    return NextResponse.json(
      { error: `Failed to send email: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
