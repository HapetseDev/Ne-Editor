import { db } from "./db.js";
import { getUserFromRequest } from "./auth/session.js";
export async function createContext({ req, res }) {
    const user = await getUserFromRequest(req);
    return { db, user, req, res };
}
