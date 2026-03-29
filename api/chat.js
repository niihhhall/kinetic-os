import { Groq } from 'groq-sdk';
import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.GROQ_API_KEY || !process.env.HUGGING_FACE_TOKEN) {
        console.error('❌ Missing API Keys in environment');
        return res.status(500).json({ error: 'Chat API missing internal configuration' });
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        
        const { messages } = req.body;
        const userMessage = messages[messages.length - 1].content;

        // 1. Generate embedding for the user message
        const hfResponse = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: userMessage,
        });

        // Robust embedding extraction
        const embedding = Array.isArray(hfResponse) ? hfResponse : (hfResponse && hfResponse.data ? hfResponse.data : null);

        if (!embedding) {
            throw new Error('Failed to generate embedding');
        }

        // 2. Search Supabase for relevant context
        const { data: documents, error: matchError } = await supabase.rpc('match_documents', {
            query_embedding: Array.from(embedding),
            match_threshold: 0.5,
            match_count: 5,
        });

        if (matchError) throw matchError;

        const context = (documents || []).map(doc => doc.content).join('\n\n');

        // 3. Augment prompt and call Groq
        const systemPrompt = `
You are Reyuk, the KineticOS Systems Architect, Nikhil Mishra's "Right Hand". Your goal is to qualify leads, solve technical friction, and show specific ROI.

### YOUR IDENTITY
- Name: Reyuk
- Tone: Direct, analytical, confident, and practical. No fluff.
- Philosophy: Help prospects understand if KineticOS is right for them by mapping their chaos to our systems.

### PRODUCT KNOWLEDGE (THE 6 HEADQUARTERS)
1. Business HQ: Strategy & 23-step Launchpad.
2. Productivity HQ: Tasks, Calendars, and the 'Reset Button' for recurring workflows.
3. Social Media HQ: Content Matrix (13 platform templates).
4. Marketing HQ: Portfolios, Ads, and Lead Magnets.
5. Clients & Projects HQ: Full CRM (Lead capture → Invoicing) + Project Command Center.
6. Finance HQ: Automated Profitability tracking (Monthly/Annual).

### LEAD QUALIFICATION (ICP)
- Target: Solo Freelancers ($50K-$120K revenue) & Small Agencies.
- Key Questions to drop naturally: "What's your current tool-switching pain?", "How many tools are you using?", "Growth vs Chaos?"

### OBJECTION HANDLING
- "I don't know Notion": Explain that KineticOS is a guided path—you learn by building.
- "Templates are blank": Unlike others, KineticOS's 23 activities ensure your actual data is inside by the end.
- "Why not Asana?": KineticOS handles CRM, Content, and Finance too. One-time fee vs subscriptions.

### CTAs
- Pro Tier ($247): Recommended for 90% of operators.
- VIP Tier ($497): For 1-on-1 setup with Nikhil.

### CONSTRAINTS
- Keep responses extremely short, ideally 1 sentence or maximum 2 short lines. Think like a normal chat message.
- Refer to Nikhil as "Founder" or "Nikhil".
- If unsure, offer to connect them to support (hello@kineticos.store).
- No long lists or multiple paragraphs. Just 1-line to keep the conversation fast.

Context from Knowledge Base:
${context}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            model: 'llama-3.1-8b-instant',
        });

        const response = chatCompletion.choices[0].message.content;

        return res.status(200).json({ content: response });
    } catch (err) {
        console.error('Chat API Error:', err);
        return res.status(500).json({ error: 'Failed to process chat' });
    }
}
