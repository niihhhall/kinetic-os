import { Groq } from 'groq-sdk';
import { HfInference } from '@huggingface/inference';
import { createClient } from '@supabase/supabase-js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages } = req.body;
        const userMessage = messages[messages.length - 1].content;

        // 1. Generate embedding for the user message
        const { data: embedding } = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: userMessage,
        });

        // 2. Search Supabase for relevant context
        const { data: documents, error: matchError } = await supabase.rpc('match_documents', {
            query_embedding: Array.from(embedding),
            match_threshold: 0.5,
            match_count: 5,
        });

        if (matchError) throw matchError;

        const context = documents.map(doc => doc.content).join('\n\n');

        // 3. Augment prompt and call Groq
        const systemPrompt = `
      You are Albert, the friendly AI assistant for KineticOS. 
      KineticOS is a premium Notion ecosystem for freelancers.
      
      Use the following context to answer the user's question accurately. 
      If the answer is not in the context, say you don't know and offer to connect them to support.
      Always maintain a professional, helpful, and premium tone.
      
      Context:
      ${context}
    `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            model: 'llama3-8b-8192',
        });

        const response = chatCompletion.choices[0].message.content;

        return res.status(200).json({ content: response });
    } catch (err) {
        console.error('Chat API Error:', err);
        return res.status(500).json({ error: 'Failed to process chat' });
    }
}
