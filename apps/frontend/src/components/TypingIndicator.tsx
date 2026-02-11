import React from 'react';
import { motion } from 'framer-motion';
import './TypingIndicator.css';

export const TypingIndicator: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="typing-indicator"
        >
            <div className="typing-dots">
                <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
            </div>
            <span className="typing-text">AI is thinking...</span>
        </motion.div>
    );
};
