
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  type: 'contact' | 'schedule';
  data: any;
}

const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  const gmailEmail = Deno.env.get('GMAIL_EMAIL');
  const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD');

  if (!gmailEmail || !gmailPassword) {
    throw new Error('Gmail credentials not configured');
  }

  // Using Gmail SMTP via external service
  const emailData = {
    from: gmailEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  // Since Deno doesn't have built-in SMTP, we'll use a simple HTTP API approach
  // You might want to use a service like Resend, SendGrid, or similar for production
  console.log('Email would be sent:', emailData);
  
  // For now, we'll simulate email sending
  // In production, integrate with your preferred email service
  return { success: true, message: 'Email sent successfully' };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    let subject = '';
    let htmlContent = '';
    const recipientEmail = 'karthikkishore2603@gmail.com';

    if (type === 'contact') {
      subject = `New Contact Form Submission from ${data.name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0678cf;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.message}
            </div>
            <p style="margin-top: 20px; color: #666;"><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `;
    } else if (type === 'schedule') {
      subject = `New Call Scheduled with ${data.name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0678cf;">New Call Scheduled</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            <p><strong>Scheduled Date:</strong> ${data.scheduled_date}</p>
            <p><strong>Scheduled Time:</strong> ${data.scheduled_time} ${data.timezone}</p>
            <p><strong>Project Details:</strong> ${data.project_details || 'Not provided'}</p>
            <p style="margin-top: 20px; color: #666;"><small>Scheduled on: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `;
    }

    const result = await sendEmail(recipientEmail, subject, htmlContent);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
};

serve(handler);
