// Agent Types
export type AgentType = 'router' | 'support' | 'order' | 'billing';

export interface AgentCapability {
    name: string;
    description: string;
    tools: AgentTool[];
}

export interface AgentTool {
    name: string;
    description: string;
    parameters?: Record<string, any>;
}

// API Types
export interface SendMessageRequest {
    conversationId?: string;
    message: string;
}

export interface SendMessageResponse {
    conversationId: string;
    messageId: string;
    agentType: AgentType;
    reasoning?: string;
}

export interface ConversationResponse {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages?: MessageResponse[];
}

export interface MessageResponse {
    id: string;
    conversationId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    agentType?: AgentType;
    reasoning?: string;
    createdAt: Date;
}

export interface AgentListResponse {
    agents: {
        type: AgentType;
        name: string;
        description: string;
    }[];
}
