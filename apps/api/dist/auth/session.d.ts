import type { FastifyReply, FastifyRequest } from "fastify";
export declare const SESSION_COOKIE = "ne_session";
export declare function createSession(userId: string, reply: FastifyReply): Promise<{
    id: string;
    expiresAt: Date;
    createdAt: Date;
    userId: string;
}>;
export declare function destroySession(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function getUserFromRequest(request: FastifyRequest): Promise<{
    id: string;
    createdAt: Date;
    email: string;
    passwordHash: string;
} | null>;
