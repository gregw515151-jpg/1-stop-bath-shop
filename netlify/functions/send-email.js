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
        <h2 style="margin-bottom: 16px; color: #1f2937;">Bathroom Estimate Quote</h2>
        
        <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827;">Customer Information</h3>
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <div style="margin: 4px 0;"><strong>Name:</strong> ${customerInfo.name || 'N/A'}</div>
          <div style="margin: 4px 0;"><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</div>
          <div style="margin: 4px 0;"><strong>Email:</strong> ${customerInfo.email || 'N/A'}</div>
          <div style="margin: 4px 0;"><strong>Address:</strong> ${(customerInfo.address || 'N/A').replace(/\n/g, '<br>')}</div>
        </div>

        <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827;">Estimate Summary</h3>
        <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">${summary}</div>

        ${notes ? `
          <h3 style="margin-top: 24px; margin-bottom: 12px; color: #111827;">Notes</h3>
          <div style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">${notes.replace(/\n/g, '<br>')}</div>
        ` : ''}

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">
          Thank you for your interest in our bathroom products and services!<br>
          <strong>1 Stop Bath Shop</strong>
        </p>
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
