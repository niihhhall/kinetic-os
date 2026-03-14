
import { supabase, resend, brandedEmailTemplate } from './_lib/clients.js';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, fullName, tier, referredBy } = req.body;

  if (!email || !tier || !fullName) {
    return res.status(400).json({ error: 'Name, email and tier are required' });
  }

  // Map tier name to table name
  const tableMap = {
    'Starter': 'solo_freelancer_waitlist',
    'Pro System': 'power_freelancer_waitlist',
    'VIP Scaling': 'agency_vip_waitlist'
  };

  const tableName = tableMap[tier];
  if (!tableName) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  try {
    // Check if already exists
    const { data: existing } = await supabase
      .from(tableName)
      .select('position, referral_code')
      .eq('email', email)
      .single();

    if (existing) {
      return res.status(200).json({ 
        success: true, 
        alreadyJoined: true,
        position: existing.position,
        referralCode: existing.referral_code
      });
    }

    // Generate unique referral code
    const referralCode = nanoid(8);

    // Insert into Supabase
    const { data, error } = await supabase
      .from(tableName)
      .insert([
        { 
          email, 
          full_name: fullName,
          referral_code: referralCode, 
          referred_by: referredBy || null 
        }
      ])
      .select('position')
      .single();

    if (error) {
       console.error('Supabase error:', error);
       return res.status(500).json({ error: 'Database error. Please try again.' });
    }

    const position = data.position;

    // Send "Founder-voice" Email via Resend
    if (resend) {
      const linkedin = "https://www.linkedin.com/in/nikhil-mishra047/";
      const twitter = "https://x.com/unik_47";
      
      const emailContent = `
        <p>Hey there,</p>
        <p>I'm Nikhil, and I'm personally thrilled to welcome you to the KineticOS waitlist.</p>
        <p>You're currently at <strong>position #${position}</strong> for the ${tier} tier. We're rolling out access in small, controlled batches to ensure every operator gets the high-velocity experience They deserve.</p>
        <p><strong>What KineticOS will help you do:</strong></p>
        <ul>
          <li>Scale your operations without the manual chaos.</li>
          <li>Measure exactly what matters so you can improve it.</li>
          <li>Recover hours of deep work every single week.</li>
        </ul>
        <p><strong>What happens next?</strong></p>
        <p>You'll receive a personal invite from me as soon as your spot opens up. In the meantime, I'd love to connect and share behind-the-scenes updates on how we're building the future of operations.</p>
        <p>
          <a href="${twitter}" style="color: #ff751f; font-weight: bold; text-decoration: none;">Follow on Twitter</a> &bull; 
          <a href="${linkedin}" style="color: #ff751f; font-weight: bold; text-decoration: none;">Connect on LinkedIn</a>
        </p>
        <p>Best,<br>Nikhil Mishra<br>Founder, KineticOS</p>
        <div style="margin-top: 20px; padding: 15px; background: #fff7ed; border-radius: 12px; border: 1px solid #ffedd5;">
          <p style="margin: 0; font-size: 14px; color: #9a3412;"><strong>Want to skip the line?</strong> Share your unique link with 2 friends: <br>
          <span style="font-family: monospace; font-size: 12px;">${process.env.NEXT_PUBLIC_SITE_URL || 'https://kineticos.store'}?ref=${referralCode}</span></p>
        </div>
      `;

      await resend.emails.send({
        from: 'Nikhil (KineticOS) <hello@kineticos.store>',
        to: email,
        subject: `You're on the list! (Waitlist Position: #${position})`,
        html: brandedEmailTemplate(`Welcome to KineticOS`, emailContent),
      });
    }

    return res.status(200).json({ 
      success: true, 
      position, 
      referralCode 
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
