import { resend, supabase, brandedEmailTemplate } from './_lib/clients.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        console.log('📩 New support request from:', name, `<${email}>`);

        // Store in Supabase if configured
        if (supabase) {
            const { error: dbError } = await supabase
                .from('support_requests')
                .insert([{ name, email, message }]);

            if (dbError) {
                console.error('❌ Supabase Record Failed:', dbError.message);
            }
        }

        if (resend) {
            // Send notification to site owner
            const ownerHtml = brandedEmailTemplate(
                'New Support Request',
                `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin-top: 20px;">
                  <p style="margin: 0; color: #374151;"><strong>Message:</strong></p>
                  <p style="margin: 10px 0 0 0;">${message}</p>
                </div>
                `
            );

            await resend.emails.send({
                from: 'KineticOS <noreply@kineticos.store>',
                to: 'link.nikhilmishra@gmail.com',
                subject: `[Support] New Message from ${name}`,
                html: ownerHtml
            });

            // Send confirmation to user
            const userHtml = brandedEmailTemplate(
                'Message Received',
                `
                <p>Hi ${name},</p>
                <p>Thank you for reaching out to us. We've received your message and our team will get back to you within 24 hours.</p>
                <p>Best regards,<br>The Support Team</p>
                `
            );

            await resend.emails.send({
                from: 'KineticOS Support <noreply@kineticos.store>',
                to: email,
                subject: 'We received your message - KineticOS',
                html: userHtml
            });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Support API Error:', err);
        return res.status(500).json({ error: 'Failed to send support request' });
    }
}
