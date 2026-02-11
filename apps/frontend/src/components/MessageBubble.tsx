import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MessageResponse, AgentType } from '@swades/shared-types';
import './MessageBubble.css';

interface MessageBubbleProps {
    message: MessageResponse;
}

const agentColors: Record<AgentType, string> = {
    router: '#00ff88',
    support: '#00ff88',
    order: '#00d4ff',
    billing: '#ff00ff',
};

const agentIcons: Record<AgentType, string> = {
    router: '🎯',
    support: '💬',
    order: '📦',
    billing: '💳',
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const [showReasoning, setShowReasoning] = useState(false);
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}
        >
            {!isUser && message.agentType && (
                <div className="message-agent-badge" style={{ borderColor: agentColors[message.agentType] }}>
                    <span className="agent-icon">{agentIcons[message.agentType]}</span>
                    <span className="agent-name">{message.agentType}</span>
                </div>
            )}

            <div className={`message-content ${isUser ? 'user-content' : 'assistant-content'}`}>
                {message.content}
            </div>

            {message.reasoning && (
                <motion.div className="message-reasoning-container">
                    <button
                        onClick={() => setShowReasoning(!showReasoning)}
                        className="reasoning-toggle"
                    >
                        <span>{showReasoning ? '▼' : '▶'}</span>
                        <span>View reasoning</span>
                    </button>
                    <AnimatePresence>
                        {showReasoning && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="reasoning-content"
                            >
                                {message.reasoning}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            <div className="message-timestamp">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </motion.div>
    );
};
