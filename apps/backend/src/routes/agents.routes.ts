import { Hono } from 'hono';
import type { AgentType } from '@swades/shared-types';

const app = new Hono();

const AGENTS = [
    {
        type: 'support' as AgentType,
        name: 'Support Agent',
        description: 'Handles general support inquiries, FAQs, troubleshooting, and account questions',
        capabilities: {
            tools: [
                {
                    name: 'queryConversationHistory',
                    description: 'Query past conversation history for context',
                },
            ],
        },
    },
    {
        type: 'order' as AgentType,
        name: 'Order Agent',
        description: 'Handles order status, tracking, modifications, and cancellations',
        capabilities: {
            tools: [
                {
                    name: 'fetchOrderDetails',
                    description: 'Fetch order details by order number',
                },
                {
                    name: 'checkDeliveryStatus',
                    description: 'Check delivery status and tracking information',
                },
            ],
        },
    },
    {
        type: 'billing' as AgentType,
        name: 'Billing Agent',
        description: 'Handles payment issues, refunds, invoices, and subscription queries',
        capabilities: {
            tools: [
                {
                    name: 'getInvoiceDetails',
                    description: 'Get invoice details by invoice number',
                },
                {
                    name: 'checkRefundStatus',
                    description: 'Check refund status by refund number',
                },
            ],
        },
    },
];

// GET /api/agents - List available agents
app.get('/', (c) => {
    return c.json({
        agents: AGENTS.map((a) => ({
            type: a.type,
            name: a.name,
            description: a.description,
        })),
    });
});

// GET /api/agents/:type/capabilities - Get agent capabilities
app.get('/:type/capabilities', (c) => {
    const agentType = c.req.param('type');
    const agent = AGENTS.find((a) => a.type === agentType);

    if (!agent) {
        return c.json({ error: 'Agent not found' }, 404);
    }

    return c.json({
        type: agent.type,
        name: agent.name,
        description: agent.description,
        ...agent.capabilities,
    });
});

export default app;
