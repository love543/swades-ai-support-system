import 'dotenv/config';
import { db } from './client.js';
import { conversations, messages, orders, invoices, refunds } from './schema.js';

async function clearDatabase() {
    console.log('🧹 Clearing database...');

    await db.delete(messages);
    await db.delete(conversations);
    await db.delete(refunds);
    await db.delete(invoices);
    await db.delete(orders);

    console.log('✅ Database cleared successfully!');
    process.exit(0);
}

clearDatabase().catch((error) => {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
});
