import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Contact form is not configured yet.' }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const name: string = body.name?.trim() ?? '';
    const email: string = body.email?.trim() ?? '';
    const message: string = body.message?.trim() ?? '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message must be under 2000 characters.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'portfolio@resend.dev',
      to: 'onehouse0460@outlook.com',
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
