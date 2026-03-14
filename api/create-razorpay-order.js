import { razorpay } from './_lib/clients.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { amount, currency = 'USD', receipt } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Razorpay expects amount in the smallest currency unit (e.g., cents for USD, paise for INR)
        // For USD, $97 -> 9700 cents
        const options = {
            amount: Math.round(amount * 100),
            currency: currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error('Razorpay Error:', err);
        return res.status(500).json({ error: err.message });
    }
}
