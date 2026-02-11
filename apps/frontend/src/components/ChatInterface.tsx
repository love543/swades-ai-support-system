import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { MessageResponse } from '@swades/shared-types';
import './ChatInterface.css';

interface ChatInterfaceProps {
    conversationId: string | null;
    messages: MessageResponse[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    conversationId,
    messages,
    onSendMessage,
    isLoading,
}) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <div className="chat-interface">
            {/* Header */}
            <div className="chat-header glass">
                <div className="header-content">
                    <div className="header-title">
                        <h2 className="text-gradient">Swades AI Support</h2>
                        <p className="header-subtitle">Powered by multi-agent AI system</p>
                    </div>
                    {conversationId && (
                        <div className="status-indicator">
                            <div className="status-dot" />
                            <span>Online</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="messages-container">
                {!conversationId ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="empty-state"
                    >
                        <div className="empty-icon">💬</div>
                        <h3>Start a conversation</h3>
                        <p>Our AI agents are ready to help with support, orders, and billing</p>
                        <div className="agent-tags">
                            <button
                                className="agent-tag support"
                                onClick={() => setInput("I need help with my account")}
                            >
                                💬 Support
                            </button>
                            <button
                                className="agent-tag order"
                                onClick={() => setInput("Where is my order ORD-2024-002?")}
                            >
                                📦 Orders
                            </button>
                            <button
                                className="agent-tag billing"
                                onClick={() => setInput("What's the status of invoice INV-2024-001?")}
                            >
                                💳 Billing
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="messages-list">
                        <AnimatePresence mode="popLayout">
                            {messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))}
                            {isLoading && <TypingIndicator key="typing" />}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="chat-input-container glass-strong">
                <form onSubmit={handleSubmit} className="chat-input-form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-input"
                            disabled={isLoading}
                        />
                        <motion.button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="send-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M2.5 10L17.5 2.5L10 17.5L8.75 11.25L2.5 10Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};
