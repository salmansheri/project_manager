import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { workspaces } from "@/drizzle/schema";

const app = new Hono().get("/", async (c) => {
  const session = await auth();
  if (!session) {
    return c.json(
      {
        error: "Not allowed",
      },
      405,
    );
  }

  const [data] = await db.select().from(workspaces);
  if (!data) {
    return c.json(
      {
        error: "Cannot find workspaces",
      },
      404,
    );
  }
  return c.json(
    {
      data,
    },
    200,
  );
});

export default app;
