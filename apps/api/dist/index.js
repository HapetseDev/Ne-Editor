import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./router/index.js";
import { createContext } from "./context.js";
import { getUserFromRequest } from "./auth/session.js";
import { exportCharacterPdf } from "./pdf/export.js";
import { db } from "./db.js";
const PORT = Number(process.env.PORT ?? 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";
async function main() {
    const app = Fastify({ logger: true });
    await app.register(cors, { origin: CORS_ORIGIN, credentials: true });
    await app.register(cookie);
    await app.register(fastifyTRPCPlugin, {
        prefix: "/trpc",
        trpcOptions: { router: appRouter, createContext },
    });
    app.get("/characters/:id/export.pdf", async (request, reply) => {
        const user = await getUserFromRequest(request);
        if (!user) {
            return reply.code(401).send({ error: "Unauthorized" });
        }
        const { id } = request.params;
        const character = await db.character.findUnique({ where: { id } });
        if (!character || character.ownerId !== user.id) {
            return reply.code(404).send({ error: "Not found" });
        }
        const pdfBytes = await exportCharacterPdf(character);
        reply
            .header("Content-Type", "application/pdf")
            .header("Content-Disposition", `attachment; filename="${character.name}.pdf"`)
            .send(Buffer.from(pdfBytes));
    });
    app.get("/health", async () => ({ ok: true }));
    await app.listen({ port: PORT, host: "0.0.0.0" });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
