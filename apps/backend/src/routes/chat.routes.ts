import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { stream } from 'hono/streaming';
import { ChatService } from '../services/chat.service';
import { AppError } from '../middleware/errorHandler';

const app = new Hono();
const chatService = new ChatService();

// POST /api/chat/messages - Send new message
app.post(
    '/messages',
    zValidator(
        'json',
        z.object({
            conversationId: z.string().uuid().optional(),
            message: z.string().min(1),
        })
    ),
    async (c) => {
        const { conversationId, message } = c.req.valid('json');

        let convId = conversationId;

        // Create new conversation if not provided
        if (!convId) {
            const conversation = await chatService.createConversation(
                message.slice(0, 50) + (message.length > 50 ? '...' : '')
            );
            convId = conversation.id;
        }

        // Get agent response stream
        const { stream: agentStream, agentType, reasoning, userMessageId } =
            await chatService.sendMessage(convId, message);

        // Stream response to client
        return stream(c, async (streamWriter) => {
            let fullResponse = '';

            // Send metadata first
            await streamWriter.write(
                JSON.stringify({
                    type: 'metadata',
                    conversationId: convId,
                    userMessageId,
                    agentType,
                    reasoning,
                }) + '\n'
            );

            // Stream AI response
            for await (const chunk of agentStream.textStream) {
                fullResponse += chunk;
                await streamWriter.write(
                    JSON.stringify({ type: 'content', content: chunk }) + '\n'
                );
            }

            // Save assistant message to database
            const assistantMsg = await chatService.saveAssistantMessage(
                convId!,
                fullResponse,
                agentType,
                reasoning
            );

            // Send completion
            await streamWriter.write(
                JSON.stringify({
                    type: 'done',
                    messageId: assistantMsg.id,
                }) + '\n'
            );
        });
    }
);

// GET /api/chat/conversations/:id - Get conversation history
app.get('/conversations/:id', async (c) => {
    const conversationId = c.req.param('id');

    try {
        const conversation = await chatService.getConversation(conversationId);
        return c.json(conversation);
    } catch (error) {
        throw new AppError(404, 'Conversation not found');
    }
});

// GET /api/chat/conversations - List user conversations
app.get('/conversations', async (c) => {
    const conversations = await chatService.listConversations();
    return c.json(conversations);
});

// DELETE /api/chat/conversations/:id - Delete conversation
app.delete('/conversations/:id', async (c) => {
    const conversationId = c.req.param('id');

    await chatService.deleteConversation(conversationId);
    return c.json({ success: true });
});

export default app;
