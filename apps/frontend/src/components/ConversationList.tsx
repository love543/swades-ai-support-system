import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ConversationResponse } from '@swades/shared-types';
import './ConversationList.css';

interface ConversationListProps {
    conversations: ConversationResponse[];
    activeConversationId: string | null;
    onSelectConversation: (id: string) => void;
    onNewConversation: () => void;
    onDeleteConversation: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation,
}) => {
    return (
        <div className="conversation-list">
            <div className="conversation-list-header">
                <h3>Conversations</h3>
                <motion.button
                    onClick={onNewConversation}
                    className="new-conversation-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 3.75V14.25M3.75 9H14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>New Chat</span>
                </motion.button>
            </div>

            <div className="conversations-scroll">
                <AnimatePresence mode="popLayout">
                    {conversations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="empty-conversations"
                        >
                            <p>No conversations yet</p>
                            <span>Start a new chat to begin</span>
                        </motion.div>
                    ) : (
                        conversations.map((conv, index) => (
                            <motion.div
                                key={conv.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: index * 0.05 }}
                                className={`conversation-item ${activeConversationId === conv.id ? 'active' : ''}`}
                                onClick={() => onSelectConversation(conv.id)}
                                whileHover={{ x: 4 }}
                            >
                                <div className="conversation-content">
                                    <h4>{conv.title}</h4>
                                    <p>{new Date(conv.updatedAt).toLocaleDateString()}</p>
                                </div>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteConversation(conv.id);
                                    }}
                                    className="delete-btn"
                                    whileHover={{ scale: 1.1, color: '#EF4444' }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 4L12 12M4 12L12 4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
