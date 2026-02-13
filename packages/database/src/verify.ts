import 'dotenv/config';
import { db } from './client.js';
import { conversations, messages, orders, invoices, refunds } from './schema.js';

async function verifyData() {
    console.log('📊 Database Summary:\n');

    const orderCount = await db.select().from(orders);
    const invoiceCount = await db.select().from(invoices);
    const refundCount = await db.select().from(refunds);
    const conversationCount = await db.select().from(conversations);
    const messageCount = await db.select().from(messages);

    console.log(`✅ Orders:        ${orderCount.length}`);
    console.log(`✅ Invoices:      ${invoiceCount.length}`);
    console.log(`✅ Refunds:       ${refundCount.length}`);
    console.log(`✅ Conversations: ${conversationCount.length}`);
    console.log(`✅ Messages:      ${messageCount.length}`);

    console.log('\n📦 Sample Orders:');
    orderCount.slice(0, 3).forEach(order => {
        console.log(`  - ${order.orderNumber}: ${order.status} ($${order.total})`);
    });

    console.log('\n💳 Sample Invoices:');
    invoiceCount.slice(0, 3).forEach(invoice => {
        console.log(`  - ${invoice.invoiceNumber}: ${invoice.status} ($${invoice.amount})`);
    });

    console.log('\n↩️  Sample Refunds:');
    refundCount.slice(0, 3).forEach(refund => {
        console.log(`  - ${refund.refundNumber}: ${refund.status} ($${refund.amount})`);
    });

    process.exit(0);
}

verifyData();
