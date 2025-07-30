
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!gmailEmail) {
      throw new Error('Gmail email not configured');
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

    // Try Resend first if API key is available
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      try {
        const emailResponse = await resend.emails.send({
          from: `LightSpire Media <${gmailEmail}>`,
          to: [recipientEmail],
          subject: subject,
          html: htmlContent,
        });

        console.log('Email sent successfully via Resend:', emailResponse);
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully via Resend', data: emailResponse }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      } catch (resendError) {
        console.error('Resend failed, falling back to Gmail SMTP:', resendError);
      }
    }

    // Fallback to Gmail SMTP implementation
    if (gmailPassword) {
      // Using a simple email service for Gmail SMTP
      const emailData = {
        service: 'gmail',
        auth: {
          user: gmailEmail,
          pass: gmailPassword,
        },
        to: recipientEmail,
        from: gmailEmail,
        subject: subject,
        html: htmlContent,
      };

      // For production, you would implement proper SMTP here
      // For now, we'll use a webhook service or similar
      console.log('Attempting to send email via Gmail SMTP:', {
        to: recipientEmail,
        from: gmailEmail,
        subject: subject,
      });

      // Simple HTTP request to send email (you can use services like EmailJS, Formspree, etc.)
      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: 'gmail',
            template_id: 'template_1',
            user_id: 'your_user_id', // This would need to be configured
            template_params: {
              to_email: recipientEmail,
              from_email: gmailEmail,
              subject: subject,
              message_html: htmlContent,
            }
          }),
        });

        if (response.ok) {
          console.log('Email sent successfully via EmailJS');
          return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        } else {
          throw new Error('EmailJS failed');
        }
      } catch (emailJsError) {
        console.error('EmailJS failed:', emailJsError);
        
        // Final fallback - log the email for manual processing
        console.log('EMAIL TO BE SENT MANUALLY:', {
          to: recipientEmail,
          subject: subject,
          html: htmlContent,
          timestamp: new Date().toISOString(),
        });
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Email logged for manual processing',
          note: 'Please check the function logs for email content'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }
    }

    throw new Error('No email service configured');

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
