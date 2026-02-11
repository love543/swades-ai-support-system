import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import chatRoutes from './routes/chat.routes';
import agentsRoutes from './routes/agents.routes';
import healthRoutes from './routes/health.routes';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimit';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('/api/*', rateLimiter);

// Routes
app.route('/api/chat', chatRoutes);
app.route('/api/agents', agentsRoutes);
app.route('/api/health', healthRoutes);

// Error handling
app.onError(errorHandler);

// Start server
const port = Number(process.env.PORT) || 3000;

serve({
    fetch: app.fetch,
    port,
});

console.log(`🚀 Server running on http://localhost:${port}`);

export type AppType = typeof app;
