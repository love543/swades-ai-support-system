import { createGroq } from '@ai-sdk/groq';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import type { AgentType } from '@swades/shared-types';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

interface RouterResult {
    agentType: AgentType;
    reasoning: string;
}

export async function routeQuery(userMessage: string): Promise<RouterResult> {
    const prompt = `You are a router agent for a customer support system. Analyze the user's query and determine which specialized agent should handle it.

Available agents:
- support: General support inquiries, FAQs, troubleshooting, account questions
- order: Order status, tracking, modifications, cancellations, shipping questions
- billing: Payment issues, refunds, invoices, subscription queries, pricing questions

User query: "${userMessage}"

Classify this query and explain your reasoning.`;

    const result = await generateText({
        model: groq('llama-3.3-70b-versatile'),
        prompt,
        tools: {
            classifyQuery: tool({
                description: 'Classify the user query into one of the available agent types',
                parameters: z.object({
                    agentType: z.enum(['support', 'order', 'billing']).describe('The type of agent to route to'),
                    reasoning: z.string().describe('Explanation for the routing decision'),
                }),
            }),
        },
        toolChoice: 'required',
        maxSteps: 1,
    });

    const toolCall = result.toolCalls[0];
    if (toolCall?.toolName === 'classifyQuery') {
        return toolCall.args as RouterResult;
    }

    // Fallback to support agent
    return {
        agentType: 'support',
        reasoning: 'Unable to classify query specifically, defaulting to support agent',
    };
}
