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
    "KineticOS was built by UNIK BUILDS to solve the problem of fragmented tools and administrative burnout for freelancers."
];

async function seedDatabase(supabase, hf) {
    try {
        const { count } = await supabase.from('documents').select('*', { count: 'exact', head: true });
        if (count > 0) return;

        console.log('🌱 Seeding initial knowledge base...');
        for (const text of SEED_DOCS) {
            const { data: embedding } = await hf.featureExtraction({
                model: 'sentence-transformers/all-MiniLM-L6-v2',
                inputs: text,
            });

            await supabase.from('documents').insert({
                content: text,
                embedding: Array.from(embedding)
            });
        }
        console.log('✅ Seeding complete.');
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
