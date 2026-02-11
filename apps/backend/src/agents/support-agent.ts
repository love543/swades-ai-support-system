import { createGroq } from '@ai-sdk/groq';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { db, messages } from '@swades/database';
import { eq, desc } from 'drizzle-orm';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function getSupportAgentResponse(
    userMessage: string,
    conversationId: string,
    contextMessages: any[]
) {
    const systemPrompt = `You are a helpful customer support agent. You assist customers with general inquiries, FAQs, troubleshooting, and account questions.

You have access to conversation history to provide contextual support. Be friendly, professional, and helpful.`;

    return streamText({
        model: groq('llama-3.3-70b-versatile'),
        system: systemPrompt,
        messages: [
            ...contextMessages.map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            })),
            { role: 'user', content: userMessage },
        ],
        tools: {
            queryConversationHistory: tool({
                description: 'Query past conversation history for context',
                parameters: z.object({
                    query: z.string().describe('What to search for in conversation history'),
                }),
                execute: async ({ query }) => {
                    const history = await db
                        .select()
                        .from(messages)
                        .where(eq(messages.conversationId, conversationId))
                        .orderBy(desc(messages.createdAt))
                        .limit(20);

                    return {
                        conversationHistory: history.map((m) => ({
                            role: m.role,
                            content: m.content,
                            timestamp: m.createdAt,
                        })),
                    };
                },
            }),
        },
        maxSteps: 5,
    });
}
