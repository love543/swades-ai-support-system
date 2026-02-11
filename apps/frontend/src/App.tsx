import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatInterface } from './components/ChatInterface';
import { ConversationList } from './components/ConversationList';
import { apiClient } from './lib/api-client';
import type { ConversationResponse, MessageResponse } from '@swades/shared-types';
import './App.css';

function App() {
    const [conversations, setConversations] = useState<ConversationResponse[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const [streamingAgentType, setStreamingAgentType] = useState<import('@swades/shared-types').AgentType | undefined>();
    const [streamingReasoning, setStreamingReasoning] = useState<string | undefined>();

    // Load conversations on mount
    useEffect(() => {
        loadConversations();
    }, []);

    // Load messages when conversation changes
    useEffect(() => {
        if (activeConversationId) {
            loadConversation(activeConversationId);
        } else {
            setMessages([]);
        }
    }, [activeConversationId]);

    const loadConversations = async () => {
        try {
            const convs = await apiClient.listConversations();
            setConversations(convs);
        } catch (error) {
            console.error('Failed to load conversations:', error);
        }
    };

    const loadConversation = async (id: string) => {
        try {
            const conv = await apiClient.getConversation(id);
            setMessages(conv.messages || []);
        } catch (error) {
            console.error('Failed to load conversation:', error);
        }
    };

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);
        setStreamingContent('');

        let newConversationId = activeConversationId;
        let tempUserMessage: MessageResponse | null = null;
        let accumulatedContent = ''; // LOCAL variable to track actual content
        let capturedAgentType: import('@swades/shared-types').AgentType | undefined;
        let capturedReasoning: string | undefined;

        try {
            await apiClient.streamMessage({
                conversationId: activeConversationId || undefined,
                message,
                onMetadata: (data) => {
                    newConversationId = data.conversationId;

                    // Capture agent info from metadata (local vars + state for streaming display)
                    capturedAgentType = data.agentType;
                    capturedReasoning = data.reasoning;
                    setStreamingAgentType(data.agentType);
                    setStreamingReasoning(data.reasoning);

                    // Add user message
                    tempUserMessage = {
                        id: data.userMessageId,
                        conversationId: data.conversationId,
                        role: 'user',
                        content: message,
                        createdAt: new Date(),
                    };
                    setMessages((prev) => [...prev, tempUserMessage!]);

                    if (!activeConversationId) {
                        setActiveConversationId(data.conversationId);
                        loadConversations();
                    }
                },
                onContent: (chunk) => {
                    accumulatedContent += chunk; // Accumulate in local variable
                    setStreamingContent(accumulatedContent); // Update state for display
                },
                onDone: (data) => {
                    // Add assistant message using accumulated content & local agent info
                    const assistantMessage: MessageResponse = {
                        id: data.messageId,
                        conversationId: newConversationId!,
                        role: 'assistant',
                        content: accumulatedContent,
                        agentType: capturedAgentType,
                        reasoning: capturedReasoning,
                        createdAt: new Date(),
                    };

                    setMessages((prev) => [...prev, assistantMessage]);
                    setStreamingContent('');
                    setStreamingAgentType(undefined);
                    setStreamingReasoning(undefined);
                    setIsLoading(false);
                    loadConversations(); // Refresh list with updated timestamp
                },
                onError: (error) => {
                    console.error('Stream error:', error);
                    setIsLoading(false);
                    setStreamingContent('');
                    setStreamingAgentType(undefined);
                    setStreamingReasoning(undefined);
                },
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            setIsLoading(false);
        }
    };

    const handleSelectConversation = (id: string) => {
        setActiveConversationId(id);
    };

    const handleNewConversation = () => {
        setActiveConversationId(null);
        setMessages([]);
    };

    const handleDeleteConversation = async (id: string) => {
        try {
            await apiClient.deleteConversation(id);
            if (activeConversationId === id) {
                setActiveConversationId(null);
                setMessages([]);
            }
            loadConversations();
        } catch (error) {
            console.error('Failed to delete conversation:', error);
        }
    };

    // Show streaming content as temp message
    const displayMessages = streamingContent
        ? [
            ...messages,
            {
                id: 'streaming',
                conversationId: activeConversationId!,
                role: 'assistant' as const,
                content: streamingContent,
                agentType: streamingAgentType,
                reasoning: streamingReasoning,
                createdAt: new Date(),
            },
        ]
        : messages;

    return (
        <div className="app">
            <div className="app-background" />
            <div className="app-container">
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="sidebar"
                >
                    <ConversationList
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onSelectConversation={handleSelectConversation}
                        onNewConversation={handleNewConversation}
                        onDeleteConversation={handleDeleteConversation}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="main-content"
                >
                    <ChatInterface
                        conversationId={activeConversationId}
                        messages={displayMessages}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default App;
