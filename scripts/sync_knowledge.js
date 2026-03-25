import { createClient } from '@supabase/supabase-js';
import { HfInference } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

async function syncKnowledge() {
    console.log('🚀 Starting Knowledge Sync...');

    try {
        const knowledgePath = path.join(__dirname, '../chatbot_knowledge.md');
        const content = fs.readFileSync(knowledgePath, 'utf8');

        // Simple chunking logic: split by h3 or double newlines
        const chunks = content
            .split(/\n### |\n## /)
            .map(c => c.trim())
            .filter(c => c.length > 20);

        console.log(`📝 Found ${chunks.length} knowledge chunks to sync.`);

        for (const chunk of chunks) {
            // Check if already exists
            const { data: existing } = await supabase
                .from('documents')
                .select('id')
                .eq('content', chunk)
                .maybeSingle();

            if (existing) {
                console.log('⏭️  Skipping existing chunk.');
                continue;
            }

            console.log(`📡 Embedding chunk: "${chunk.substring(0, 50).replace(/\n/g, ' ')}..."`);
            try {
                const response = await hf.featureExtraction({
                    model: 'sentence-transformers/all-MiniLM-L6-v2',
                    inputs: chunk,
                });

                // Debug: Log response structure
                console.log(`🔍 Response type: ${typeof response}, IsArray: ${Array.isArray(response)}`);

                // Handle different response structures: sometimes it's the array, sometimes { data: array }
                let embedding = Array.isArray(response) ? response : (response && response.data ? response.data : null);
                
                if (!embedding) {
                    console.error('❌ Failed to get valid embedding. Response structure:', response);
                    continue;
                }

                const { error } = await supabase.from('documents').insert({
                    content: chunk,
                    embedding: Array.from(embedding)
                });

                if (error) throw error;
            } catch (chunkErr) {
                console.error(`❌ Error processing chunk: ${chunkErr.message}`);
                continue; // Try next chunk
            }
        }

        console.log('✅ Knowledge Sync Complete!');
    } catch (err) {
        console.error('❌ Sync Failed:', err.message);
        process.exit(1);
    }
}

syncKnowledge();
