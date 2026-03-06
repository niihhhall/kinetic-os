import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 4242;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

// Initialize Resend (conditionally if key exists to prevent crash on startup)
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (!resend) {
  console.warn('⚠️ RESEND_API_KEY is not set. Email notifications will be disabled.');
}

// Middleware
app.use(cors());

// Webhook endpoint needs raw body
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    console.log('✅ Payment successful for session:', session.id);
    console.log('📧 Sending email to:', session.customer_details?.email);

    // Integrate email service (Resend) here to send the Notion template link
    try {
      if (session.customer_details?.email) {
        if (resend) {
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: session.customer_details.email,
            subject: 'Your KineticOS Notion Template',
            html: `<p>Thank you for your purchase! Welcome to KineticOS.</p>
                   <p>Here is your <a href="https://notion.so/">Notion template link</a>. Please duplicate it to your workspace.</p>`
          });
          console.log('✅ Email sent successfully via Resend');
        } else {
          console.log('⚠️ Email skipped because RESEND_API_KEY is not configured.');
        }
      }
    } catch (emailErr) {
      console.error('❌ Email sending failed:', emailErr);
    }
  }

  res.send();
});

// JSON parser for other routes
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/#pricing`,
      automatic_tax: { enabled: true },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});