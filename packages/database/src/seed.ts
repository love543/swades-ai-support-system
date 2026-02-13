import 'dotenv/config';
import { db } from './client.js';
import { conversations, messages, orders, invoices, refunds } from './schema.js';

async function seed() {
    console.log('🌱 Seeding database...');

    // Seed Orders (expanded to 20 orders)
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
            items: [{ name: '4K Monitor', quantity: 1, price: 299.99 }],
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
        {
            orderNumber: 'ORD-2024-006',
            status: 'delivered',
            items: [
                { name: 'Gaming Mouse', quantity: 1, price: 89.99 },
                { name: 'RGB Mouse Pad', quantity: 1, price: 29.99 },
            ],
            total: '119.98',
            trackingNumber: 'TRK2468013579',
            estimatedDelivery: new Date('2024-02-10'),
        },
        {
            orderNumber: 'ORD-2024-007',
            status: 'shipped',
            items: [{ name: 'Webcam HD 1080p', quantity: 1, price: 69.99 }],
            total: '69.99',
            trackingNumber: 'TRK1357924680',
            estimatedDelivery: new Date('2024-02-22'),
        },
        {
            orderNumber: 'ORD-2024-008',
            status: 'processing',
            items: [
                { name: 'Standing Desk', quantity: 1, price: 449.99 },
                { name: 'Cable Management Kit', quantity: 1, price: 24.99 },
            ],
            total: '474.98',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-03-05'),
        },
        {
            orderNumber: 'ORD-2024-009',
            status: 'delivered',
            items: [{ name: 'Ergonomic Chair', quantity: 1, price: 349.99 }],
            total: '349.99',
            trackingNumber: 'TRK9876543210',
            estimatedDelivery: new Date('2024-02-08'),
        },
        {
            orderNumber: 'ORD-2024-010',
            status: 'shipped',
            items: [
                { name: 'Bluetooth Speaker', quantity: 2, price: 59.99 },
                { name: 'Phone Stand', quantity: 1, price: 15.99 },
            ],
            total: '135.97',
            trackingNumber: 'TRK5432167890',
            estimatedDelivery: new Date('2024-02-24'),
        },
        {
            orderNumber: 'ORD-2024-011',
            status: 'pending',
            items: [{ name: 'Laptop Backpack', quantity: 1, price: 79.99 }],
            total: '79.99',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-02-28'),
        },
        {
            orderNumber: 'ORD-2024-012',
            status: 'delivered',
            items: [
                { name: 'USB Hub 7-Port', quantity: 1, price: 34.99 },
                { name: 'HDMI Cable 6ft', quantity: 2, price: 9.99 },
            ],
            total: '54.97',
            trackingNumber: 'TRK7890123456',
            estimatedDelivery: new Date('2024-02-12'),
        },
        {
            orderNumber: 'ORD-2024-013',
            status: 'processing',
            items: [{ name: 'Noise Cancelling Headphones', quantity: 1, price: 199.99 }],
            total: '199.99',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-03-02'),
        },
        {
            orderNumber: 'ORD-2024-014',
            status: 'shipped',
            items: [
                { name: 'Wireless Charger', quantity: 2, price: 29.99 },
                { name: 'Screen Protector', quantity: 3, price: 12.99 },
            ],
            total: '98.95',
            trackingNumber: 'TRK3216549870',
            estimatedDelivery: new Date('2024-02-26'),
        },
        {
            orderNumber: 'ORD-2024-015',
            status: 'delivered',
            items: [{ name: 'External SSD 1TB', quantity: 1, price: 129.99 }],
            total: '129.99',
            trackingNumber: 'TRK6549873210',
            estimatedDelivery: new Date('2024-02-14'),
        },
        {
            orderNumber: 'ORD-2024-016',
            status: 'cancelled',
            items: [{ name: 'Smart Watch', quantity: 1, price: 249.99 }],
            total: '249.99',
            trackingNumber: null,
            estimatedDelivery: null,
        },
        {
            orderNumber: 'ORD-2024-017',
            status: 'processing',
            items: [
                { name: 'Microphone USB', quantity: 1, price: 89.99 },
                { name: 'Pop Filter', quantity: 1, price: 14.99 },
                { name: 'Mic Arm', quantity: 1, price: 39.99 },
            ],
            total: '144.97',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-03-03'),
        },
        {
            orderNumber: 'ORD-2024-018',
            status: 'shipped',
            items: [{ name: 'Tablet 10 inch', quantity: 1, price: 299.99 }],
            total: '299.99',
            trackingNumber: 'TRK1472583690',
            estimatedDelivery: new Date('2024-02-27'),
        },
        {
            orderNumber: 'ORD-2024-019',
            status: 'delivered',
            items: [
                { name: 'Keyboard Wrist Rest', quantity: 1, price: 24.99 },
                { name: 'Mouse Wrist Rest', quantity: 1, price: 19.99 },
            ],
            total: '44.98',
            trackingNumber: 'TRK9630147258',
            estimatedDelivery: new Date('2024-02-11'),
        },
        {
            orderNumber: 'ORD-2024-020',
            status: 'pending',
            items: [{ name: 'Portable Monitor 15.6"', quantity: 1, price: 199.99 }],
            total: '199.99',
            trackingNumber: null,
            estimatedDelivery: new Date('2024-03-04'),
        },
    ];

    await db.insert(orders).values(orderData);

    // Seed Invoices (expanded to 15 invoices)
    console.log('Creating invoices...');
    const invoiceData = [
        {
            invoiceNumber: 'INV-2024-001',
            amount: '105.97',
            status: 'paid',
            dueDate: new Date('2024-01-31'),
            paidAt: new Date('2024-01-28'),
            items: [{ description: 'Order ORD-2024-001', amount: 105.97 }],
        },
        {
            invoiceNumber: 'INV-2024-002',
            amount: '49.99',
            status: 'paid',
            dueDate: new Date('2024-02-15'),
            paidAt: new Date('2024-02-10'),
            items: [{ description: 'Order ORD-2024-002', amount: 49.99 }],
        },
        {
            invoiceNumber: 'INV-2024-003',
            amount: '149.98',
            status: 'unpaid',
            dueDate: new Date('2024-02-28'),
            paidAt: null,
            items: [{ description: 'Order ORD-2024-003', amount: 149.98 }],
        },
        {
            invoiceNumber: 'INV-2024-004',
            amount: '299.99',
            status: 'overdue',
            dueDate: new Date('2024-02-05'),
            paidAt: null,
            items: [{ description: 'Order ORD-2024-004', amount: 299.99 }],
        },
        {
            invoiceNumber: 'INV-2024-005',
            amount: '119.98',
            status: 'paid',
            dueDate: new Date('2024-02-10'),
            paidAt: new Date('2024-02-08'),
            items: [{ description: 'Order ORD-2024-006', amount: 119.98 }],
        },
        {
            invoiceNumber: 'INV-2024-006',
            amount: '69.99',
            status: 'paid',
            dueDate: new Date('2024-02-22'),
            paidAt: new Date('2024-02-20'),
            items: [{ description: 'Order ORD-2024-007', amount: 69.99 }],
        },
        {
            invoiceNumber: 'INV-2024-007',
            amount: '474.98',
            status: 'unpaid',
            dueDate: new Date('2024-03-05'),
            paidAt: null,
            items: [{ description: 'Order ORD-2024-008', amount: 474.98 }],
        },
        {
            invoiceNumber: 'INV-2024-008',
            amount: '349.99',
            status: 'paid',
            dueDate: new Date('2024-02-08'),
            paidAt: new Date('2024-02-07'),
            items: [{ description: 'Order ORD-2024-009', amount: 349.99 }],
        },
        {
            invoiceNumber: 'INV-2024-009',
            amount: '135.97',
            status: 'paid',
            dueDate: new Date('2024-02-24'),
            paidAt: new Date('2024-02-22'),
            items: [{ description: 'Order ORD-2024-010', amount: 135.97 }],
        },
        {
            invoiceNumber: 'INV-2024-010',
            amount: '79.99',
            status: 'unpaid',
            dueDate: new Date('2024-02-28'),
            paidAt: null,
            items: [{ description: 'Order ORD-2024-011', amount: 79.99 }],
        },
        {
            invoiceNumber: 'INV-2024-011',
            amount: '199.99',
            status: 'overdue',
            dueDate: new Date('2024-02-18'),
            paidAt: null,
            items: [{ description: 'Order ORD-2024-013', amount: 199.99 }],
        },
        {
            invoiceNumber: 'INV-2024-012',
            amount: '129.99',
            status: 'paid',
            dueDate: new Date('2024-02-14'),
            paidAt: new Date('2024-02-13'),
            items: [{ description: 'Order ORD-2024-015', amount: 129.99 }],
        },
        {
            invoiceNumber: 'INV-2024-013',
            amount: '89.99',
            status: 'paid',
            dueDate: new Date('2024-01-15'),
            paidAt: new Date('2024-01-10'),
            items: [{ description: 'Premium Subscription - Monthly', amount: 89.99 }],
        },
        {
            invoiceNumber: 'INV-2023-099',
            amount: '999.99',
            status: 'paid',
            dueDate: new Date('2023-12-31'),
            paidAt: new Date('2023-12-20'),
            items: [{ description: 'Premium Subscription - Annual', amount: 999.99 }],
        },
        {
            invoiceNumber: 'INV-2024-014',
            amount: '44.98',
            status: 'paid',
            dueDate: new Date('2024-02-11'),
            paidAt: new Date('2024-02-10'),
            items: [{ description: 'Order ORD-2024-019', amount: 44.98 }],
        },
    ];

    const insertedInvoices = await db.insert(invoices).values(invoiceData).returning();

    // Seed Refunds (expanded to 10 refunds)
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
        {
            refundNumber: 'REF-2024-004',
            invoiceId: insertedInvoices[4].id,
            amount: '29.99',
            status: 'completed',
            reason: 'Wrong item received',
            completedAt: new Date('2024-02-12'),
        },
        {
            refundNumber: 'REF-2024-005',
            invoiceId: insertedInvoices[7].id,
            amount: '349.99',
            status: 'processing',
            reason: 'Product damaged during shipping',
            completedAt: null,
        },
        {
            refundNumber: 'REF-2024-006',
            invoiceId: insertedInvoices[11].id,
            amount: '129.99',
            status: 'completed',
            reason: 'Not as described',
            completedAt: new Date('2024-02-16'),
        },
        {
            refundNumber: 'REF-2024-007',
            invoiceId: null,
            amount: '79.99',
            status: 'denied',
            reason: 'Product used and cannot be returned',
            completedAt: null,
        },
        {
            refundNumber: 'REF-2024-008',
            invoiceId: insertedInvoices[8].id,
            amount: '59.99',
            status: 'pending',
            reason: 'Duplicate order',
            completedAt: null,
        },
        {
            refundNumber: 'REF-2024-009',
            invoiceId: insertedInvoices[12].id,
            amount: '89.99',
            status: 'completed',
            reason: 'Service not satisfactory',
            completedAt: new Date('2024-01-18'),
        },
        {
            refundNumber: 'REF-2024-010',
            invoiceId: insertedInvoices[14].id,
            amount: '24.99',
            status: 'processing',
            reason: 'Wrong color shipped',
            completedAt: null,
        },
    ];

    await db.insert(refunds).values(refundData);

    // Seed Sample Conversations (expanded to 8 conversations)
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

    const conv3 = await db.insert(conversations).values({
        title: 'Refund Status Check',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv3[0].id,
            role: 'user',
            content: 'What is the status of my refund REF-2024-005?',
        },
        {
            conversationId: conv3[0].id,
            role: 'assistant',
            content: 'Your refund REF-2024-005 for $349.99 is currently being processed. The reason listed is "Product damaged during shipping". We\'ll notify you once it\'s completed.',
            agentType: 'billing',
            reasoning: 'Refund status inquiry - delegating to Billing Agent',
        },
    ]);

    const conv4 = await db.insert(conversations).values({
        title: 'General Support Question',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv4[0].id,
            role: 'user',
            content: 'How do I reset my password?',
        },
        {
            conversationId: conv4[0].id,
            role: 'assistant',
            content: 'To reset your password, click on "Forgot Password" on the login page. You\'ll receive an email with a reset link. If you don\'t receive it within 5 minutes, please check your spam folder.',
            agentType: 'support',
            reasoning: 'General account support question - delegating to Support Agent',
        },
    ]);

    const conv5 = await db.insert(conversations).values({
        title: 'Multiple Orders Tracking',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv5[0].id,
            role: 'user',
            content: 'Can you check the status of orders ORD-2024-007 and ORD-2024-010?',
        },
        {
            conversationId: conv5[0].id,
            role: 'assistant',
            content: 'Order ORD-2024-007 (Webcam HD 1080p) is shipped with tracking TRK1357924680, arriving Feb 22. Order ORD-2024-010 (Bluetooth Speakers & Phone Stand) is also shipped with tracking TRK5432167890, arriving Feb 24.',
            agentType: 'order',
            reasoning: 'Multiple order status inquiry - delegating to Order Agent',
        },
    ]);

    const conv6 = await db.insert(conversations).values({
        title: 'Overdue Invoice',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv6[0].id,
            role: 'user',
            content: 'I see invoice INV-2024-004 is overdue. What should I do?',
        },
        {
            conversationId: conv6[0].id,
            role: 'assistant',
            content: 'Invoice INV-2024-004 for $299.99 was due on February 5, 2024. To avoid late fees, please make payment as soon as possible. I can send you a payment link right away.',
            agentType: 'billing',
            reasoning: 'Overdue invoice inquiry - delegating to Billing Agent',
        },
    ]);

    const conv7 = await db.insert(conversations).values({
        title: 'Cancelled Order Question',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv7[0].id,
            role: 'user',
            content: 'Why was my order ORD-2024-016 cancelled?',
        },
        {
            conversationId: conv7[0].id,
            role: 'assistant',
            content: 'Order ORD-2024-016 (Smart Watch - $249.99) was cancelled. Let me check the details for you. Could you provide more context about when you placed this order?',
            agentType: 'order',
            reasoning: 'Cancelled order inquiry - delegating to Order Agent',
        },
    ]);

    const conv8 = await db.insert(conversations).values({
        title: 'Account Settings Help',
    }).returning();

    await db.insert(messages).values([
        {
            conversationId: conv8[0].id,
            role: 'user',
            content: 'How can I update my shipping address?',
        },
        {
            conversationId: conv8[0].id,
            role: 'assistant',
            content: 'You can update your shipping address by going to Account Settings > Addresses. Click "Add New Address" or edit an existing one. Make sure to set it as default if you want it used for future orders.',
            agentType: 'support',
            reasoning: 'Account settings question - delegating to Support Agent',
        },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('📊 Summary:');
    console.log('  - 20 orders created');
    console.log('  - 15 invoices created');
    console.log('  - 10 refunds created');
    console.log('  - 8 sample conversations created');
    process.exit(0);
}

seed().catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
});
