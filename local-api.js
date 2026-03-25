import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper to handle Vercel-style function handlers
const handleApi = async (req, res, handlerPath) => {
    try {
        const module = await import(handlerPath);
        await module.default(req, res);
    } catch (err) {
        console.error(`Error in ${handlerPath}:`, err);
        res.status(500).json({ error: err.message });
    }
};

const SEED_DOCS = [
    "KineticOS is a premium Notion ecosystem designed for high-performance freelancers to scale to $10k+ months.",
    "The 'Starter' plan costs $97 (reduced from $197) and includes 3 core headquarters: Business, Productivity, and Finance.",
    "The 'Pro System' costs $247 (reduced from $497) and adds Marketing, Social, and Clients HQs, plus a 12-module video course.",
    "The 'VIP Scaling' plan costs $497 (reduced from $997) and includes everything in Pro plus a 60-min onboarding call and custom workflow audit.",
    "KineticOS replaces over 8 monthly subscriptions, saving users approximately $8,000 in onboarding costs for agencies.",
    "The system includes 6 unified hubs: Business HQ, Clients & Projects HQ, Finance HQ, Productivity HQ, Social HQ, and Marketing HQ.",
    "Key features include a master calendar view, real-time profit visibility, and a Notion free-plan ready architecture.",
    "We offer a 30-day money-back guarantee on all KineticOS purchases.",
    "Support is available via email, with priority 24h support for Pro and VIP members.",
    "KineticOS was built by UNIK BUILDS by Nikhil Mishra to solve fragmented tools for freelancers.",
    // Expert Knowledge Chunks
    "Business HQ: Strategy, Brand foundations (USP, ICP), Goal-setting. Includes a 6-phase, 23-activity Business Launchpad.",
    "Productivity HQ: Tasks, Calendars, Recurring workflows, and the 'Reset Button' for one-click weekly resets.",
    "Social Media HQ: Content Matrix with 13 platform templates and IDEA generation pipeline.",
    "Marketing HQ: Non-social strategy: Portfolios, Ad campaigns, Lead magnets, and Collaborations.",
    "Clients & Projects HQ: Full CRM (Lead capture to Invoicing) and Project Command Center (all data in one view).",
    "Finance HQ: Automated Profits computing Monthly & Annual profitability from transaction logs.",
    "Objection (Notion): 'If you can use Google Docs, you can use this.' The Launchpad guides you by building your business.",
    "Objection (Tool switching): KineticOS replaces CRM, Content, and Finance in one purchase vs monthly fees for Asana/ClickUp.",
    "Lead Qualification: Target Solo Freelancers ($50K-$120K revenue) and small agencies (2-6 people, $200K+ revenue)."
];

async function seedDatabase(supabase, hf) {
    try {
        console.log('🌱 Checking knowledge base sync...');
        for (const text of SEED_DOCS) {
            // Check if this specific content already exists
            const { data: existing } = await supabase
                .from('documents')
                .select('id')
                .eq('content', text)
                .maybeSingle();

            if (existing) continue;

            console.log(`📡 Syncing new knowledge: "${text.substring(0, 40)}..."`);
            const { data: embedding } = await hf.featureExtraction({
                model: 'sentence-transformers/all-MiniLM-L6-v2',
                inputs: text,
            });

            await supabase.from('documents').insert({
                content: text,
                embedding: Array.from(embedding)
            });
        }
        console.log('✅ Knowledge sync complete.');
    } catch (err) {
        console.warn('⚠️ Seeding failed (check if Supabase table is created):', err.message);
    }
}

// Map routes to files in the api directory
app.post('/api/create-razorpay-order', (req, res) => handleApi(req, res, './api/create-razorpay-order.js'));
app.post('/api/create-checkout-session', (req, res) => handleApi(req, res, './api/create-checkout-session.js'));
app.post('/api/support', (req, res) => handleApi(req, res, './api/support.js'));
app.post('/api/webhook', (req, res) => handleApi(req, res, './api/webhook.js'));
app.post('/api/chat', (req, res) => handleApi(req, res, './api/chat.js'));
app.post('/api/join-waitlist', (req, res) => handleApi(req, res, './api/join-waitlist.js'));

app.listen(port, async () => {
    console.log(`Local API server running at http://localhost:${port}`);

    // Optional: Auto-seed if Supabase is connected
    if (process.env.SUPABASE_URL && process.env.HUGGING_FACE_TOKEN) {
        const { createClient } = await import('@supabase/supabase-js');
        const { HfInference } = await import('@huggingface/inference');
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);
        await seedDatabase(supabase, hf);
    }
});
