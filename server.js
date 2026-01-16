import express from 'express';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from "mailersend";

// Initialize MailerSend
const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, customerInfo, summary, notes, pdfBase64 } = req.body;

    if (!process.env.MAILERSEND_API_KEY) {
      throw new Error('Missing MAILERSEND_API_KEY environment variable');
    }

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

    const sentFrom = new Sender(process.env.MAILERSEND_SENDER_EMAIL || "MS_Y18z0L@test-zkq340ek996gd796.mlsender.net", "1 Stop Bath Shop");
    const recipients = [
      new Recipient(to, customerInfo.name || "Valued Customer")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Bathroom Estimate Quote")
      .setHtml(htmlBody)
      .setText("Please find your bathroom estimate quote attached.");

    if (pdfBase64) {
      const attachment = new Attachment(
        pdfBase64,
        "quote.pdf",
        "attachment"
      );
      emailParams.setAttachments([attachment]);
    }

    const data = await mailersend.email.send(emailParams);

    console.log('Email sent:', data);

    res.json({ success: true, messageId: data });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
