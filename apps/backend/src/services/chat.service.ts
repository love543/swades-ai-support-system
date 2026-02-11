import { db, conversations, messages, type NewMessage } from '@swades/database';
import { eq, desc } from 'drizzle-orm';
import { routeQuery } from '../agents/router';
import { getSupportAgentResponse } from '../agents/support-agent';
import { getOrderAgentResponse } from '../agents/order-agent';
import { getBillingAgentResponse } from '../agents/billing-agent';
import type { AgentType } from '@swades/shared-types';

export class ChatService {
    async createConversation(title: string) {
        const [conversation] = await db
            .insert(conversations)
            .values({ title })
            .returning();
        return conversation;
    }

    async getConversation(conversationId: string) {
        const [conversation] = await db
            .select()
            .from(conversations)
            .where(eq(conversations.id, conversationId))
            .limit(1);

        if (!conversation) {
            throw new Error('Conversation not found');
        }

        const conversationMessages = await db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, conversationId))
            .orderBy(messages.createdAt);

        return { ...conversation, messages: conversationMessages };
    }

    async listConversations() {
        const allConversations = await db
            .select()
            .from(conversations)
            .orderBy(desc(conversations.updatedAt));

        return allConversations;
    }

    async deleteConversation(conversationId: string) {
        await db.delete(conversations).where(eq(conversations.id, conversationId));
    }

    async sendMessage(conversationId: string, userMessage: string) {
        const contextMessages = await db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, conversationId))
            .orderBy(desc(messages.createdAt))
            .limit(10);

        contextMessages.reverse(); 

        const [userMsg] = await db
            .insert(messages)
            .values({
                conversationId,
                role: 'user',
                content: userMessage,
            })
            .returning();

        const { agentType, reasoning } = await routeQuery(userMessage);

        let agentStream;
        switch (agentType) {
            case 'support':
                agentStream = await getSupportAgentResponse(
                    userMessage,
                    conversationId,
                    contextMessages
                );
                break;
            case 'order':
                agentStream = await getOrderAgentResponse(userMessage, contextMessages);
                break;
            case 'billing':
                agentStream = await getBillingAgentResponse(userMessage, contextMessages);
                break;
            default:
                agentStream = await getSupportAgentResponse(
                    userMessage,
                    conversationId,
                    contextMessages
                );
        }

        return {
            stream: agentStream,
            agentType,
            reasoning,
            userMessageId: userMsg.id,
        };
    }

    async saveAssistantMessage(
        conversationId: string,
        content: string,
        agentType: AgentType,
        reasoning?: string
    ) {
        const [msg] = await db
            .insert(messages)
            .values({
                conversationId,
                role: 'assistant',
                content,
                agentType,
                reasoning,
            })
            .returning();

        return msg;
    }
}
