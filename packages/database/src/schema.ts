import { pgTable, text, timestamp, uuid, decimal, jsonb } from 'drizzle-orm/pg-core';

// Conversations table
export const conversations = pgTable('conversations', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull().default('user-1'),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Messages table
export const messages = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id')
        .notNull()
        .references(() => conversations.id, { onDelete: 'cascade' }),
    role: text('role').notNull(), // 'user' | 'assistant' | 'system'
    content: text('content').notNull(),
    agentType: text('agent_type'), // 'router' | 'support' | 'order' | 'billing' | null
    reasoning: text('reasoning'), // AI reasoning/thinking process
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Orders table (mock data)
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderNumber: text('order_number').notNull().unique(),
    userId: text('user_id').notNull().default('user-1'),
    status: text('status').notNull(), // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    items: jsonb('items').notNull(), // Array of items
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    trackingNumber: text('tracking_number'),
    estimatedDelivery: timestamp('estimated_delivery'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Invoices table (mock data)
export const invoices = pgTable('invoices', {
    id: uuid('id').primaryKey().defaultRandom(),
    invoiceNumber: text('invoice_number').notNull().unique(),
    userId: text('user_id').notNull().default('user-1'),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    status: text('status').notNull(), // 'paid' | 'unpaid' | 'overdue' | 'cancelled'
    dueDate: timestamp('due_date').notNull(),
    paidAt: timestamp('paid_at'),
    items: jsonb('items').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Refunds table (mock data)
export const refunds = pgTable('refunds', {
    id: uuid('id').primaryKey().defaultRandom(),
    refundNumber: text('refund_number').notNull().unique(),
    invoiceId: uuid('invoice_id').references(() => invoices.id),
    userId: text('user_id').notNull().default('user-1'),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    status: text('status').notNull(), // 'pending' | 'approved' | 'completed' | 'denied'
    reason: text('reason').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
});

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Refund = typeof refunds.$inferSelect;
