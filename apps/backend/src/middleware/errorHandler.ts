import type { Context, Next } from 'hono';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const errorHandler = async (err: Error, c: Context) => {
    console.error('Error:', err);

    if (err instanceof AppError) {
        return c.json(
            {
                error: {
                    message: err.message,
                    statusCode: err.statusCode,
                },
            },
            err.statusCode as any
        );
    }

    // Default to 500 server error
    return c.json(
        {
            error: {
                message: 'Internal server error',
                statusCode: 500,
            },
        },
        500
    );
};
