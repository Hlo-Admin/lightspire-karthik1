
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createTransport } from "npm:nodemailer@6.9.8";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  type: 'contact' | 'schedule';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    // Get Gmail credentials from environment
    const gmailEmail = Deno.env.get('GMAIL_EMAIL');
    const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD');

    if (!gmailEmail || !gmailPassword) {
      throw new Error('Gmail credentials not configured');
    }

    let subject = '';
    let htmlContent = '';
    const recipientEmail = 'connect@lightspiremedia.tv';

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
          </div>
        </div>
      `;
    }

    console.log('Creating nodemailer transporter with Gmail SMTP...');

    // Create nodemailer transporter for Gmail
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });

    const mailOptions = {
      from: `"LightSpire Media" <${gmailEmail}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    };

    console.log('Sending email with nodemailer...', {
      to: recipientEmail,
      from: gmailEmail,
      subject: subject
    });

    // Send email using nodemailer
    const result = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', result.messageId);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: result.messageId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log the email content for debugging
    console.log('Failed to send email. Details:', {
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
};

serve(handler);
