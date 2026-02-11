import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
    return c.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'swades-ai-support',
    });
});

export default app;
