import { db } from "../db.js";
export const SESSION_COOKIE = "ne_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
export async function createSession(userId, reply) {
    const session = await db.session.create({
        data: {
            userId,
            expiresAt: new Date(Date.now() + SESSION_TTL_MS),
        },
    });
    reply.setCookie(SESSION_COOKIE, session.id, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_TTL_MS / 1000,
    });
    return session;
}
export async function destroySession(request, reply) {
    const sessionId = request.cookies[SESSION_COOKIE];
    if (sessionId) {
        await db.session.deleteMany({ where: { id: sessionId } });
    }
    reply.clearCookie(SESSION_COOKIE, { path: "/" });
}
export async function getUserFromRequest(request) {
    const sessionId = request.cookies[SESSION_COOKIE];
    if (!sessionId)
        return null;
    const session = await db.session.findUnique({
        where: { id: sessionId },
        include: { user: true },
    });
    if (!session || session.expiresAt < new Date()) {
        return null;
    }
    return session.user;
}
