import type { Context, Next } from 'hono';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 60; // requests
const WINDOW_MS = 60 * 1000; // 1 minute

export const rateLimiter = async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || 'unknown';
    const now = Date.now();

    let record = rateLimitMap.get(ip);

    // Reset if window expired
    if (!record || now > record.resetAt) {
        record = { count: 0, resetAt: now + WINDOW_MS };
        rateLimitMap.set(ip, record);
    }

    record.count++;

    if (record.count > RATE_LIMIT) {
        return c.json(
            {
                error: {
                    message: 'Too many requests, please try again later',
                    statusCode: 429,
                },
            },
            429
        );
    }

    await next();
};
