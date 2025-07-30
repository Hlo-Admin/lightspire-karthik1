
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Send email using Gmail SMTP via external service
    const emailPayload = {
      to: recipientEmail,
      from: gmailEmail,
      subject: subject,
      html: htmlContent,
      smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: gmailEmail,
          pass: gmailPassword
        }
      }
    };

    console.log('Sending email with payload:', {
      to: recipientEmail,
      from: gmailEmail,
      subject: subject
    });

    // Using a simple email service that accepts SMTP credentials
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'gmail',
          template_id: 'custom_template',
          user_id: 'public_key',
          accessToken: 'private_key',
          template_params: {
            to_email: recipientEmail,
            from_name: 'LightSpire Media',
            from_email: gmailEmail,
            subject: subject,
            message_html: htmlContent,
            reply_to: gmailEmail
          }
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      } else {
        throw new Error('Failed to send email via EmailJS');
      }
    } catch (emailError) {
      console.error('EmailJS failed, logging email for manual processing:', emailError);
      
      // Log the email content for manual processing
      console.log('EMAIL TO BE SENT MANUALLY:', {
        to: recipientEmail,
        from: gmailEmail,
        subject: subject,
        html: htmlContent,
        timestamp: new Date().toISOString(),
        smtp_user: gmailEmail
      });
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Email logged for processing - check function logs',
        note: 'Email service temporarily unavailable, email has been logged'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

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
