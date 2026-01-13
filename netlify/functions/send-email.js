import nodemailer from 'nodemailer';

export const handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { to, customerInfo, summary, notes, pdfBase64 } = JSON.parse(event.body);

        // Check for Gmail credentials
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD');
        }

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const htmlBody = `
      <div style="font-family: system-ui, -apple-system, sans-serif; color: #111827; line-height: 1.6; max-width: 600px;">
        <h1 style="margin-bottom: 24px; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Bathroom Estimate Quote</h1>
        
        <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827; font-size: 18px;">Customer Information</h3>
        <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #eef2f7;">
          <div style="margin: 6px 0;"><strong>Name:</strong> ${customerInfo.name || 'N/A'}</div>
          <div style="margin: 6px 0;"><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</div>
          <div style="margin: 6px 0;"><strong>Email:</strong> ${customerInfo.email || 'N/A'}</div>
          <div style="margin: 6px 0;"><strong>Address:</strong> ${(customerInfo.address || 'N/A').replace(/\n/g, '<br>')}</div>
        </div>

        <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827; font-size: 18px;">Estimate Summary</h3>
        <div style="white-space: pre-wrap; background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #eef2f7; font-family: monospace; font-size: 14px;">${summary}</div>

        ${notes ? `
          <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827; font-size: 18px;">Additional Notes</h3>
          <div style="white-space: pre-wrap; background: #fffcf0; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #fef3c7;">${notes.replace(/\n/g, '<br>')}</div>
        ` : ''}

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
        
        <div style="text-align: center;">
          <p style="color: #6b7280; font-size: 14px;">
            Thank you for your interest in our services!<br>
            <strong style="color: #1f2937; font-size: 16px;">1 Stop Bath Shop</strong>
          </p>
        </div>
      </div>
    `;

        // Send email with PDF attachment
        const info = await transporter.sendMail({
            from: `"1 Stop Bath Shop" <${process.env.GMAIL_USER}>`,
            to: to || process.env.GMAIL_USER, // fallback to self
            subject: 'Bathroom Estimate Quote',
            html: htmlBody,
            attachments: [
                {
                    filename: 'quote.pdf',
                    // Robustly handle data URI by taking the last part after "base64,"
                    content: Buffer.from(pdfBase64.split('base64,').pop(), 'base64'),
                },
            ],
        });

        console.log('Email sent: %s', info.messageId);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ success: true, messageId: info.messageId })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message || 'Failed to send email' })
        };
    }
};
