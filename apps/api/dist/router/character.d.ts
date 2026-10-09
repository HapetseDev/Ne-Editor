import type { PrismaClient } from "@prisma/client";
export declare const characterRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        db: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
        user: {
            id: string;
            createdAt: Date;
            email: string;
            passwordHash: string;
        } | null;
        req: import("fastify").FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider.js").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>;
        res: import("fastify").FastifyReply<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: string;
            name: string;
            schemaVersion: number;
            createdAt: Date;
            updatedAt: Date;
            data: {
                notes: string;
                placeholderStats: Record<string, string | number>;
            };
        }[];
        meta: object;
    }>;
    byId: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
            name: string;
            schemaVersion: number;
            createdAt: Date;
            updatedAt: Date;
            data: {
                notes: string;
                placeholderStats: Record<string, string | number>;
            };
        };
        meta: object;
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
        };
        output: {
            id: string;
            name: string;
            schemaVersion: number;
            createdAt: Date;
            updatedAt: Date;
            data: {
                notes: string;
                placeholderStats: Record<string, string | number>;
            };
        };
        meta: object;
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name?: string | undefined;
            data?: {
                notes?: string | undefined;
                placeholderStats?: Record<string, string | number> | undefined;
            } | undefined;
        };
        output: {
            id: string;
            name: string;
            schemaVersion: number;
            createdAt: Date;
            updatedAt: Date;
            data: {
                notes: string;
                placeholderStats: Record<string, string | number>;
            };
        };
        meta: object;
    }>;
    duplicate: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
            name: string;
            schemaVersion: number;
            createdAt: Date;
            updatedAt: Date;
            data: {
                notes: string;
                placeholderStats: Record<string, string | number>;
            };
        };
        meta: object;
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            ok: boolean;
        };
        meta: object;
    }>;
}>>;
