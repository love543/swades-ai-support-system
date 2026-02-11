import { createGroq } from '@ai-sdk/groq';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { db, invoices, refunds } from '@swades/database';
import { eq } from 'drizzle-orm';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function getBillingAgentResponse(
    userMessage: string,
    contextMessages: any[]
) {
    const systemPrompt = `You are a billing specialist agent. You help customers with:
- Payment issues and methods
- Invoice information
- Refund requests and status
- Subscription queries
- Pricing questions

Use the available tools to fetch real billing data and provide accurate information.`;

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
            getInvoiceDetails: tool({
                description: 'Get invoice details by invoice number',
                parameters: z.object({
                    invoiceNumber: z.string().describe('The invoice number to look up (e.g., INV-2024-001)'),
                }),
                execute: async ({ invoiceNumber }) => {
                    const [invoice] = await db
                        .select()
                        .from(invoices)
                        .where(eq(invoices.invoiceNumber, invoiceNumber))
                        .limit(1);

                    if (!invoice) {
                        return { error: 'Invoice not found' };
                    }

                    return {
                        invoiceNumber: invoice.invoiceNumber,
                        amount: invoice.amount,
                        status: invoice.status,
                        dueDate: invoice.dueDate,
                        paidAt: invoice.paidAt,
                        items: invoice.items,
                        createdAt: invoice.createdAt,
                    };
                },
            }),
            checkRefundStatus: tool({
                description: 'Check refund status by refund number',
                parameters: z.object({
                    refundNumber: z.string().describe('The refund number to check (e.g., REF-2024-001)'),
                }),
                execute: async ({ refundNumber }) => {
                    const [refund] = await db
                        .select()
                        .from(refunds)
                        .where(eq(refunds.refundNumber, refundNumber))
                        .limit(1);

                    if (!refund) {
                        return { error: 'Refund not found' };
                    }

                    return {
                        refundNumber: refund.refundNumber,
                        amount: refund.amount,
                        status: refund.status,
                        reason: refund.reason,
                        createdAt: refund.createdAt,
                        completedAt: refund.completedAt,
                    };
                },
            }),
        },
        maxSteps: 5,
    });
}
