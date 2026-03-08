import { resend, supabase } from './_lib/clients.js';

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
            await resend.emails.send({
                from: 'hi@kineticos.store',
                to: 'hi@kineticos.store',
                subject: `[Support] New Message from ${name}`,
                html: `
          <h3>New Support Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
            });

            // Send confirmation to user
            await resend.emails.send({
                from: 'hi@kineticos.store',
                to: email,
                subject: 'We received your message - KineticOS Support',
                html: `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to KineticOS support. We've received your message and our team will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <blockquote>${message}</blockquote>
          <p>Best regards,<br>The KineticOS Team</p>
        `
            });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Support API Error:', err);
        return res.status(500).json({ error: 'Failed to send support request' });
    }
}
