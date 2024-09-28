import { Hono } from "hono";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { workspaces } from "@/drizzle/schema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .get("/", async (c) => {
    const session = await auth();
    if (!session) {
      return c.json(
        {
          error: "Not allowed",
        },
        405,
      );
    }

    const data = await db.select().from(workspaces);
    if (!data) {
      return c.json(
        {
          error: "Cannot find workspaces",
        },
        404,
      );
    }
    return c.json(data, 200);
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      }),
    ),
    async (c) => {
      const session = await auth();
      const param = c.req.valid("param");

      if (!session) {
        return c.json(
          {
            error: "Not allowed ",
          },
          400,
        );
      }

      const [data] = await db
        .select()
        .from(workspaces)
        .where(eq(workspaces.id, param.id));
      if (!data) {
        return c.json(
          {
            error: "cannot find data",
          },
          400,
        );
      }
      return c.json(
        {
          data,
        },
        200,
      );
    },
  )
  .post(
    "/create",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      }),
    ),
    async (c) => {
      const session = await auth();
      if (!session?.user?.email) {
        return c.json(
          {
            error: "Not Allowed",
          },
          400,
        );
      }

      const values = c.req.valid("json");
      // TODO Create a proper method later

      const joinCode = "123456";

      const [data] = await db
        .insert(workspaces)
        .values({
          id: createId(),
          userId: session?.user?.id as string,
          name: values.name,
          joinCode: joinCode,
        })
        .returning();

      if (!data) {
        return c.json(
          {
            error: "Cannot Create workspace",
          },
          400,
        );
      }

      return c.json(
        {
          data,
          message: "success",
        },
        200,
      );
    },
  );

export default app;
