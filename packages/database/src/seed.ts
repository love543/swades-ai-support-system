import { db } from './client';
import { conversations, messages, orders, invoices, refunds } from './schema';

async function seed() {
    console.log('🌱 Seeding database...');

    // Seed Orders
    console.log('Creating orders...');
    const orderData = [
        {
            orderNumber: 'ORD-2024-001',
            status: 'delivered',
            items: [
                { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
                { name: 'USB-C Cable', quantity: 2, price: 12.99 },
            ],
            total: '105.97',
            trackingNumber: 'TRK1234567890',
            estimatedDelivery: new Date('2024-02-15'),
        },
        {
            orderNumber: 'ORD-2024-002',
            status: 'shipped',
            items: [{ name: 'Laptop Stand', quantity: 1, price: 49.99 }],
            total: '49.99',
            trackingNumber: 'TRK0987654321',
            estimatedDelivery: new Date('2024-02-20'),
        },
        {
            orderNumber: 'ORD-2024-003',
            status: 'processing',
            items: [
                { name: 'Mechanical Keyboard', quantity: 1, price: 129.99 },
                { name: 'Mouse Pad', quantity: 1, price: 19.99 },
            ],
            total: '149.98',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-02-25'),
        },
        {
            orderNumber: 'ORD-2024-004',
            status: 'pending',
            items: [{ name: 'Monitor', quantity: 1, price: 299.99 }],
            total: '299.99',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-03-01'),
        },
        {
            orderNumber: 'ORD-2024-005',
            status: 'cancelled',
            items: [{ name: 'Desk Lamp', quantity: 2, price: 34.99 }],
            total: '69.98',
            trackingNumber: null,
            estimatedDelivery: null,
        },
    ];

    await db.insert(orders).values(orderData);

    // Seed Invoices
    console.log('Creating invoices...');
    const invoiceData = [
        {
            invoiceNumber: 'INV-2024-001',
            amount: '105.97',
            status: 'paid',
            dueDate: new Date('2024-01-31'),
            paidAt: new Date('2024-01-28'),
            items: [
                { description: 'Order ORD-2024-001', amount: 105.97 },
            ],
        },
        {
            invoiceNumber: 'INV-2024-002',
            amount: '49.99',
            status: 'paid',
            dueDate: new Date('2024-02-15'),
            paidAt: new Date('2024-02-10'),
            items: [
                { description: 'Order ORD-2024-002', amount: 49.99 },
            ],
        },
        {
            invoiceNumber: 'INV-2024-003',
            amount: '149.98',
            status: 'unpaid',
            dueDate: new Date('2024-02-28'),
            paidAt: null,
            items: [
                { description: 'Order ORD-2024-003', amount: 149.98 },
            ],
        },
        {
            invoiceNumber: 'INV-2024-004',
            amount: '299.99',
            status: 'overdue',
            dueDate: new Date('2024-02-05'),
            paidAt: null,
            items: [
                { description: 'Order ORD-2024-004', amount: 299.99 },
            ],
        },
        {
            invoiceNumber: 'INV-2023-099',
            amount: '89.99',
            status: 'paid',
            dueDate: new Date('2023-12-31'),
            paidAt: new Date('2023-12-20'),
            items: [
                { description: 'Premium Subscription - Annual', amount: 89.99 },
            ],
        },
    ];

    const insertedInvoices = await db.insert(invoices).values(invoiceData).returning();

    // Seed Refunds
    console.log('Creating refunds...');
    const refundData = [
        {
            refundNumber: 'REF-2024-001',
            invoiceId: insertedInvoices[0].id,
            amount: '12.99',
            status: 'completed',
            reason: 'Defective USB-C cable',
            completedAt: new Date('2024-02-05'),
        },
        {
            refundNumber: 'REF-2024-002',
            invoiceId: insertedInvoices[1].id,
            amount: '49.99',
            status: 'pending',
            reason: 'Changed mind',
            completedAt: null,
        },
        {
            refundNumber: 'REF-2024-003',
            invoiceId: null,
            amount: '19.99',
            status: 'denied',
            reason: 'Outside return window',
            completedAt: null,
        },
    ];

    await db.insert(refunds).values(refundData);

    // Seed Sample Conversations
    console.log('Creating sample conversations...');
    const conv1 = await db.insert(conversations).values({
        title: 'Order Status Inquiry',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv1[0].id,
            role: 'user',
            content: 'Where is my order ORD-2024-002?',
        },
        {
            conversationId: conv1[0].id,
            role: 'assistant',
            content: 'Your order ORD-2024-002 is currently shipped with tracking number TRK0987654321. Estimated delivery is February 20, 2024.',
            agentType: 'order',
            reasoning: 'User asking about order status - delegating to Order Agent',
        },
    ]);

    const conv2 = await db.insert(conversations).values({
        title: 'Invoice Payment Question',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv2[0].id,
            role: 'user',
            content: 'I need to pay invoice INV-2024-003',
        },
        {
            conversationId: conv2[0].id,
            role: 'assistant',
            content: 'Invoice INV-2024-003 for $149.98 is currently unpaid with a due date of February 28, 2024. Would you like me to send you a payment link?',
            agentType: 'billing',
            reasoning: 'Invoice payment inquiry - delegating to Billing Agent',
        },
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
});
