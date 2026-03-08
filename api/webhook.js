import { stripe, resend } from './_lib/clients.js';

// Vercel handles raw body for us if we disable the body parser (common pattern)
// But for Node functions, we usually get the buffer.
export const config = {
    api: {
        bodyParser: false,
    },
};

async function getRawBody(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    const rawBody = await getRawBody(req);

    try {
        if (endpointSecret) {
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        } else {
            event = JSON.parse(rawBody.toString());
        }
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        console.log('✅ Payment successful for session:', session.id);

        try {
            if (session.customer_details?.email && resend) {
                await resend.emails.send({
                    from: 'hi@kineticos.store',
                    to: session.customer_details.email,
                    subject: 'Your KineticOS Notion Template',
                    html: `<p>Thank you for your purchase! Welcome to KineticOS.</p>
                 <p>Here is your <a href="https://notion.so/">Notion template link</a>. Please duplicate it to your workspace.</p>`
                });
                console.log('✅ Email sent successfully via Resend');
            }
        } catch (emailErr) {
            console.error('❌ Email sending failed:', emailErr);
        }
    }

    return res.status(200).json({ received: true });
}
