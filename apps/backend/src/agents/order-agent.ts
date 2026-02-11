import { createGroq } from '@ai-sdk/groq';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { db, orders } from '@swades/database';
import { eq } from 'drizzle-orm';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function getOrderAgentResponse(
    userMessage: string,
    contextMessages: any[]
) {
    const systemPrompt = `You are an order specialist agent. You help customers with:
- Order status and tracking
- Delivery estimates
- Order modifications
- Cancellations
- Shipping information

Use the available tools to fetch real order data and provide accurate information.`;

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
            fetchOrderDetails: tool({
                description: 'Fetch order details by order number',
                parameters: z.object({
                    orderNumber: z.string().describe('The order number to look up (e.g., ORD-2024-001)'),
                }),
                execute: async ({ orderNumber }) => {
                    const [order] = await db
                        .select()
                        .from(orders)
                        .where(eq(orders.orderNumber, orderNumber))
                        .limit(1);

                    if (!order) {
                        return { error: 'Order not found' };
                    }

                    return {
                        orderNumber: order.orderNumber,
                        status: order.status,
                        items: order.items,
                        total: order.total,
                        trackingNumber: order.trackingNumber,
                        estimatedDelivery: order.estimatedDelivery,
                        createdAt: order.createdAt,
                    };
                },
            }),
            checkDeliveryStatus: tool({
                description: 'Check delivery status and tracking information',
                parameters: z.object({
                    orderNumber: z.string().describe('The order number to check'),
                }),
                execute: async ({ orderNumber }) => {
                    const [order] = await db
                        .select()
                        .from(orders)
                        .where(eq(orders.orderNumber, orderNumber))
                        .limit(1);

                    if (!order) {
                        return { error: 'Order not found' };
                    }

                    return {
                        status: order.status,
                        trackingNumber: order.trackingNumber,
                        estimatedDelivery: order.estimatedDelivery,
                        message: `Order ${order.status}${order.trackingNumber ? ` - Tracking: ${order.trackingNumber}` : ''}`,
                    };
                },
            }),
        },
        maxSteps: 5,
    });
}
