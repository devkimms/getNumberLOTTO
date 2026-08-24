import { sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { visitorStats } from "../../../db/schema";

export async function POST() {
  try {
    const db = getDb();
    const [result] = await db
      .insert(visitorStats)
      .values({ id: 1, total: 1 })
      .onConflictDoUpdate({
        target: visitorStats.id,
        set: {
          total: sql`${visitorStats.total} + 1`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning({ total: visitorStats.total });

    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to count visitor", error);
    return Response.json({ error: "방문자 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
