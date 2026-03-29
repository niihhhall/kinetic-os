import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) console.warn('⚠️ RESEND_API_KEY is missing. Emails will not be sent.');
export const resend = resendApiKey ? new Resend(resendApiKey) : null;
if (resend) console.log('✅ Resend Email Client initialized.');

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initialize Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

// Branded Email Template Wrapper
export const brandedEmailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
</style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #111827;">
<div style="background-color: #f9fafb; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <div style="background-color: #ffffff; padding: 32px 40px; text-align: left; border-bottom: 1px solid #f3f4f6;">
      <h2 style="margin: 0; color: #ff751f; font-size: 24px; font-weight: 700; letter-spacing: -0.025em; line-height: 1;">KineticOS</h2>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px;">
      <h1 style="margin: 0 0 24px 0; color: #111827; font-size: 20px; font-weight: 700; line-height: 1.2;">${title}</h1>
      <div style="line-height: 1.6; color: #4b5563; font-size: 16px;">
        ${content}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="margin: 0; font-size: 13px; color: #9ca3af; font-weight: 500;">
        &copy; ${new Date().getFullYear()} KineticOS. All rights reserved.
      </p>
      <p style="margin: 12px 0 0 0; font-size: 12px; color: #9ca3af;">
        The Complete Freelancer Operating System
      </p>
    </div>
  </div>
</div>
</body>
</html>
`;
