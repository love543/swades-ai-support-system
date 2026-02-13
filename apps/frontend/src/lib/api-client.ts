const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface StreamMessageOptions {
    conversationId?: string;
    message: string;
    onMetadata?: (data: any) => void;
    onContent?: (chunk: string) => void;
    onDone?: (data: any) => void;
    onError?: (error: Error) => void;
}

export const apiClient = {
    // Stream message response
    async streamMessage(options: StreamMessageOptions) {
        const { conversationId, message, onMetadata, onContent, onDone, onError } = options;

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ conversationId, message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error('No response body');
            }

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter((line) => line.trim());

                for (const line of lines) {
                    try {
                        const data = JSON.parse(line);

                        if (data.type === 'metadata') {
                            onMetadata?.(data);
                        } else if (data.type === 'content') {
                            onContent?.(data.content);
                        } else if (data.type === 'done') {
                            onDone?.(data);
                        }
                    } catch (e) {
                        console.error('Failed to parse line:', line, e);
                    }
                }
            }
        } catch (error) {
            onError?.(error as Error);
        }
    },

    // Get conversation
    async getConversation(id: string) {
        const response = await fetch(`${API_BASE_URL}/api/chat/conversations/${id}`);
        if (!response.ok) throw new Error('Failed to fetch conversation');
        return response.json();
    },

    // List conversations
    async listConversations() {
        const response = await fetch(`${API_BASE_URL}/api/chat/conversations`);
        if (!response.ok) throw new Error('Failed to fetch conversations');
        return response.json();
    },

    // Delete conversation
    async deleteConversation(id: string) {
        const response = await fetch(`${API_BASE_URL}/api/chat/conversations/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete conversation');
        return response.json();
    },

    // Get agents list
    async getAgents() {
        const response = await fetch(`${API_BASE_URL}/api/agents`);
        if (!response.ok) throw new Error('Failed to fetch agents');
        return response.json();
    },

    // Health check
    async healthCheck() {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!response.ok) throw new Error('Health check failed');
        return response.json();
    },
};
